export default function BazarSolidario() {
  return (
    <main className="pt-24 pb-8 px-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-teal-800 dark:text-blue-300 mb-4">
          Bazar Solidário
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Economia solidária e sustentabilidade em ação
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-4">
            O que é o Bazar Solidário?
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            O Bazar Solidário é um espaço de economia solidária onde promovemos a reutilização, 
            a sustentabilidade e o apoio a famílias em situação de vulnerabilidade social. 
            Funciona como um ponto de encontro entre quem pode doar e quem precisa receber.
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            Aqui, roupas, calçados, objetos de decoração, livros e outros itens ganham nova vida, 
            contribuindo para um consumo mais consciente e uma sociedade mais solidária.
          </p>
        </section>

        <section className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 border border-orange-200 dark:border-gray-600">
          <h2 className="text-2xl font-semibold text-orange-700 dark:text-yellow-200 mb-6">
            Como Funciona
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Doação</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Recebemos doações de roupas, calçados, objetos e livros em bom estado.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Triagem</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Voluntários fazem a separação e organização dos itens doados.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Distribuição</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Famílias cadastradas podem escolher os itens de que precisam.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Impacto</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Geramos impacto social e ambiental positivo na comunidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-6">
            Itens Aceitos
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-teal-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl mb-2">👕</div>
              <h3 className="font-semibold text-teal-700 dark:text-teal-300 mb-1">Roupas</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Todas as idades e tamanhos</p>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl mb-2">👟</div>
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-1">Calçados</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Em bom estado</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-1">Livros</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Didáticos e literatura</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl mb-2">🏠</div>
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Objetos</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Decoração e utensílios</p>
            </div>
          </div>
        </section>

        <section className="bg-teal-50 dark:bg-gray-700 rounded-lg p-6 border border-teal-200 dark:border-gray-600">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-teal-700 dark:text-teal-300 mb-4">
              Participe do Bazar Solidário
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Seja parte desta iniciativa de transformação social e sustentabilidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                💝 Quero Doar
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                🤝 Ser Voluntário
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                📍 Ver Localização
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 