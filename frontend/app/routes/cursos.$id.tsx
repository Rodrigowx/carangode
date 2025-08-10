import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "../components/Toast";
import LoadingSpinner from "../components/LoadingSpinner";
import apiClient from "../utils/api";
import type { Curso, ApiError } from "../types/api";

interface InscricaoData {
  nome: string;
  email: string;
}

export default function CursoDetalhe() {
  const { id } = useParams();
  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const [loadingInscricao, setLoadingInscricao] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const fetchCurso = async () => {
    if (!id) return;
    
    try {
      console.log(`[CursoDetalhe] Buscando curso ${id}...`);
      const response = await apiClient.get<Curso>(`/cursos/${id}`);
      setCurso(response.data);
      setErro(null);
    } catch (error: any) {
      console.error(`[CursoDetalhe] Erro ao buscar curso ${id}:`, error);
      setCurso(null);
      
      if (error.response?.status === 404) {
        setErro("Curso não encontrado");
      } else {
        setErro("Erro ao carregar o curso. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurso();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    setLoadingInscricao(true);
    
    try {
      const inscricaoData: InscricaoData = { nome, email };
      
      const response = await apiClient.post(`/cursos/${id}/inscrever`, inscricaoData);
      
      setToast({ 
        message: response.data.message || "Inscrição realizada com sucesso! Em breve entraremos em contato.", 
        type: "success" 
      });
      
      // Limpar formulário após sucesso
      setNome("");
      setEmail("");
      
    } catch (err: any) {
      console.error("[CursoDetalhe] Erro ao inscrever-se:", err);
      
      let errorMessage = "Erro ao realizar inscrição. Tente novamente.";
      
      if (err.response?.data) {
        const apiError: ApiError = err.response.data;
        errorMessage = apiError.error || apiError.message || errorMessage;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setToast({ message: errorMessage, type: "error" });
      
    } finally {
      setLoadingInscricao(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <main className="pt-24 pb-8 px-4 max-w-2xl mx-auto">
        <LoadingSpinner />
      </main>
    );
  }

  if (erro) {
    return (
      <main className="pt-24 pb-8 px-4 max-w-2xl mx-auto">
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">{erro}</p>
          <button 
            onClick={fetchCurso}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </main>
    );
  }

  if (!curso) {
    return (
      <main className="pt-24 pb-8 px-4 max-w-2xl mx-auto">
        <p className="text-center text-gray-600 dark:text-gray-400">Curso não encontrado.</p>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-8 px-4 max-w-2xl mx-auto">
      {loadingInscricao && <LoadingSpinner />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-800 flex flex-col gap-4">
        {curso.imagemCapa && (
          <img 
            src={curso.imagemCapa} 
            alt={`Capa do curso ${curso.titulo}`}
            className="w-full h-48 object-cover rounded mb-2" 
          />
        )}
        
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300">
          {curso.titulo}
        </h1>
        
        <p className="text-gray-700 dark:text-gray-200">
          {curso.descricao}
        </p>
        
        <p className="text-sm text-gray-500">
          {formatDate(curso.dataInicio)} até {formatDate(curso.dataFim)}
        </p>
        
        <hr className="my-4" />
        
        <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-200 mb-2">
          Inscreva-se neste curso
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
              Nome completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Digite seu nome completo"
              autoComplete="name"
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Digite seu e-mail"
              autoComplete="email"
            />
          </div>
          
          <button
            type="submit"
            className="mt-2 px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loadingInscricao}
          >
            {loadingInscricao ? "Enviando..." : "Inscrever-se"}
          </button>
        </form>
      </div>
    </main>
  );
}