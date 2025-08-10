export default function QuemSomos() {
  return (
    <main className="pt-24 pb-8 px-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-teal-800 dark:text-blue-300 mb-4">
          Quem Somos
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Rede de OSC's e Líderes Sociais
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-4">
            Nossa Rede
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            O Instituto Carangondé Cidadania é uma organização sem fins lucrativos que atua como 
            articuladora de uma ampla rede de Organizações da Sociedade Civil (OSCs) e líderes 
            sociais comprometidos com a transformação social.
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            Nossa rede é composta por pessoas e organizações que compartilham do mesmo ideal: 
            promover a cidadania, a inclusão social e o desenvolvimento humano em suas comunidades.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-4">
            Nossos Líderes Sociais
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            Trabalhamos com líderes comunitários, educadores sociais, voluntários e profissionais 
            que dedicam seu tempo e conhecimento para criar oportunidades e transformar realidades.
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
            <li>Líderes comunitários locais</li>
            <li>Educadores sociais especializados</li>
            <li>Voluntários comprometidos</li>
            <li>Profissionais de diversas áreas</li>
            <li>Organizações parceiras</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-orange-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-blue-200 mb-4">
            Nossa Atuação
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            Atuamos em múltiplas frentes, sempre com foco na promoção da cidadania e no 
            fortalecimento das comunidades. Nossos projetos abrangem desde educação e 
            capacitação até habitação e desenvolvimento sustentável.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-orange-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                Educação e Capacitação
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Oferecemos cursos e workshops para o desenvolvimento de habilidades e competências.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                Habitação e Moradia
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Projetos para melhoria habitacional e assessoria técnica em arquitetura.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                Economia Solidária
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Iniciativas para geração de renda e fortalecimento da economia local.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                Agricultura Familiar
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Apoio aos produtores rurais e promoção da agricultura sustentável.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 