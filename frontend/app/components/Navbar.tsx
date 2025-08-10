import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import carangondeLogo from "../utils/carangonde.svg";
import { getTheme, toggleTheme, type Theme } from "../utils/theme";

interface SubMenuItem {
  name: string;
  path: string;
  description?: string;
}

interface MenuItem {
  name: string;
  path?: string;
  subItems?: SubMenuItem[];
}

const navItems: MenuItem[] = [
  {
    name: "Sobre Nós",
    subItems: [
      { name: "Página Institucional", path: "/sobre", description: "Equipe, Missão e Presença Nacional" },
      { name: "Quem Somos", path: "/sobre/quem-somos", description: "Rede de OSC's e Líderes Sociais" },
      { name: "Missão, Visão e Valores", path: "/sobre/missao-visao-valores" },
      { name: "Transparência", path: "/sobre/transparencia" },
    ]
  },
  {
    name: "Tecnologias Sociais",
    subItems: [
      { name: "Bazar Solidário", path: "/projetos/bazar-solidario" },
      { name: "Pontos de Coleta", path: "/projetos/pontos-coleta" },
      { name: "Manual para Doação", path: "/projetos/manual-doacao" },
      { name: "Caprichando a Moradia", path: "/projetos/caprichando-moradia" },
      { name: "Análise de Moradia", path: "/projetos/analise-moradia" },
      { name: "Escritório Público de Arquitetura", path: "/projetos/escritorio-arquitetura" },
      { name: "Carangondé University", path: "/cursos" },
      { name: "CSA - Agricultura Familiar", path: "/projetos/agricultura-familiar" },
      { name: "Cadastro de Produtores", path: "/projetos/cadastro-produtores" },
    ]
  },
  {
    name: "Como Apoiar",
    subItems: [
      { name: "Seja um Voluntário", path: "/apoiar/voluntariado" },
      { name: "Doações", path: "/doacao" },
      { name: "Parcerias Empresariais", path: "/apoiar/parcerias-empresas" },
      { name: "Formulário de Parceiros", path: "/apoiar/formulario-parceiros" },
      { name: "Trabalhe Conosco", path: "/apoiar/trabalhe-conosco" },
      { name: "Vagas Abertas", path: "/apoiar/vagas" },
      { name: "Envie seu Currículo", path: "/apoiar/curriculo" },
    ]
  },
  { name: "Notícias", path: "/noticias" },
  { name: "Contato", path: "/contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>("system");
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Função para verificar o token
  const checkAdminStatus = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsAdmin(Boolean(token));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Inicializa o tema e estado de admin
      const theme = getTheme();
      setCurrentTheme(theme);
      checkAdminStatus();

      // Escuta mudanças no localStorage
      const handleStorageChange = () => {
        checkAdminStatus();
      };

      // Escuta eventos customizados para login/logout
      const handleAuthChange = () => {
        checkAdminStatus();
      };

      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('authChange', handleAuthChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('authChange', handleAuthChange);
      };
    }
  }, []);

  // Controlar scroll do body quando menu está aberto
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      
      // Cleanup quando componente desmonta
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [open]);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInsideDropdown = Object.values(dropdownRefs.current).some(ref => 
        ref && ref.contains(target)
      );
      
      if (!isInsideDropdown) {
        setOpenDropdown(null);
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  // Recarregar status quando mudar de rota
  useEffect(() => {
    checkAdminStatus();
    setOpenDropdown(null);
    setOpen(false);
  }, [location.pathname]);

  const handleToggleTheme = () => {
    const newTheme = toggleTheme();
    setCurrentTheme(newTheme);
    console.log("Tema alterado para:", newTheme);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      setIsAdmin(false);
      navigate("/");
      // Disparar evento customizado
      window.dispatchEvent(new Event('authChange'));
    }
  };

  // Determina qual ícone mostrar baseado no tema atual
  const getSystemTheme = () => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const actualTheme = currentTheme === "system" ? getSystemTheme() : currentTheme;
  const isDark = actualTheme === "dark";

  const handleMobileSubmenuToggle = (itemName: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === itemName ? null : itemName);
  };

  const isPathActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isSubItemActive = (subItems?: SubMenuItem[]) => {
    if (!subItems) return false;
    return subItems.some(item => isPathActive(item.path));
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-orange-50 dark:bg-gray-900 border-b border-orange-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold tracking-tight text-teal-700 dark:text-blue-200">
          <img src={carangondeLogo} alt="Logo Carangondé" className="h-20 w-20 object-contain" />
          <span className="sm:hidden">Carangondé</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-1 items-center">
          {navItems.map((item) => (
            <div key={item.name} className="relative" ref={el => { dropdownRefs.current[item.name] = el; }}>
              {item.subItems ? (
                <div
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-3 text-lg font-medium transition-colors duration-200 hover:text-orange-600 dark:hover:text-blue-300 rounded-md hover:bg-orange-100 dark:hover:bg-gray-800 ${
                      isSubItemActive(item.subItems) ? 'text-orange-700 dark:text-blue-200 bg-orange-100 dark:bg-gray-800' : 'text-teal-600 dark:text-gray-200'
                    }`}
                  >
                    {item.name}
                    <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown */}
                  <div className={`absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-orange-200 dark:border-gray-700 transition-all duration-200 ${
                    openDropdown === item.name ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
                  }`}>
                    <div className="p-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block px-4 py-3 rounded-md transition-colors duration-200 hover:bg-orange-50 dark:hover:bg-gray-700 ${
                            isPathActive(subItem.path) ? 'text-orange-700 dark:text-blue-200 bg-orange-50 dark:bg-gray-700' : 'text-gray-700 dark:text-gray-200'
                          }`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <div className="font-medium text-base">{subItem.name}</div>
                          {subItem.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subItem.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path!}
                  className={`px-4 py-3 text-lg font-medium transition-colors duration-200 hover:text-orange-600 dark:hover:text-blue-300 rounded-md hover:bg-orange-100 dark:hover:bg-gray-800 ${
                    isPathActive(item.path!) ? 'text-orange-700 dark:text-blue-200 bg-orange-100 dark:bg-gray-800' : 'text-teal-600 dark:text-gray-200'
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            className="ml-2 p-2 rounded-md bg-orange-200 dark:bg-gray-700 hover:bg-orange-300 dark:hover:bg-gray-600 transition cursor-pointer"
            aria-label="Alternar tema"
          >
            {isDark ? (
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-12.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 4.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-orange-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>

          {/* Admin/Login */}
          {isAdmin && (
            <>
              <Link
                to="/admin/cursos"
                className={`px-4 py-3 text-lg font-medium transition-colors duration-200 hover:text-orange-600 dark:hover:text-blue-300 rounded-md hover:bg-orange-100 dark:hover:bg-gray-800 ${
                  location.pathname.startsWith("/admin") ? 'text-orange-700 dark:text-blue-200 bg-orange-100 dark:bg-gray-800' : 'text-teal-600 dark:text-gray-200'
                }`}
              >
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 text-base font-semibold transition-colors"
              >
                Sair
              </button>
            </>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-md bg-orange-200 dark:bg-gray-700 hover:bg-orange-300 dark:hover:bg-gray-600 transition cursor-pointer"
            aria-label="Alternar tema"
          >
            {isDark ? (
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-12.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 4.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-orange-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
          <button
            className="flex items-center p-2 rounded-md hover:bg-orange-100 dark:hover:bg-gray-700 text-teal-700 dark:text-gray-200"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Mobile Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-orange-50 dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:hidden flex flex-col`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between h-20 px-4 border-b border-orange-200 dark:border-gray-700 flex-shrink-0">
          <span className="flex items-center gap-3 text-xl font-bold text-teal-700 dark:text-blue-200">
            <img src={carangondeLogo} alt="Logo Carangondé" className="h-8 w-8 object-contain" />
            Carangondé
          </span>
          <button 
            onClick={() => setOpen(false)} 
            aria-label="Fechar menu"
            className="p-1 rounded hover:bg-orange-100 dark:hover:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col p-4 overflow-y-auto flex-1">
          {navItems.map((item) => (
            <div key={item.name} className="mb-1">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => handleMobileSubmenuToggle(item.name)}
                    className={`w-full flex items-center justify-between py-3 px-3 rounded-md transition-colors duration-200 hover:bg-orange-100 dark:hover:bg-gray-800 ${
                      isSubItemActive(item.subItems) ? 'bg-orange-100 text-orange-700 dark:bg-gray-800 dark:text-blue-200' : 'text-teal-600 dark:text-gray-200'
                    }`}
                  >
                    <span className="font-medium">{item.name}</span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${openMobileSubmenu === item.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Mobile Submenu */}
                  <div className={`overflow-hidden transition-all duration-300 ${openMobileSubmenu === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-4 mt-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block py-2 px-3 rounded-md transition-colors duration-200 hover:bg-orange-100 dark:hover:bg-gray-800 ${
                            isPathActive(subItem.path) ? 'text-orange-700 dark:text-blue-200 bg-orange-100 dark:bg-gray-800' : 'text-gray-600 dark:text-gray-300'
                          }`}
                          onClick={() => {
                            setOpen(false);
                            setOpenMobileSubmenu(null);
                          }}
                        >
                          <div className="text-sm font-medium">{subItem.name}</div>
                          {subItem.description && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subItem.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to={item.path!}
                  className={`block py-3 px-3 rounded-md transition-colors duration-200 hover:bg-orange-100 dark:hover:bg-gray-800 ${
                    isPathActive(item.path!) ? 'bg-orange-100 text-orange-700 dark:bg-gray-800 dark:text-blue-200' : 'text-teal-600 dark:text-gray-200'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="font-medium">{item.name}</span>
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Admin/Login */}
          <div className="mt-4 pt-4 border-t border-orange-200 dark:border-gray-700">
            {isAdmin && (
              <>
                <Link
                  to="/admin/cursos"
                  className={`block py-3 px-3 rounded-md transition-colors duration-200 hover:bg-orange-100 dark:hover:bg-gray-800 mb-2 ${
                    location.pathname.startsWith("/admin") ? 'bg-orange-100 text-orange-700 dark:bg-gray-800 dark:text-blue-200' : 'text-teal-600 dark:text-gray-200'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="font-medium">Admin</span>
                </Link>
                <button
                  onClick={() => { setOpen(false); handleLogout(); }}
                  className="w-full px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 text-sm font-semibold transition-colors"
                >
                  Sair
                </button>
              </>
            )}
          </div>
        </nav>
      </aside>
    </nav>
  );
} 