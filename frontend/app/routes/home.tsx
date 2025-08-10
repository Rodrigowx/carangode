import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import carangondeLogo from "../utils/carangonde.svg";

// Interfaces para tipagem dos dados do Google Drive
interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
}

interface DriveFolder {
  id: string;
  name: string;
  description?: string;
  images: DriveFile[];
  subfolders: DriveFolder[];
}

interface FolderOption {
  id: string;
  name: string;
  description?: string;
  hasDirectImages: boolean;
  subfolders: FolderOption[];
  parentId?: string;
}

interface NavigationPath {
  id: string;
  name: string;
}

interface ActivitySlide {
  id: string;
  title: string;
  description?: string;
  images: string[];
  currentImageIndex: number;
}

export function meta() {
  return [
    { title: "Instituto Carangondé Cidadania" },
    { name: "description", content: "Transformando vidas por meio da cidadania, educação e inclusão social" },
  ];
}

export default function Home() {
  const [folderOptions, setFolderOptions] = useState<FolderOption[]>([]);
  const [currentFolderOptions, setCurrentFolderOptions] = useState<FolderOption[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [navigationPath, setNavigationPath] = useState<NavigationPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(false);
  const [loadingCurrentImage, setLoadingCurrentImage] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Extensões de imagem suportadas
  const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.heic', '.heif'];
  
  // Função para verificar se é arquivo de imagem
  const isImageFile = (fileName: string): boolean => {
    const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    return IMAGE_EXTENSIONS.includes(extension);
  };

  // Função para buscar arquivos de uma pasta no Google Drive
  const fetchDriveFiles = async (folderId: string, driveToken: string): Promise<DriveFile[]> => {
    try {
      // Incluir thumbnailLink nos campos para usar as thumbnails oficiais
      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${driveToken}&fields=files(id,name,mimeType,thumbnailLink)`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro na API do Google Drive: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      return data.files || [];
    } catch (error) {
      console.error('❌ Erro ao buscar arquivos:', error);
      return [];
    }
  };

  // Função para carregar apenas a lista de pastas (otimizada)
  const loadFoldersList = async (driveToken: string, folderId: string): Promise<FolderOption[]> => {
    try {
      const files = await fetchDriveFiles(folderId, driveToken);
      const folders: FolderOption[] = [];
      
      // Separar pastas e imagens na pasta principal
      const directImages = files.filter(file => 
        file.mimeType.startsWith('image/') && isImageFile(file.name)
      );
      const subfolders = files.filter(file => 
        file.mimeType === 'application/vnd.google-apps.folder'
      );
      
      
      
      // Se há imagens diretas, adicionar como "Atividades Principais"
      if (directImages.length > 0) {
        folders.push({
          id: folderId + '_direct',
          name: 'Atividades Principais',
          description: `${directImages.length} fotos`,
          hasDirectImages: true,
          subfolders: []
        });
      }
      
      // Processar subpastas para contagem
      for (const subfolder of subfolders) {
        const subfolderFiles = await fetchDriveFiles(subfolder.id, driveToken);
        
        const subfolderImages = subfolderFiles.filter(file => 
          file.mimeType.startsWith('image/') && isImageFile(file.name)
        );
        const nestedSubfolders = subfolderFiles.filter(file => 
          file.mimeType === 'application/vnd.google-apps.folder'
        );
        
        // Processar subpastas aninhadas
        const processedSubfolders: FolderOption[] = [];
        for (const nested of nestedSubfolders) {
          const nestedFiles = await fetchDriveFiles(nested.id, driveToken);
          const nestedImages = nestedFiles.filter(file => 
            file.mimeType.startsWith('image/') && isImageFile(file.name)
          );
          
          processedSubfolders.push({
            id: nested.id,
            name: nested.name,
            description: nestedImages.length > 0 ? `${nestedImages.length} fotos` : 'Sem imagens',
            hasDirectImages: nestedImages.length > 0,
            subfolders: [],
            parentId: subfolder.id
          });
        }
        
        const totalImages = subfolderImages.length + processedSubfolders.reduce((sum, sf) => sum + (sf.hasDirectImages ? parseInt(sf.description?.split(' ')[0] || '0') : 0), 0);
        const hasDirectImages = subfolderImages.length > 0;
        
        if (totalImages > 0 || processedSubfolders.length > 0) {
          folders.push({
            id: subfolder.id,
            name: subfolder.name,
            description: hasDirectImages 
              ? `${subfolderImages.length} fotos diretas` + (processedSubfolders.length > 0 ? ` + ${processedSubfolders.length} subpastas` : '')
              : processedSubfolders.length > 0 
                ? `${processedSubfolders.length} subpastas` 
                : 'Aguardando conteúdo',
            hasDirectImages,
            subfolders: processedSubfolders
          });
        }
      }
      
      return folders;
    } catch (error) {
      console.error('❌ Erro ao carregar lista de pastas:', error);
      return [];
    }
  };

  // Função auxiliar para gerar URL da imagem do Google Drive
  const generateDriveImageUrl = (file: DriveFile): string => {
    // Usar thumbnailLink quando disponível (sem problemas de CORS)
    if (file.thumbnailLink) {
      return file.thumbnailLink;
    }
    // Fallback para formato básico
    return `https://drive.google.com/uc?export=view&id=${file.id}`;
  };



  // Função para carregar imagens de uma pasta específica
  // Usa o formato direto do Google Drive: https://drive.usercontent.google.com/download?id=ID_DA_IMAGEM
  const loadFolderImages = async (driveToken: string, folderId: string, folderName: string): Promise<string[]> => {
    try {
      
      if (folderId.endsWith('_direct')) {
        // Pasta principal - imagens diretas
        const realFolderId = folderId.replace('_direct', '');
        const files = await fetchDriveFiles(realFolderId, driveToken);
        const images = files
          .filter(file => file.mimeType.startsWith('image/') && isImageFile(file.name))
          .map(img => generateDriveImageUrl(img));
        
        return images;
      } else {
        // Subpasta - buscar imagens recursivamente
        const allImages: string[] = [];
        
        const files = await fetchDriveFiles(folderId, driveToken);
        
        // Imagens diretas da pasta
        const directImages = files
          .filter(file => file.mimeType.startsWith('image/') && isImageFile(file.name))
          .map(img => generateDriveImageUrl(img));
        allImages.push(...directImages);
        
        // Imagens das subpastas
        const subfolders = files.filter(file => 
          file.mimeType === 'application/vnd.google-apps.folder'
        );
        
        for (const subfolder of subfolders) {
          const subfolderFiles = await fetchDriveFiles(subfolder.id, driveToken);
          const subImages = subfolderFiles
            .filter(file => file.mimeType.startsWith('image/') && isImageFile(file.name))
            .map(img => generateDriveImageUrl(img));
          allImages.push(...subImages);
        }
        
        return allImages;
      }
    } catch (error) {
      console.error(`❌ Erro ao carregar imagens do projeto "${folderName}":`, error);
      return [];
    }
  };

  // Função principal para carregar lista de pastas
  const loadFolders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar se as variáveis de ambiente estão disponíveis
      const driveToken = import.meta.env.VITE_DRIVE_TOKEN;
      const folderId = import.meta.env.VITE_ID_PASTA_DRIVE;
      

      
      if (!driveToken || !folderId) {
        setError(`Configuração do Google Drive não encontrada. ${!driveToken ? 'VITE_DRIVE_TOKEN' : ''} ${!folderId ? 'VITE_ID_PASTA_DRIVE' : ''} ausente(s).`);
        return;
      }
      
      const folders = await loadFoldersList(driveToken, folderId);
      setFolderOptions(folders);
      setCurrentFolderOptions(folders);
      setNavigationPath([{ id: folderId, name: 'Eventos' }]);
      
      // Buscar automaticamente a primeira pasta com imagens para carregar no slider
      if (folders.length > 0) {
        await autoSelectFirstWithImages(folders, driveToken, folderId);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar projetos:', error);
      setError('Erro ao carregar projetos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Função para navegar para uma pasta (hierárquica)
  const navigateToFolder = async (folder: FolderOption, driveToken?: string, mainFolderId?: string) => {
    try {
      setLoadingImages(true);
      setSelectedFolder(folder.id);
      setCurrentImageIndex(0);
      
      const token = driveToken || import.meta.env.VITE_DRIVE_TOKEN;
      
      if (!token) {
        setError('Token do Google Drive não encontrado');
        return;
      }
      

      
      // Atualizar caminho de navegação
      if (folder.parentId) {
        // É uma subpasta, adicionar ao caminho
        setNavigationPath(prev => {
          const safePrev = prev || [];
          const existingIndex = safePrev.findIndex(p => p?.id === folder.id);
          if (existingIndex !== -1) {
            // Já existe no caminho, cortar a partir dele
            return safePrev.slice(0, existingIndex + 1);
          } else {
            // Adicionar ao caminho
            return [...safePrev, { id: folder.id, name: folder.name }];
          }
        });
      } else {
        // É pasta principal, resetar caminho
        setNavigationPath(prev => {
          const safePrev = prev || [];
          const mainPath = safePrev.length > 0 ? safePrev[0] : { id: 'root', name: 'Projetos' };
          return [mainPath, { id: folder.id, name: folder.name }];
        });
      }
      
      if (folder.hasDirectImages) {
        // Pasta tem imagens diretas, carregar imagens
              const images = await loadFolderImages(token, folder.id, folder.name);
      setCurrentImages(images);
      setCurrentFolderOptions([]);
      } else if (folder.subfolders.length > 0) {
        // Pasta só tem subpastas, mostrar opções
        setCurrentImages([]);
        setCurrentFolderOptions(folder.subfolders);
      } else {
        // Pasta vazia
        setCurrentImages([]);
        setCurrentFolderOptions([]);
      }
    } catch (error) {
      console.error(`❌ Erro ao navegar para "${folder.name}":`, error);
      setError(`Erro ao carregar projeto "${folder.name}"`);
    } finally {
      setLoadingImages(false);
    }
  };

  // Função para voltar na navegação
  const navigateBack = (targetPath: NavigationPath) => {
    if (!targetPath?.id) return;
    
    const safePath = navigationPath || [];
    const pathIndex = safePath.findIndex(p => p?.id === targetPath.id);
    if (pathIndex !== -1) {
      const newPath = safePath.slice(0, pathIndex + 1);
      setNavigationPath(newPath);
      
      if (pathIndex === 0) {
        // Voltar para lista principal
        setCurrentFolderOptions(folderOptions);
        setCurrentImages([]);
        setSelectedFolder(null);
      } else {
        // Voltar para pasta anterior
        const targetFolder = findFolderById(targetPath.id);
        if (targetFolder) {
          navigateToFolder(targetFolder);
        }
      }
    }
  };

  // Função para voltar à pasta raiz mantendo seleção
  const navigateToRoot = () => {
    const rootPath = navigationPath && navigationPath.length > 0 ? navigationPath[0] : { id: 'root', name: 'Eventos' };
    setNavigationPath([rootPath]);
    setCurrentFolderOptions(folderOptions);
    setCurrentImages([]);
    // Mantém selectedFolder para preservar seleção anterior
  };

  // Função auxiliar para encontrar pasta por ID
  const findFolderById = (id: string): FolderOption | null => {
    const searchInArray = (folders: FolderOption[]): FolderOption | null => {
      for (const folder of folders) {
        if (folder.id === id) return folder;
        const found = searchInArray(folder.subfolders);
        if (found) return found;
      }
      return null;
    };
    return searchInArray(folderOptions);
  };

  // Função para buscar automaticamente a primeira pasta com imagens
  const autoSelectFirstWithImages = async (folders: FolderOption[], driveToken: string, rootFolderId: string) => {
    try {
      // Buscar primeira pasta com imagens diretas
      for (const folder of folders) {
        if (folder.hasDirectImages) {
          await navigateToFolder(folder, driveToken, rootFolderId);
          return;
        }
      }
      
      // Se não encontrou pasta com imagens diretas, buscar na primeira subpasta
      for (const folder of folders) {
        if (folder.subfolders.length > 0) {
          // Primeiro navegar para a pasta pai
          setNavigationPath(prev => [prev[0], { id: folder.id, name: folder.name }]);
          setCurrentFolderOptions(folder.subfolders);
          setSelectedFolder(folder.id);
          
          // Buscar na primeira subpasta com imagens
          for (const subfolder of folder.subfolders) {
            if (subfolder.hasDirectImages) {
              await navigateToFolder(subfolder, driveToken, rootFolderId);
              return;
            }
          }
          return; // Para na primeira pasta com subpastas mesmo se não tiver imagens
        }
      }
      
      // Se chegou aqui, apenas navegar para a primeira pasta disponível
      if (folders.length > 0) {
        await navigateToFolder(folders[0], driveToken, rootFolderId);
      }
    } catch (error) {
      console.error('❌ Erro ao auto-selecionar pasta:', error);
      // Em caso de erro, apenas navegar para a primeira pasta
      if (folders.length > 0) {
        await navigateToFolder(folders[0], driveToken, rootFolderId);
      }
    }
  };

  // Carregar projetos na inicialização
  useEffect(() => {
    loadFolders();
  }, []);





  // Auto-slide para as imagens da pasta selecionada
  useEffect(() => {
    if (currentImages.length <= 1) return;
    
    const timer = setInterval(() => {
      setLoadingCurrentImage(true);
      setCurrentImageIndex(prev => (prev + 1) % currentImages.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [currentImages.length]);

  // Função para navegar nas imagens
  const changeImage = (direction: 'prev' | 'next') => {
    if (currentImages.length <= 1) return;
    
    setLoadingCurrentImage(true);
    setCurrentImageIndex(prev => 
      direction === 'next' 
        ? (prev + 1) % currentImages.length
        : (prev - 1 + currentImages.length) % currentImages.length
    );
  };

  // Função para obter o nome da pasta selecionada
  const getSelectedFolderName = () => {
    if (navigationPath.length > 1) {
      return navigationPath[navigationPath.length - 1].name;
    }
    return currentFolderOptions.length > 0 ? 'Selecione um projeto' : 'Carregando...';
  };



  return (
    <main className="">
      {/* Seção Atividades Realizadas */}
      <section className="relative pt-3 min-h-[80vh] bg-gradient-to-br from-orange-100 via-amber-50 to-teal-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/5 dark:bg-black/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
          {/* Título Principal */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-teal-800 dark:text-teal-200 mb-4">
              Galeria de Eventos
            </h1>
            <p className="text-lg md:text-xl text-orange-700 dark:text-orange-300">
              Reviva os melhores momentos das nossas atividades
            </p>
          </div>

                    {/* Conteúdo do Slider */}
                      {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
                <span className="ml-4 text-lg text-gray-600 dark:text-gray-300">Carregando projetos...</span>
              </div>
            ) : error ? (
              <div className="text-center p-12">
                <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
                  <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
                  <button 
                    onClick={loadFolders}
                    className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    Tentar Novamente
                  </button>
                </div>
              </div>
            ) : folderOptions.length === 0 ? (
              <div className="text-center p-12">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-300">Nenhum projeto encontrado</p>
              </div>
            </div>
          ) : (
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
              {/* Container Principal do Slider */}
              <div className="relative">
                {loadingImages ? (
                  <div className="flex justify-center items-center h-96 md:h-[32rem] bg-gray-200 dark:bg-gray-700">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                      <p className="text-gray-600 dark:text-gray-300">Carregando imagens...</p>
          </div>
        </div>
                ) : (
                  <>
                    {/* Área da Imagem */}
                    <div className="relative h-96 md:h-[32rem] bg-gray-200 dark:bg-gray-700">
                      {currentImages.length > 0 ? (
                        <>
                          {/* Loading indicator para imagem */}
                          {loadingCurrentImage && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                            </div>
                          )}
                          
                          <img 
                            src={currentImages[currentImageIndex]}
                            alt={`${getSelectedFolderName()} - Foto ${currentImageIndex + 1}`}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                              loadingCurrentImage ? 'opacity-0' : 'opacity-100'
                            }`}
                            loading="lazy"
                            crossOrigin="anonymous"
                            referrerPolicy="no-referrer"
                            onLoadStart={() => {
                              setLoadingCurrentImage(true);
                            }}
                            onError={(e) => {
                              // Se falhar, usar logo como fallback
                              (e.target as HTMLImageElement).src = carangondeLogo;
                              setLoadingCurrentImage(false);
                            }}
                            onLoad={() => {
                              setLoadingCurrentImage(false);
                            }}
                          />
                          
                          {/* Overlay gradiente */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          
                          {/* Controles de Navegação das Imagens */}
                          {currentImages.length > 1 && (
                            <>
                              <button
                                onClick={() => changeImage('prev')}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 group"
                              >
                                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              
                              <button
                                onClick={() => changeImage('next')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 group"
                              >
                                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                              
                              {/* Indicadores das Imagens */}
                                                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {currentImages.map((_, index) => (
            <button
              key={index}
                                    onClick={() => {
                                      if (index !== currentImageIndex) {
                                        setLoadingCurrentImage(true);
                                        setCurrentImageIndex(index);
                                      }
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      index === currentImageIndex 
                                        ? 'bg-white scale-125' 
                                        : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                          <div className="text-center">
                            <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-600 dark:text-gray-300 font-medium">
                              Selecione um evento para ver as fotos
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {/* Informações Simples da Atividade */}
                <div className="p-6 text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <h2 className="text-2xl md:text-3xl font-bold text-teal-800 dark:text-teal-200 mb-2">
                    {getSelectedFolderName()}
                  </h2>
                  
                  {currentImages.length > 0 && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <div>
                        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                          📷 Foto {currentImageIndex + 1} de {currentImages.length}
                        </span>
                      </div>
                      
                       
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Seletor Simples de Eventos */}
          {!loading && !error && folderOptions.length > 0 && (
            <div className="mt-6">
              {/* Botão Ver Outros Eventos */}
              {navigationPath && navigationPath.length > 1 && (
                <div className="text-center mb-6">
                  <button
                    onClick={navigateToRoot}
                    className="inline-flex items-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold text-sm shadow-lg transform hover:scale-105 transition-all"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
                    </svg>
                    Ver Outros Eventos
                  </button>
                </div>
              )}

              {/* Breadcrumb simples */}
              {navigationPath && navigationPath.length > 1 && (
                <div className="text-center mb-4">
                  <div className="inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    {navigationPath.map((path, index) => (
                      <div key={path?.id || index} className="flex items-center space-x-2">
                        {index > 0 && <span>›</span>}
                        <button
                          onClick={() => {
                            if (index < navigationPath.length - 1) {
                              navigateBack(path);
                            }
                          }}
                          className={`hover:text-orange-500 ${
                            index === navigationPath.length - 1 ? 'text-orange-600 font-medium' : ''
                          }`}
                        >
                          {path?.name || 'Carregando...'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Seletor horizontal simples */}
              <div className="overflow-x-auto">
                <div className="flex space-x-3 px-4 pb-4">
                  {currentFolderOptions && currentFolderOptions.length > 0 && currentFolderOptions.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => navigateToFolder(folder)}
                      className={`flex-shrink-0 px-6 py-3 rounded-2xl border-2 transition-all hover:scale-105 ${
                        selectedFolder === folder.id
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                          : 'border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:border-orange-300'
                      }`}
                    >
                      <div className="text-center min-w-[120px]">
                        <div className="font-medium text-sm mb-1">{folder.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {folder.hasDirectImages ? (
                            <span className="text-green-600 dark:text-green-400">
                              📷 {folder.description}
                            </span>
                          ) : (
                            <span className="text-blue-600 dark:text-blue-400">
                              📁 {folder.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Seção Quem Somos */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-200 mb-4">
              Quem Somos
            </h2>
            <p className="text-lg text-orange-700 dark:text-orange-300 max-w-3xl mx-auto">
              O Instituto Carangondé Cidadania é uma organização dedicada a transformar vidas através da educação, capacitação profissional e promoção da cidadania.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-orange-200 dark:bg-orange-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-teal-700 dark:text-teal-300 mb-2">1,200+</h3>
              <p className="text-orange-600 dark:text-orange-400 font-medium">Pessoas Atendidas</p>
            </div>
            
            <div className="text-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-teal-200 dark:bg-teal-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600 dark:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-teal-700 dark:text-teal-300 mb-2">15</h3>
              <p className="text-orange-600 dark:text-orange-400 font-medium">Cidades Contempladas</p>
            </div>
            
            <div className="text-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-teal-700 dark:text-teal-300 mb-2">25+</h3>
              <p className="text-orange-600 dark:text-orange-400 font-medium">Cursos Ofertados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Conheça Nossos Cursos */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-teal-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-200 mb-4">
              Conheça Nossos Cursos
            </h2>
            <p className="text-lg text-orange-700 dark:text-orange-300 max-w-3xl mx-auto">
              Oferecemos uma variedade de cursos profissionalizantes e de capacitação para promover a inclusão social e o desenvolvimento pessoal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            {/* Curso exemplo */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-orange-200 to-amber-200 dark:from-orange-800 dark:to-amber-800 flex items-center justify-center">
                <img src={carangondeLogo} alt="Curso" className="w-16 h-16 opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-2">Informática Básica</h3>
                <p className="text-orange-600 dark:text-orange-400 mb-4">Aprenda os fundamentos da informática e navegação na internet.</p>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="block">📅 Duração: 2 meses</span>
                  <span className="block">👥 Turmas: Manhã e Tarde</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-teal-200 to-green-200 dark:from-teal-800 dark:to-green-800 flex items-center justify-center">
                <img src={carangondeLogo} alt="Curso" className="w-16 h-16 opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-2">Artesanato</h3>
                <p className="text-orange-600 dark:text-orange-400 mb-4">Desenvolva habilidades manuais e gere renda extra.</p>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="block">📅 Duração: 3 meses</span>
                  <span className="block">👥 Turmas: Tarde</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-amber-200 to-yellow-200 dark:from-amber-800 dark:to-yellow-800 flex items-center justify-center">
                <img src={carangondeLogo} alt="Curso" className="w-16 h-16 opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-2">Culinária</h3>
                <p className="text-orange-600 dark:text-orange-400 mb-4">Aprenda técnicas culinárias e abra seu próprio negócio.</p>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="block">📅 Duração: 4 meses</span>
                  <span className="block">👥 Turmas: Manhã</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/cursos"
              className="inline-block px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-all"
            >
              Ver Todos os Cursos
            </Link>
          </div>
        </div>
      </section>

      {/* Seções de Participação */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-200 mb-4">
              Faça Parte da Nossa Missão
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Seja um Parceiro */}
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-200 dark:bg-orange-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V9a2 2 0 00-2-2H10a2 2 0 00-2 2v3.1M15 13l-3-3-3 3" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">Seja um Parceiro</h3>
              <p className="text-orange-600 dark:text-orange-400 mb-6">Empresas e organizações podem apoiar nossos projetos e ampliar o impacto social.</p>
              <Link
                to="/contato"
                className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-all"
              >
                Quero Ser Parceiro
              </Link>
            </div>
            
            {/* Trabalhe Conosco */}
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-teal-200 dark:bg-teal-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-teal-600 dark:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V9a2 2 0 00-2-2H10a2 2 0 00-2 2v3.1M15 13l-3-3-3 3" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">Trabalhe Conosco</h3>
              <p className="text-orange-600 dark:text-orange-400 mb-6">Junte-se à nossa equipe e ajude a transformar vidas através da educação.</p>
              <Link
                to="/contato"
                className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold transition-all"
              >
                Ver Vagas
              </Link>
            </div>
            
            {/* Seja Voluntário */}
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg text-center md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">Seja Voluntário</h3>
              <p className="text-orange-600 dark:text-orange-400 mb-6">Dedique seu tempo e talentos para impactar positivamente a comunidade.</p>
              <Link
                to="/contato"
                className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-all"
              >
                Quero Ajudar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Investidores */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-200 mb-4">
              Nossos Apoiadores
            </h2>
            <p className="text-lg text-orange-700 dark:text-orange-300 max-w-3xl mx-auto">
              Contamos com o apoio de importantes instituições que acreditam em nossa missão.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-2">Caixa Econômica Federal</h3>
                <p className="text-orange-600 dark:text-orange-400">Parceiro estratégico em projetos de inclusão social e financeira</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção CTA Final */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-orange-500 to-teal-500 dark:from-orange-600 dark:to-teal-600">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Juntos, Transformamos o Futuro
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Participe da nossa missão de promover cidadania, educação e inclusão social.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/doacao"
              className="px-8 py-4 bg-white text-orange-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Fazer Doação
            </Link>
            <Link
              to="/contato"
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-orange-600 rounded-full font-semibold text-lg transition-all"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
