import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsAuthenticated(false);
        setIsValidating(false);
        return;
      }

      try {
        // Verificar se o token não está expirado (básico)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (payload.exp && payload.exp < currentTime) {
          // Token expirado
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setIsValidating(false);
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        // Token malformado
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  useEffect(() => {
    if (!isValidating && !isAuthenticated) {
      navigate("/login", { 
        state: { from: location }, 
        replace: true 
      });
    }
  }, [isValidating, isAuthenticated, navigate, location]);

  if (isValidating) {
    return (
      <div className="pt-24 pb-8 px-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Validando acesso...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Vai redirecionar para login
  }

  return <>{children}</>;
} 