import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import LoadingSpinner from "../components/LoadingSpinner";
import apiClient from "../utils/api";
import type { LoginRequest, LoginResponse, ApiError } from "../types/api";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    setLoading(true);
    
    console.log("[Login Page] Iniciando login...");
    
    try {
      const loginData: LoginRequest = { 
        username: usuario, 
        password: senha 
      };
      
      const response = await apiClient.post<LoginResponse>("/auth/login", loginData);
      const data = response.data;
      
      if (!data.token) {
        throw new Error("Token não recebido do servidor");
      }
      
      localStorage.setItem("token", data.token);
      
      // Disparar evento customizado para atualizar a navbar
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event('authChange'));
      }
      
      setToast({ message: "Login realizado com sucesso!", type: "success" });
      
      // Aguarda um pouco para mostrar o toast de sucesso
      setTimeout(() => navigate("/admin/cursos"), 1000);
      
    } catch (err: any) {
      console.error("[Login Page] Erro no login:", err);
      
      let errorMessage = "Erro ao fazer login. Verifique suas credenciais.";
      
      if (err.response?.data) {
        const apiError: ApiError = err.response.data;
        errorMessage = apiError.error || apiError.message || errorMessage;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setToast({ message: errorMessage, type: "error" });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-20 pb-8 px-4 max-w-sm mx-auto">
      {loading && <LoadingSpinner />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6 text-center">
        Login do Administrador
      </h1>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4 border border-gray-100 dark:border-gray-800">
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Usuário
          </label>
          <input
            type="text"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Digite seu usuário"
            autoComplete="username"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Senha
          </label>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Digite sua senha"
            autoComplete="current-password"
          />
        </div>
        
        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition-colors disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
} 