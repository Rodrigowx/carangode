import { useState, useEffect } from "react";

export default function SobreNos() {
  const [mapSvg, setMapSvg] = useState<string>("");

  useEffect(() => {
    // Carrega o SVG do mapa do Brasil
    fetch("/br.svg")
      .then(response => response.text())
      .then(svg => setMapSvg(svg))
      .catch(err => console.error("Erro ao carregar mapa:", err));
  }, []);

  return (
    <main className="pt-24 pb-8 text-lg">
      {/* Seção 1 - EQUIPE */}
      <section className="px-4 max-w-7xl mx-auto mb-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-teal-800 dark:text-blue-300">
              NOSSA EQUIPE
            </h1>
          </div>
          <div className="w-32 h-1 bg-red-500 mx-auto mb-4" style={{
            backgroundImage: "repeating-linear-gradient(to right, #ef4444 0px, #ef4444 8px, transparent 8px, transparent 16px)"
          }}></div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Lado Esquerdo - José Reginaldo */}
          <div className="bg-red-500 text-white rounded-lg p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20 flex-shrink-0">
                  <img 
                    src="/img/jose-reginaldo.jpeg" 
                    alt="José Reginaldo" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02NCAxMkM3MS43MzIgMTIgNzggMTguMjY4IDc4IDI2Qzc4IDMzLjczMiA3MS43MzIgNDAgNjQgNDBDNTYuMjY4IDQwIDUwIDMzLjczMiA1MCAyNkM1MCA0Ni44IDY0IDUyIDc4IDYyQzkyIDcyIDEwOCA4NiAxMDggMTAyVjExNkg2NFYxMDJDNTggOTQgNTYgODggNDQgODhDMzIgODggMzAgOTQgMjQgMTAyVjExNkg2NHoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg==";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">José Reginaldo</h3>
                  <p className="text-xl">Presidente</p>
                </div>
              </div>
              
              <div className="text-sm leading-relaxed">
                <p className="mb-4">
                  <strong>INSTITUTO CARANGONDÉ CIDADANIA</strong>, CNPJ: 14.524.323/0001-99
                </p>
                <p>
                  ENTIDADE SEM FINS LUCRATIVO NESTE ATO REPRESENTADA POR SEU PRESIDENTE 
                  <strong> JOSÉ REGINALDO CORDEIRO</strong>, BRASILEIRO, TÉCNICO EM ADMINISTRAÇÃO.
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          </div>

          {/* Lado Direito - Fundadores */}
          <div className="space-y-8">
            {/* Daianny */}
            <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg relative overflow-hidden">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img 
                      src="/img/daianyy.jpeg" 
                      alt="Daianny" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA4QzQ0Ljk3MDYgOCA0OSAzNi4yNjggNDkgNDJDNDkgNDcuNzMyIDQ0Ljk3MDYgNTIgNDAgNTJDMzUuMDI5NCA1MiAzMSA0Ny43MzIgMzEgNDJDMzEgMzYuMjY4IDM1LjAyOTQgOCA0MCA4WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNDAgNTJDNTIgNTIgNjIgNjIgNjIgNzJINjJWODBINDBWNzJDMjggNzIgMTggNjIgMTggNzJWODBINDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=";
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">Daianny</h4>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  IDEALIZADORA E FUNDADORA DO INSTITUTO CARANGONDÉ CIDADANIA
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">ARQUITETA URBANISTA</p>
              </div>
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-yellow-300/30 rounded-full"></div>
            </div>

            {/* Edna */}
            <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg relative overflow-hidden">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img 
                      src="/img/edna.jpeg" 
                      alt="Edna" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA4QzQ0Ljk3MDYgOCA0OSAzNi4yNjggNDkgNDJDNDkgNDcuNzMyIDQ0Ljk3MDYgNTIgNDAgNTJDMzUuMDI5NCA1MiAzMSA0Ny43MzIgMzEgNDJDMzEgMzYuMjY4IDM1LjAyOTQgOCA0MCA4WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNDAgNTJDNTIgNTIgNjIgNjIgNjIgNzJINjJWODBINDBWNzJDMjggNzIgMTggNjIgMTggNzJWODBINDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=";
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">Edna</h4>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  CO-FUNDADORA DO INSTITUTO CARANGONDÉ CIDADANIA
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">CIENTISTA SOCIAL</p>
              </div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-yellow-300/30 rounded-full"></div>
            </div>

            {/* Marcones */}
            <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg relative overflow-hidden">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img 
                      src="/img/marcones.jpeg" 
                      alt="Marcones" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA4QzQ0Ljk3MDYgOCA0OSAzNi4yNjggNDkgNDJDNDkgNDcuNzMyIDQ0Ljk3MDYgNTIgNDAgNTJDMzUuMDI5NCA1MiAzMSA0Ny43MzIgMzEgNDJDMzEgMzYuMjY4IDM1LjAyOTQgOCA0MCA4WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNDAgNTJDNTIgNTIgNjIgNjIgNjIgNzJINjJWODBINDBWNzJDMjggNzIgMTggNjIgMTggNzJWODBINDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=";
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">Marcones</h4>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  CO-FUNDADOR DO INSTITUTO CARANGONDÉ CIDADANIA
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">TÉCNICO EM EDIFICAÇÕES E EDUCADOR SOCIAL</p>
              </div>
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-yellow-300/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2 - Missão, Visão e Atuação */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="px-4 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Missão */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 h-full shadow-lg border-l-4 border-teal-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-300">Missão</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  Promover qualidade de vida e cidadania por meio da construção de moradia digna e 
                  qualificação profissional, priorizando a educação, o desenvolvimento sustentável e 
                  o empoderamento feminino como forma de transformação social e fortalecimento das comunidades.
                </p>
              </div>
            </div>

            {/* Visão */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 h-full shadow-lg border-l-4 border-orange-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-300">Visão</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-xl font-semibold">
                  Construir Cidadania através do morar bem.
                </p>
              </div>
            </div>

            {/* O que fazemos */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 h-full shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">O que fazemos</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  Desenvolvemos um ecossistema integrado da Rede Carangondé, atuando em habitação, 
                  educação e desenvolvimento social nas comunidades urbanas e rurais da Bahia. 
                  Promovemos a dignidade humana através de projetos de moradia, capacitação profissional 
                  e fortalecimento comunitário.
                </p>
              </div>
            </div>

            {/* Como fazemos */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 h-full shadow-lg border-l-4 border-green-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">Como fazemos</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  Através de uma estratégia em rede, desenvolvemos projetos como Praia Limpa, As Severinas, 
                  Falcons University e outros. Replicamos tecnologias sociais eficazes e estabelecemos 
                  parcerias estratégicas para maximizar o impacto social e promover a sustentabilidade 
                  dos projetos nas comunidades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3 - Mapa do Brasil e Dados de Impacto */}
      <section className="py-16">
        <div className="px-4 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-teal-700 dark:text-teal-300 mb-12">
            Nossa Presença Nacional
          </h2>
          
          {/* Mapa do Brasil */}
          <div className="relative mb-12 flex justify-center">
            <div 
              className="relative max-w-lg w-full"
              dangerouslySetInnerHTML={{
                __html: mapSvg.replace(
                  /<svg([^>]*)>/,
                  `<svg$1 class="w-full h-auto text-gray-400 dark:text-gray-600" style="max-height: 500px;">`
                ).replace(
                  /fill="#88a4bc"/g,
                  'fill="currentColor"'
                ).replace(
                  /"sm_state_BRBA"/,
                  '"sm_state_BRBA" style="fill: #0d9488 !important;"'
                ).replace(
                  /"sm_state_BRRS"/,
                  '"sm_state_BRRS" style="fill: #0d9488 !important;"'
                )
              }}
            />
            
            {/* Ícones do Carangondé nos estados */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Bahia - Posição ajustada (mais para cima) */}
              <div className="absolute animate-pulse" style={{ left: '62%', top: '45%', transform: 'translate(-50%, -50%)' }}>
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-xl border-3 border-white">
                  <img 
                    src="/carangondé.svg" 
                    alt="Carangondé Bahia" 
                    className="w-7 h-7 filter brightness-0 invert"
                  />
                </div>
              </div>
              
              {/* Rio Grande do Sul - Posição ajustada (mais para a direita) */}
              <div className="absolute animate-pulse" style={{ left: '48%', top: '85%', transform: 'translate(-50%, -50%)' }}>
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-xl border-3 border-white">
                  <img 
                    src="/carangondé.svg" 
                    alt="Carangondé Rio Grande do Sul" 
                    className="w-7 h-7 filter brightness-0 invert"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dados de Impacto */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-teal-600 dark:text-teal-400 mb-2">+30</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">COMUNIDADES RURAIS</div>
              <div className="text-base text-gray-600 dark:text-gray-400">IMPACTADAS</div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">+15</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">OSCs NO ECOSSISTEMA</div>
              <div className="text-base text-gray-600 dark:text-gray-400">DA CARANGONDÉ</div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">+1.500</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">PESSOAS</div>
              <div className="text-base text-gray-600 dark:text-gray-400">IMPACTADAS</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 