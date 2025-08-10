export default function MissaoVisaoValores() {
  return (
    <main className="pt-24 pb-8 px-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-teal-800 dark:text-blue-300 mb-4">
          Missão, Visão e Valores
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Os princípios que norteiam nossa atuação
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-gradient-to-r from-teal-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 shadow-sm border border-orange-200 dark:border-gray-600">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-teal-600 dark:bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-teal-700 dark:text-blue-200">Missão</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
            Promover a cidadania e o desenvolvimento humano por meio de ações educativas, 
            culturais e sociais que fortaleçam as comunidades e criem oportunidades para 
            uma sociedade mais justa e inclusiva.
          </p>
        </section>

        <section className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-8 shadow-sm border border-orange-200 dark:border-gray-600">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-orange-600 dark:bg-yellow-600 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-orange-700 dark:text-yellow-200">Visão</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
            Ser reconhecida como referência em transformação social e inclusão, inspirando 
            outras organizações e pessoas a fazerem a diferença em suas comunidades, 
            contribuindo para um Brasil mais próspero e equitativo.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-orange-200 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-200">Valores</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-teal-700 dark:text-teal-300 mb-1">
                    Ética e Transparência
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Pautamos nossa atuação pela honestidade, integridade e transparência em todos os processos.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-1">
                    Respeito à Diversidade
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Valorizamos e respeitamos as diferenças, promovendo a inclusão e a igualdade de oportunidades.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-1">
                    Compromisso Social
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Estamos comprometidos com a transformação social e o bem-estar das comunidades.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                    Colaboração e Solidariedade
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Acreditamos no poder da colaboração e da solidariedade para construir uma sociedade melhor.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-green-700 dark:text-green-300 mb-1">
                    Sustentabilidade
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Promovemos práticas sustentáveis que preservem o meio ambiente para as futuras gerações.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-1">
                    Inovação Social
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Buscamos constantemente novas formas de resolver problemas sociais e gerar impacto positivo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 