export default function CaprichandoMoradia() {
  return (
    <main className="pt-24 pb-8 px-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-teal-800 dark:text-blue-300 mb-4">
          Caprichando a Moradia
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Melhorando a qualidade de vida através de melhorias habitacionais
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-4">
            Sobre o Projeto
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            O projeto "Caprichando a Moradia" tem como objetivo promover melhorias nas condições 
            habitacionais de famílias em situação de vulnerabilidade social, oferecendo assessoria 
            técnica, materiais de construção e mão de obra especializada.
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            Através de parcerias com profissionais da construção civil e voluntários, 
            realizamos reformas, ampliações e adequações que transformam casas em lares mais 
            dignos e seguros para as famílias atendidas.
          </p>
        </section>

        <section className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 border border-blue-200 dark:border-gray-600">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-200 mb-6">
            Tipos de Intervenção
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Reformas Estruturais</h3>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Reparos no telhado</li>
                <li>• Pintura interna e externa</li>
                <li>• Revisão elétrica básica</li>
                <li>• Reparos hidráulicos</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Ampliações</h3>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Construção de cômodos</li>
                <li>• Banheiros adaptados</li>
                <li>• Área de serviço</li>
                <li>• Varanda coberta</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">♿</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Acessibilidade</h3>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Rampas de acesso</li>
                <li>• Barras de apoio</li>
                <li>• Alargamento de portas</li>
                <li>• Pisos antiderrapantes</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Sustentabilidade</h3>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Sistemas de captação de água</li>
                <li>• Energia solar básica</li>
                <li>• Hortas domésticas</li>
                <li>• Composteiras</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-6">
            Processo de Atendimento
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Cadastro</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  A família se cadastra informando suas necessidades e situação socioeconômica.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Visita Técnica</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Nossa equipe realiza visita para avaliar as condições da moradia e definir o projeto.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Análise</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  O caso é analisado pela equipe técnica e social para aprovação do atendimento.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Execução</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Início dos trabalhos com acompanhamento técnico e participação da família.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">5</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Finalização</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Entrega da obra com orientações para manutenção e conservação.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-teal-50 dark:bg-gray-700 rounded-lg p-8 border border-teal-200 dark:border-gray-600">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-teal-700 dark:text-teal-300 mb-4">
              🏡 Precisa de melhorias na sua moradia?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Se você está em situação de vulnerabilidade social e precisa de melhorias em sua casa, 
              cadastre-se conosco. Nossa equipe avaliará sua solicitação com carinho e atenção.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                📋 Fazer Cadastro
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                💰 Apoiar o Projeto
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                🔧 Ser Voluntário
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 