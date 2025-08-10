export default function Voluntariado() {
  return (
    <main className="pt-24 pb-8 px-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-teal-800 dark:text-blue-300 mb-4">
          Seja um Voluntário
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Faça parte da transformação social em sua comunidade
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 border border-teal-200 dark:border-gray-600">
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-600 dark:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-teal-700 dark:text-blue-200 mb-4">
              Por que ser voluntário?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              O voluntariado é uma forma poderosa de contribuir para a sociedade, desenvolver 
              novas habilidades e fazer conexões significativas. No Instituto Carangondé, 
              você terá a oportunidade de impactar vidas e crescer pessoalmente.
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-6">
            Áreas de Atuação
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Educação</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Auxilie em cursos, workshops e atividades educativas para jovens e adultos.
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Apoio pedagógico</li>
                <li>• Coordenação de turmas</li>
                <li>• Desenvolvimento de material</li>
              </ul>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Ação Social</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Participe de ações diretas de apoio a famílias e comunidades vulneráveis.
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Bazar solidário</li>
                <li>• Distribuição de doações</li>
                <li>• Visitas domiciliares</li>
              </ul>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Tecnologia</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Contribua com seus conhecimentos em tecnologia para melhorar nossos processos.
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Desenvolvimento de sistemas</li>
                <li>• Suporte técnico</li>
                <li>• Criação de conteúdo digital</li>
              </ul>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">📢</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Comunicação</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Ajude a divulgar nosso trabalho e mobilizar a comunidade.
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Criação de conteúdo</li>
                <li>• Redes sociais</li>
                <li>• Fotografia e vídeo</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-6">
            Processo de Candidatura
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Inscrição</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Preencha o formulário de candidatura com suas informações e áreas de interesse.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Entrevista</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Conversaremos sobre suas motivações e como você pode contribuir com nossos projetos.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Capacitação</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Participará de uma capacitação sobre o instituto e os projetos em que atuará.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Início</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Começará a atuar como voluntário, sempre com o apoio da nossa equipe.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-orange-50 dark:bg-gray-700 rounded-lg p-8 border border-orange-200 dark:border-gray-600">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-orange-700 dark:text-orange-300 mb-4">
              🌟 Pronto para começar?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Junte-se a nossa equipe de voluntários e faça a diferença na vida de muitas pessoas. 
              Preencha o formulário abaixo para dar o primeiro passo.
            </p>
            
            <div className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Seu telefone"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <textarea
                placeholder="Conte-nos sobre você e suas motivações para ser voluntário..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                📋 Enviar Candidatura
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 