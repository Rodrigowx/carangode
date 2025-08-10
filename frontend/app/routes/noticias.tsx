export default function Noticias() {
  const noticias = [
    {
      id: 1,
      titulo: "Novo Projeto de Capacitação em Agricultura Familiar",
      resumo: "Instituto Carangondé inicia programa de capacitação para pequenos produtores rurais da região.",
      data: "15 de Janeiro, 2024",
      categoria: "Agricultura",
      imagem: "/api/placeholder/400/200"
    },
    {
      id: 2,
      titulo: "Inauguração do Novo Espaço do Bazar Solidário",
      resumo: "Ampliação do espaço permitirá atender mais famílias em situação de vulnerabilidade social.",
      data: "08 de Janeiro, 2024",
      categoria: "Ação Social",
      imagem: "/api/placeholder/400/200"
    },
    {
      id: 3,
      titulo: "Curso de Marcenaria Forma Nova Turma",
      resumo: "25 pessoas receberam certificado de conclusão do curso profissionalizante em marcenaria.",
      data: "22 de Dezembro, 2023",
      categoria: "Educação",
      imagem: "/api/placeholder/400/200"
    },
    {
      id: 4,
      titulo: "Parceria com Universidade Local Expande Projetos",
      resumo: "Nova parceria permitirá desenvolvimento de pesquisas aplicadas em tecnologias sociais.",
      data: "18 de Dezembro, 2023",
      categoria: "Parcerias",
      imagem: "/api/placeholder/400/200"
    }
  ];

  return (
    <main className="pt-24 pb-8 px-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-teal-800 dark:text-blue-300 mb-4">
          Notícias
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Acompanhe as últimas atualizações e eventos do Instituto Carangondé
        </p>
      </div>

      {/* Notícia em Destaque */}
      <section className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-orange-200 dark:border-gray-700 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="h-64 md:h-full bg-gradient-to-br from-teal-400 to-orange-400 flex items-center justify-center">
                <span className="text-white text-lg font-medium">Imagem em Destaque</span>
              </div>
            </div>
            <div className="md:w-1/2 p-6">
              <div className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-medium mb-3">
                EM DESTAQUE
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                {noticias[0].titulo}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {noticias[0].resumo} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{noticias[0].data}</span>
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Ler Mais
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Notícias */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Últimas Notícias
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.slice(1).map((noticia) => (
            <article key={noticia.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-orange-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400 text-sm">Imagem da Notícia</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-1 rounded text-xs font-medium">
                    {noticia.categoria}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{noticia.data}</span>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
                  {noticia.titulo}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                  {noticia.resumo}
                </p>
                <button className="text-teal-600 dark:text-teal-400 text-sm font-medium hover:underline">
                  Ler mais →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mt-12 bg-gradient-to-r from-teal-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 border border-orange-200 dark:border-gray-600">
        <div className="text-center max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            📬 Receba nossas notícias
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Cadastre-se para receber as últimas novidades do Instituto Carangondé diretamente no seu e-mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Inscrever-se
            </button>
          </div>
        </div>
      </section>
    </main>
  );
} 