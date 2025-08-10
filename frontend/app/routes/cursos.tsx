import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import apiClient from "../utils/api";
import type { Curso } from "../types/api";

export default function Cursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const navigate = useNavigate();

  const fetchCursos = async () => {
    try {
      console.log("[Cursos] Buscando cursos...");
      const response = await apiClient.get<Curso[]>("/cursos");
      // Filtrar apenas cursos que devem ser exibidos
      const cursosVisiveis = response.data.filter(curso => curso.exibir);
      setCursos(cursosVisiveis);
      console.log("[Cursos] Cursos visíveis carregados:", cursosVisiveis.length);
    } catch (error: any) {
      console.error("[Cursos] Erro ao buscar cursos:", error);
      setToast({ 
        message: "Erro ao carregar cursos. Tente novamente.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <main className="pt-24 pb-8 px-4 max-w-5xl mx-auto">
        <LoadingSpinner />
      </main>
    );
  }

  return (
    <main className="pt-24 pb-8 px-4 max-w-5xl mx-auto bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-200 mb-4">Nossos Cursos</h1>
        <p className="text-lg text-orange-700 dark:text-orange-300 max-w-3xl mx-auto">
          Descubra nossos cursos gratuitos de capacitação profissional e desenvolvimento pessoal. 
          Transforme sua vida através da educação!
        </p>
      </div>

      {cursos.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-orange-200 dark:bg-orange-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-orange-600 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-teal-700 dark:text-teal-300 mb-2">
            Em breve, novos cursos!
          </h2>
          <p className="text-orange-600 dark:text-orange-400">
            Estamos preparando cursos incríveis para você. Volte em breve para conferir as novidades.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cursos.map((curso) => (
            <div 
              key={curso.id} 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col border border-orange-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {curso.imagemCapa && (
                <img 
                  src={curso.imagemCapa} 
                  alt={`Capa do curso ${curso.titulo}`}
                  className="w-full h-40 object-cover" 
                />
              )}
              
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h2 className="text-xl font-bold text-teal-700 dark:text-teal-300">
                  {curso.titulo}
                </h2>
                
                <p className="text-orange-600 dark:text-orange-400 text-sm line-clamp-3 flex-1">
                  {curso.descricao}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mt-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(curso.dataInicio)} - {formatDate(curso.dataFim)}</span>
                </div>
                
                <button
                  onClick={() => navigate(`/cursos/${curso.id}`)}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  Ver detalhes / Inscrever-se
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 