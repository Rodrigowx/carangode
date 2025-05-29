import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Toast from "../../components/Toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import apiClient from "../../utils/api";
import type { Curso, PessoaInscrita, ApiError } from "../../types/api";

interface CursoFormData {
  titulo: string;
  descricao: string;
  imagemCapa: string;
  dataInicio: string;
  dataFim: string;
  exibir: boolean;
}

export default function AdminCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursosFiltrados, setCursosFiltrados] = useState<Curso[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemCapa, setImagemCapa] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [exibir, setExibir] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);
  const [inscritos, setInscritos] = useState<PessoaInscrita[]>([]);
  const [loadingInscritos, setLoadingInscritos] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const [loadingGlobal, setLoadingGlobal] = useState(false);

  // Estados para filtros
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<"todos" | "exibindo" | "oculto">("todos");
  const [filtroDataInicio, setFiltroDataInicio] = useState("");
  const [filtroDataFim, setFiltroDataFim] = useState("");

  const fetchCursos = async () => {
    setLoading(true);
    try {
      console.log("[AdminCursos] Buscando cursos...");
      const response = await apiClient.get<Curso[]>("/cursos");
      setCursos(response.data);
      // Inicializar cursosFiltrados com todos os cursos (incluindo ocultos)
      setCursosFiltrados(response.data);
    } catch (err: any) {
      console.error("[AdminCursos] Erro ao buscar cursos:", err);
      
      let errorMessage = "Erro ao carregar cursos";
      if (err.response?.data) {
        const apiError: ApiError = err.response.data;
        errorMessage = apiError.error || apiError.message || errorMessage;
      }
      
      setToast({ message: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros
  useEffect(() => {
    let cursosFiltered = [...cursos];

    // Filtro por nome
    if (filtroNome) {
      cursosFiltered = cursosFiltered.filter(curso => 
        curso.titulo.toLowerCase().includes(filtroNome.toLowerCase())
      );
    }

    // Filtro por status
    if (filtroStatus !== "todos") {
      cursosFiltered = cursosFiltered.filter(curso => 
        filtroStatus === "exibindo" ? curso.exibir : !curso.exibir
      );
    }

    // Filtro por data de início
    if (filtroDataInicio) {
      cursosFiltered = cursosFiltered.filter(curso => 
        new Date(curso.dataInicio) >= new Date(filtroDataInicio)
      );
    }

    // Filtro por data de fim
    if (filtroDataFim) {
      cursosFiltered = cursosFiltered.filter(curso => 
        new Date(curso.dataFim) <= new Date(filtroDataFim)
      );
    }

    setCursosFiltrados(cursosFiltered);
  }, [cursos, filtroNome, filtroStatus, filtroDataInicio, filtroDataFim]);

  const fetchInscritos = async (cursoId: number) => {
    setLoadingInscritos(true);
    try {
      console.log(`[AdminCursos] Buscando inscritos do curso ${cursoId}...`);
      const response = await apiClient.get<PessoaInscrita[]>(`/cursos/${cursoId}/inscritos`);
      setInscritos(response.data);
    } catch (err: any) {
      console.error(`[AdminCursos] Erro ao buscar inscritos do curso ${cursoId}:`, err);
      setInscritos([]);
      
      let errorMessage = `Erro ao carregar inscritos do curso`;
      if (err.response?.data) {
        const apiError: ApiError = err.response.data;
        errorMessage = apiError.error || apiError.message || errorMessage;
      }
      
      // Não mostrar toast para erro de inscritos, apenas log
      console.warn(errorMessage);
    } finally {
      setLoadingInscritos(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  useEffect(() => {
    if (cursoSelecionado) {
      fetchInscritos(cursoSelecionado.id);
    } else {
      setInscritos([]);
    }
  }, [cursoSelecionado]);

  // Event listener para clicar fora e desmarcar curso
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Se clicou fora de qualquer curso e não é em um botão de ação
      if (cursoSelecionado && 
          !target.closest('li[data-curso-item]') && 
          !target.closest('button')) {
        setCursoSelecionado(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cursoSelecionado]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    setLoadingGlobal(true);
    
    try {
      const cursoData: CursoFormData = {
        titulo,
        descricao,
        imagemCapa,
        dataInicio,
        dataFim,
        exibir,
      };
      
      let response;
      if (editId) {
        response = await apiClient.put(`/cursos/${editId}`, cursoData);
      } else {
        response = await apiClient.post("/cursos", cursoData);
      }
      
      // Limpar formulário
      setTitulo("");
      setDescricao("");
      setImagemCapa("");
      setDataInicio("");
      setDataFim("");
      setExibir(true);
      setEditId(null);
      
      // Recarregar lista
      fetchCursos();
      
      setToast({ 
        message: response.data.message || (editId ? "Curso atualizado com sucesso!" : "Curso criado com sucesso!"), 
        type: "success" 
      });
      
    } catch (err: any) {
      console.error("[AdminCursos] Erro ao salvar curso:", err);
      
      let errorMessage = "Erro ao salvar curso";
      if (err.response?.data) {
        const apiError: ApiError = err.response.data;
        errorMessage = apiError.error || apiError.message || errorMessage;
      }
      
      setToast({ message: errorMessage, type: "error" });
    } finally {
      setLoadingGlobal(false);
    }
  };

  const handleEdit = (curso: Curso) => {
    setTitulo(curso.titulo);
    setDescricao(curso.descricao);
    setImagemCapa(curso.imagemCapa || "");
    setDataInicio(curso.dataInicio?.slice(0, 10) || "");
    setDataFim(curso.dataFim?.slice(0, 10) || "");
    setExibir(curso.exibir);
    setEditId(curso.id);
    
    // Scroll para o formulário
    setTimeout(() => {
      const formulario = document.getElementById('formulario-curso');
      if (formulario) {
        formulario.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja remover este curso?")) return;
    
    setLoadingGlobal(true);
    try {
      await apiClient.delete(`/cursos/${id}`);
      fetchCursos();
      
      if (cursoSelecionado?.id === id) {
        setCursoSelecionado(null);
      }
      
      // Limpar formulário se estava editando o curso removido
      if (editId === id) {
        setTitulo("");
        setDescricao("");
        setImagemCapa("");
        setDataInicio("");
        setDataFim("");
        setExibir(true);
        setEditId(null);
      }
      
      setToast({ message: "Curso removido com sucesso!", type: "success" });
      
    } catch (err: any) {
      console.error(`[AdminCursos] Erro ao remover curso ${id}:`, err);
      
      let errorMessage = "Erro ao remover curso";
      if (err.response?.data) {
        const apiError: ApiError = err.response.data;
        errorMessage = apiError.error || apiError.message || errorMessage;
      }
      
      setToast({ message: errorMessage, type: "error" });
    } finally {
      setLoadingGlobal(false);
    }
  };

  const handleToggleExibir = async (curso: Curso) => {
    setLoadingGlobal(true);
    try {
      const response = await apiClient.patch(`/cursos/${curso.id}/exibir`, { 
        exibir: !curso.exibir 
      });
      
      fetchCursos();
      setToast({ 
        message: response.data.message || (curso.exibir ? "Curso ocultado da página pública!" : "Curso exibido na página pública!"), 
        type: "success" 
      });
      
    } catch (err: any) {
      console.error(`[AdminCursos] Erro ao alterar visibilidade do curso ${curso.id}:`, err);
      
      let errorMessage = "Erro ao atualizar exibição";
      if (err.response?.data) {
        const apiError: ApiError = err.response.data;
        errorMessage = apiError.error || apiError.message || errorMessage;
      }
      
      setToast({ message: errorMessage, type: "error" });
    } finally {
      setLoadingGlobal(false);
    }
  };

  const handleSelectCurso = (curso: Curso) => {
    setCursoSelecionado(cursoSelecionado?.id === curso.id ? null : curso);
  };

  const limparFiltros = () => {
    setFiltroNome("");
    setFiltroStatus("todos");
    setFiltroDataInicio("");
    setFiltroDataFim("");
  };

  const cancelarEdicao = () => {
    setTitulo("");
    setDescricao("");
    setImagemCapa("");
    setDataInicio("");
    setDataFim("");
    setExibir(true);
    setEditId(null);
  };

  return (
    <ProtectedRoute>
      <main className="pt-20 pb-8 px-4 max-w-5xl mx-auto">
        {loadingGlobal && <LoadingSpinner />}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6">Gerenciar Cursos</h1>

        {/* Filtros */}
        <div className="mb-6 bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-200 mb-4">Filtros</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Nome do Curso</label>
              <input
                type="text"
                value={filtroNome}
                onChange={e => setFiltroNome(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Buscar por nome..."
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Status</label>
              <select
                value={filtroStatus}
                onChange={e => setFiltroStatus(e.target.value as "todos" | "exibindo" | "oculto")}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              >
                <option value="todos">Todos</option>
                <option value="exibindo">Exibindo</option>
                <option value="oculto">Oculto</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Data Início (A partir de)</label>
              <input
                type="date"
                value={filtroDataInicio}
                onChange={e => setFiltroDataInicio(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Data Fim (Até)</label>
              <input
                type="date"
                value={filtroDataFim}
                onChange={e => setFiltroDataFim(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <button
              onClick={limparFiltros}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Limpar Filtros
            </button>
            <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
              Mostrando {cursosFiltrados.length} de {cursos.length} cursos
            </span>
          </div>
        </div>

        {/* Lista de cursos */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-200 mb-4">Cursos cadastrados</h2>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-gray-600 dark:text-gray-400">Carregando cursos...</span>
            </div>
          ) : cursosFiltrados.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              {cursos.length === 0 ? "Nenhum curso cadastrado ainda. Use o formulário abaixo para adicionar o primeiro curso!" : "Nenhum curso encontrado com os filtros aplicados."}
            </p>
          ) : (
            <ul className="space-y-4">
              {cursosFiltrados.map(curso => (
                <li
                  key={curso.id}
                  data-curso-item
                  className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-800 cursor-pointer transition-shadow ${cursoSelecionado?.id === curso.id ? 'ring-2 ring-blue-400 shadow-lg' : ''} ${editId === curso.id ? 'ring-2 ring-green-400 bg-green-50 dark:bg-green-900/20' : ''}`}
                  onClick={() => handleSelectCurso(curso)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">{curso.titulo}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${curso.exibir ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                          {curso.exibir ? 'Visível' : 'Oculto'}
                        </span>
                        {editId === curso.id && (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Editando
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{curso.descricao}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(curso.dataInicio).toLocaleDateString('pt-BR')} - {new Date(curso.dataFim).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleExibir(curso); }}
                        className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${curso.exibir ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                      >
                        {curso.exibir ? 'Ocultar' : 'Exibir'}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(curso); }}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(curso.id); }}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                  
                  {cursoSelecionado?.id === curso.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="mt-2">
                        <h4 className="font-semibold text-sm text-blue-700 dark:text-blue-200 mb-1">Inscritos</h4>
                        {loadingInscritos ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">Carregando...</span>
                          </div>
                        ) : inscritos.length === 0 ? (
                          <p className="text-xs text-gray-500">Nenhum inscrito</p>
                        ) : (
                          <ul className="max-h-32 overflow-y-auto text-xs">
                            {inscritos.map(p => (
                              <li key={p.id} className="border-b border-gray-200 dark:border-gray-700 py-1 flex justify-between">
                                <span>{p.nome} ({p.email})</span>
                                <span className="text-gray-400">{new Date(p.inscritoEm).toLocaleDateString()}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
        
        {/* Formulário de criação/edição */}
        <section id="formulario-curso">
          <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-200 mb-4">
            {editId ? "Editar Curso" : "Criar Novo Curso"}
          </h2>
          
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4 border border-gray-100 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Título</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  placeholder="Digite o título do curso"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Imagem de Capa (URL)</label>
                <input
                  type="url"
                  value={imagemCapa}
                  onChange={e => setImagemCapa(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Descrição</label>
              <textarea
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
                required
                placeholder="Descreva o curso"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Data de Início</label>
                <input
                  type="date"
                  value={dataInicio}
                  onChange={e => setDataInicio(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 [color-scheme:light] dark:[color-scheme:dark]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Data de Fim</label>
                <input
                  type="date"
                  value={dataFim}
                  onChange={e => setDataFim(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 [color-scheme:light] dark:[color-scheme:dark]"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="exibir"
                checked={exibir}
                onChange={e => setExibir(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="exibir" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Exibir na página pública de cursos
              </label>
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition-colors disabled:opacity-60"
                disabled={loadingGlobal}
              >
                {editId ? "Atualizar Curso" : "Criar Curso"}
              </button>
              
              {editId && (
                <button
                  type="button"
                  onClick={cancelarEdicao}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold shadow hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>
      </main>
    </ProtectedRoute>
  );
} 