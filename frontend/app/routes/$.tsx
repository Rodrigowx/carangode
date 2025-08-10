import { useLocation } from "react-router";

export function meta() {
  return [
    { title: "Página não encontrada - Instituto Carangondé Cidadania" },
    { name: "description", content: "A página que você procura não existe." },
  ];
}

export default function CatchAllRoute() {
  const location = useLocation();
  
  // Rotas especiais que devem retornar uma resposta silenciosa (DevTools, etc.)
  const silentRoutes = [
    '/.well-known/appspecific/com.chrome.devtools.json',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml'
  ];
  
  // Se for uma rota silenciosa, retornar apenas uma resposta simples
  if (silentRoutes.includes(location.pathname)) {
    return (
      <div style={{ display: 'none' }}>
        {/* Resposta silenciosa para ferramentas de desenvolvimento */}
      </div>
    );
  }
  
  // Para outras rotas não encontradas, mostrar página 404 amigável
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6 py-12 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-orange-600 dark:text-orange-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.73-6.291-1.709C7.376 11.57 9.596 11 12 11s4.624.57 6.291 2.291zM12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03 9 9z" 
              />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            404
          </h1>
          
          <h2 className="text-xl font-semibold text-teal-800 dark:text-teal-200 mb-4">
            Página não encontrada
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="space-y-4">
          <a
            href="/"
            className="inline-block w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-colors"
          >
            Voltar ao Início
          </a>
          
          <a
            href="/contato"
            className="inline-block w-full px-6 py-3 border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white rounded-full font-semibold transition-colors"
          >
            Entre em Contato
          </a>
        </div>
        
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Rota acessada: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </div>
      </div>
    </main>
  );
} 