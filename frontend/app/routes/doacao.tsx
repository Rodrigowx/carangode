export default function Doacao() {
  return (
    <main className="pt-24 pb-8 px-4 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4">Ajude a Transformar Vidas</h1>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-200">
        Sua doação faz a diferença! Com ela, ampliamos nossos projetos e impactamos mais pessoas. Doe qualquer valor e seja parte dessa transformação.
      </p>
      <div className="mb-6">
        <p className="font-semibold text-blue-700 dark:text-blue-200">Chave Pix:</p>
        <p className="text-lg text-gray-800 dark:text-gray-100 select-all">contato@carangonde.org</p>
      </div>
      <a
        href="mailto:contato@carangonde.org?subject=Quero%20doar%20para%20o%20Instituto%20Carangond%C3%A9"
        className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition-colors"
      >
        Quero Doar
      </a>
    </main>
  );
} 