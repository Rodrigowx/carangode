export default function Transparencia() {
  return (
    <main className="pt-24 pb-8 px-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-teal-800 dark:text-blue-300 mb-4">
          Transparência
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Prestação de contas e transparência em nossa atuação
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-4">
            Nosso Compromisso com a Transparência
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            O Instituto Carangondé Cidadania acredita que a transparência é fundamental para 
            construir confiança com a sociedade e garantir a prestação de contas adequada de 
            nossas atividades e recursos.
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            Disponibilizamos informações sobre nossa gestão, projetos, resultados e finanças 
            de forma clara e acessível para todos os interessados.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-6">
            Documentos e Relatórios
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                📋 Estatuto Social
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Documento que rege a organização e funcionamento do instituto.
              </p>
              <button className="text-orange-600 dark:text-orange-400 text-sm font-medium hover:underline">
                Baixar PDF
              </button>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                📊 Relatório Anual 2023
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Relatório completo de atividades e resultados do ano de 2023.
              </p>
              <button className="text-orange-600 dark:text-orange-400 text-sm font-medium hover:underline">
                Baixar PDF
              </button>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                💰 Demonstrações Financeiras
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Balanço patrimonial e demonstração de resultados auditados.
              </p>
              <button className="text-orange-600 dark:text-orange-400 text-sm font-medium hover:underline">
                Baixar PDF
              </button>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                🎯 Plano Estratégico
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Planejamento estratégico com metas e objetivos para os próximos anos.
              </p>
              <button className="text-orange-600 dark:text-orange-400 text-sm font-medium hover:underline">
                Baixar PDF
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-6">
            Governança e Estrutura
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Conselho Diretor
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                Órgão máximo de decisão, responsável pela definição das diretrizes estratégicas.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Presidente: [Nome a ser definido]</li>
                <li>• Vice-Presidente: [Nome a ser definido]</li>
                <li>• Secretário: [Nome a ser definido]</li>
                <li>• Tesoureiro: [Nome a ser definido]</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Conselho Fiscal
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Responsável pela fiscalização da gestão financeira e patrimonial da organização.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Equipe Técnica
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Profissionais especializados responsáveis pela execução dos projetos e atividades.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-orange-50 dark:bg-gray-700 rounded-lg p-6 border border-orange-200 dark:border-gray-600">
          <h2 className="text-2xl font-semibold text-orange-700 dark:text-orange-300 mb-4">
            Certificações e Registros
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">CNPJ</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Cadastro Nacional de Pessoa Jurídica
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl mb-2">✅</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">OSCIP</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Organização da Sociedade Civil
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Auditoria</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Auditoria externa independente
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-4">
            Canal de Denúncias e Sugestões
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            Mantemos um canal aberto para receber denúncias, sugestões e críticas construtivas. 
            Todas as manifestações são tratadas com total confidencialidade e seriedade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors">
              💬 Fazer uma Denúncia
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors">
              💡 Enviar Sugestão
            </button>
          </div>
        </section>
      </div>
    </main>
  );
} 