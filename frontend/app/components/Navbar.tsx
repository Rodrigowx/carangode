import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import carangondeLogo from "../utils/carangonde.svg";
import { getTheme, toggleTheme, type Theme } from "../utils/theme";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Sobre Nós", path: "/sobre" },
  { name: "Cursos", path: "/cursos" },
  { name: "Doação", path: "/doacao" },
  { name: "Contato", path: "/contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>("system");

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

  // Recarregar status quando mudar de rota
  useEffect(() => {
    checkAdminStatus();
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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-orange-50 dark:bg-gray-900 border-b border-orange-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-teal-700 dark:text-blue-200">
          <img src={carangondeLogo} alt="Logo Carangondé" className="h-8 w-8 object-contain" />
          Instituto Carangondé Cidadania
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors duration-200 hover:text-orange-600 dark:hover:text-blue-300 ${location.pathname === link.path ? 'text-orange-700 dark:text-blue-200' : 'text-teal-600 dark:text-gray-200'}`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleToggleTheme}
            className="ml-2 p-2 rounded bg-orange-200 dark:bg-gray-700 hover:bg-orange-300 dark:hover:bg-gray-600 transition cursor-pointer"
            aria-label="Alternar tema"
          >
            {isDark ? (
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-12.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 4.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
          {isAdmin ? (
            <>
              <Link
                to="/admin/cursos"
                className={`font-medium transition-colors duration-200 hover:text-orange-600 dark:hover:text-blue-300 ${location.pathname.startsWith("/admin") ? 'text-orange-700 dark:text-blue-200' : 'text-teal-600 dark:text-gray-200'}`}
              >
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm font-semibold"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`font-medium transition-colors duration-200 hover:text-orange-600 dark:hover:text-blue-300 ${location.pathname === "/login" ? 'text-orange-700 dark:text-blue-200' : 'text-teal-600 dark:text-gray-200'}`}
            >
              Login
            </Link>
          )}
        </div>
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded bg-orange-200 dark:bg-gray-700 hover:bg-orange-300 dark:hover:bg-gray-600 transition cursor-pointer"
            aria-label="Alternar tema"
          >
            {isDark ? (
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-12.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 4.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
          <button
            className="flex items-center p-2 rounded hover:bg-orange-100 dark:hover:bg-gray-700 text-teal-700 dark:text-gray-200"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
      {/* Drawer Mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-praia dark:bg-praia-escuro shadow-lg z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:hidden flex flex-col`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-yellow-100 dark:border-blue-900 flex-shrink-0">
          <span className="flex items-center gap-2 text-lg font-bold text-praia-azul dark:text-praia-claro">
            <img src={carangondeLogo} alt="Logo Carangondé" className="h-7 w-7 object-contain" />
            Carangondé
          </span>
          <button onClick={() => setOpen(false)} aria-label="Fechar menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4 overflow-y-auto flex-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`py-2 px-3 rounded transition-colors duration-200 hover:bg-yellow-100 dark:hover:bg-blue-800 ${location.pathname === link.path ? 'bg-yellow-200 text-yellow-700 dark:bg-blue-800 dark:text-yellow-200' : 'text-praia-azul dark:text-praia-claro'}`}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleToggleTheme}
            className="mt-2 p-2 rounded bg-yellow-200 cursor-pointer dark:bg-blue-900 hover:bg-yellow-300 dark:hover:bg-blue-800 transition"
            aria-label="Alternar tema"
          >
            {isDark ? (
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-12.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 4.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
          {isAdmin ? (
            <>
              <Link
                to="/admin/cursos"
                className={`py-2 px-3 rounded transition-colors duration-200 hover:bg-yellow-100 dark:hover:bg-blue-800 ${location.pathname.startsWith("/admin") ? 'bg-yellow-200 text-yellow-700 dark:bg-blue-800 dark:text-yellow-200' : 'text-praia-azul dark:text-praia-claro'}`}
                onClick={() => setOpen(false)}
              >
                Admin
              </Link>
              <button
                onClick={() => { setOpen(false); handleLogout(); }}
                className="mt-2 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm font-semibold"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`py-2 px-3 rounded transition-colors duration-200 hover:bg-yellow-100 dark:hover:bg-blue-800 ${location.pathname === "/login" ? 'bg-yellow-200 text-yellow-700 dark:bg-blue-800 dark:text-yellow-200' : 'text-praia-azul dark:text-praia-claro'}`}
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          )}
        </nav>
      </aside>
    </nav>
  );
} 