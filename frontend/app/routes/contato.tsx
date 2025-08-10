import { useForm } from "react-hook-form";

export default function Contato() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

  const onSubmit = (data: any) => {
    // Aqui você pode integrar com o backend futuramente
    alert("Mensagem enviada! Obrigado pelo contato.");
  };

  return (
    <main className="pt-24 pb-8 px-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4">Fale Conosco</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4 border border-gray-100 dark:border-gray-800">
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Nome</label>
          <input
            type="text"
            {...register("nome", { required: "Nome obrigatório" })}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.nome && <span className="text-red-600 text-sm">{errors.nome.message as string}</span>}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">E-mail</label>
          <input
            type="email"
            {...register("email", { required: "E-mail obrigatório" })}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <span className="text-red-600 text-sm">{errors.email.message as string}</span>}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Mensagem</label>
          <textarea
            rows={4}
            {...register("mensagem", { required: "Mensagem obrigatória" })}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.mensagem && <span className="text-red-600 text-sm">{errors.mensagem.message as string}</span>}
        </div>
        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition-colors"
        >
          Enviar
        </button>
        {isSubmitSuccessful && (
          <p className="text-green-600 text-center mt-2">Mensagem enviada com sucesso!</p>
        )}
      </form>
    </main>
  );
} 