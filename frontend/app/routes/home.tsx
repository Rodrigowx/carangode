import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import carangondeLogo from "../utils/carangonde.svg";

export function meta() {
  return [
    { title: "Instituto Carangondé Cidadania" },
    { name: "description", content: "Transformando vidas por meio da cidadania, educação e inclusão social" },
  ];
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slides do banner principal (usando logo temporariamente)
  const mainSlides = [
    {
      image: carangondeLogo,
      title: "Transformando Vidas",
      subtitle: "Através da educação e cidadania"
    },
    {
      image: carangondeLogo,
      title: "Educação para Todos",
      subtitle: "Cursos gratuitos e capacitação profissional"
    },
    {
      image: carangondeLogo,
      title: "Inclusão Social",
      subtitle: "Oportunidades para um futuro melhor"
    }
  ];

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [mainSlides.length]);

  return (
    <main className="pt-16">
      {/* Banner Principal com Slides */}
      <section className="relative h-[70vh] md:h-[80vh] bg-gradient-to-br from-orange-100 via-amber-50 to-teal-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="text-center px-4 md:px-8 max-w-4xl mx-auto">
              <div className="mb-6 md:mb-8">
                <img 
                  src={mainSlides[currentSlide].image} 
                  alt="Instituto Carangondé" 
                  className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 opacity-80"
                />
              </div>
              <h1 className="text-3xl md:text-6xl font-bold text-teal-800 dark:text-teal-200 mb-4 md:mb-6">
                {mainSlides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-2xl text-orange-700 dark:text-orange-300 mb-6 md:mb-8">
                {mainSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/cursos"
                  className="px-6 py-3 md:px-8 md:py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-all"
                >
                  Conheça Nossos Cursos
                </Link>
                <Link
                  to="/sobre"
                  className="px-6 py-3 md:px-8 md:py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-all"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {mainSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-orange-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Seção Quem Somos */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-200 mb-4">
              Quem Somos
            </h2>
            <p className="text-lg text-orange-700 dark:text-orange-300 max-w-3xl mx-auto">
              O Instituto Carangondé Cidadania é uma organização dedicada a transformar vidas através da educação, capacitação profissional e promoção da cidadania.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-orange-200 dark:bg-orange-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-teal-700 dark:text-teal-300 mb-2">1,200+</h3>
              <p className="text-orange-600 dark:text-orange-400 font-medium">Pessoas Atendidas</p>
            </div>
            
            <div className="text-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-teal-200 dark:bg-teal-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600 dark:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-teal-700 dark:text-teal-300 mb-2">15</h3>
              <p className="text-orange-600 dark:text-orange-400 font-medium">Cidades Contempladas</p>
            </div>
            
            <div className="text-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-teal-700 dark:text-teal-300 mb-2">25+</h3>
              <p className="text-orange-600 dark:text-orange-400 font-medium">Cursos Ofertados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Conheça Nossos Cursos */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-teal-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-200 mb-4">
              Conheça Nossos Cursos
            </h2>
            <p className="text-lg text-orange-700 dark:text-orange-300 max-w-3xl mx-auto">
              Oferecemos uma variedade de cursos profissionalizantes e de capacitação para promover a inclusão social e o desenvolvimento pessoal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            {/* Curso exemplo */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-orange-200 to-amber-200 dark:from-orange-800 dark:to-amber-800 flex items-center justify-center">
                <img src={carangondeLogo} alt="Curso" className="w-16 h-16 opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-2">Informática Básica</h3>
                <p className="text-orange-600 dark:text-orange-400 mb-4">Aprenda os fundamentos da informática e navegação na internet.</p>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="block">📅 Duração: 2 meses</span>
                  <span className="block">👥 Turmas: Manhã e Tarde</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-teal-200 to-green-200 dark:from-teal-800 dark:to-green-800 flex items-center justify-center">
                <img src={carangondeLogo} alt="Curso" className="w-16 h-16 opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-2">Artesanato</h3>
                <p className="text-orange-600 dark:text-orange-400 mb-4">Desenvolva habilidades manuais e gere renda extra.</p>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="block">📅 Duração: 3 meses</span>
                  <span className="block">👥 Turmas: Tarde</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-amber-200 to-yellow-200 dark:from-amber-800 dark:to-yellow-800 flex items-center justify-center">
                <img src={carangondeLogo} alt="Curso" className="w-16 h-16 opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-2">Culinária</h3>
                <p className="text-orange-600 dark:text-orange-400 mb-4">Aprenda técnicas culinárias e abra seu próprio negócio.</p>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="block">📅 Duração: 4 meses</span>
                  <span className="block">👥 Turmas: Manhã</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/cursos"
              className="inline-block px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-all"
            >
              Ver Todos os Cursos
            </Link>
          </div>
        </div>
      </section>

      {/* Seções de Participação */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-200 mb-4">
              Faça Parte da Nossa Missão
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Seja um Parceiro */}
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-200 dark:bg-orange-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V9a2 2 0 00-2-2H10a2 2 0 00-2 2v3.1M15 13l-3-3-3 3" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">Seja um Parceiro</h3>
              <p className="text-orange-600 dark:text-orange-400 mb-6">Empresas e organizações podem apoiar nossos projetos e ampliar o impacto social.</p>
              <Link
                to="/contato"
                className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-all"
              >
                Quero Ser Parceiro
              </Link>
            </div>
            
            {/* Trabalhe Conosco */}
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-teal-200 dark:bg-teal-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-teal-600 dark:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V9a2 2 0 00-2-2H10a2 2 0 00-2 2v3.1M15 13l-3-3-3 3" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">Trabalhe Conosco</h3>
              <p className="text-orange-600 dark:text-orange-400 mb-6">Junte-se à nossa equipe e ajude a transformar vidas através da educação.</p>
              <Link
                to="/contato"
                className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold transition-all"
              >
                Ver Vagas
              </Link>
            </div>
            
            {/* Seja Voluntário */}
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg text-center md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">Seja Voluntário</h3>
              <p className="text-orange-600 dark:text-orange-400 mb-6">Dedique seu tempo e talentos para impactar positivamente a comunidade.</p>
              <Link
                to="/contato"
                className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-all"
              >
                Quero Ajudar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Investidores */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-200 mb-4">
              Nossos Apoiadores
            </h2>
            <p className="text-lg text-orange-700 dark:text-orange-300 max-w-3xl mx-auto">
              Contamos com o apoio de importantes instituições que acreditam em nossa missão.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-2">Caixa Econômica Federal</h3>
                <p className="text-orange-600 dark:text-orange-400">Parceiro estratégico em projetos de inclusão social e financeira</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção CTA Final */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-orange-500 to-teal-500 dark:from-orange-600 dark:to-teal-600">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Juntos, Transformamos o Futuro
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Participe da nossa missão de promover cidadania, educação e inclusão social.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/doacao"
              className="px-8 py-4 bg-white text-orange-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Fazer Doação
            </Link>
            <Link
              to="/contato"
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-orange-600 rounded-full font-semibold text-lg transition-all"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
