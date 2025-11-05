"use client";

export type ProdutoFormValues = {
  id?: number;
  titulo: string;
  preco: number;
  descricao: string;
  categoria: string;
};

interface ProdutoFormProps {
  readonly formValues: ProdutoFormValues;
  readonly onChange: (values: ProdutoFormValues) => void;
  readonly onSubmit: () => void;
  readonly onCancel: () => void;
  readonly estahEditando?: boolean;
}

export function AddForm({
  formValues,
  onChange,
  onSubmit,
  onCancel,
  estahEditando = false,
}: ProdutoFormProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto p-6 bg-indigo-50 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-black text-2xl font-bold mb-6">
        {estahEditando ? "Editar Produto" : "Adicionar Produto"}
      </h2>

      <div className="space-y-2">
        <label htmlFor="titulo" className="block text-black font-semibold">Título:</label>
        <input
          type="text"
          value={formValues.titulo}
          onChange={(e) => onChange({ ...formValues, titulo: e.target.value })}
          className="text-black w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="preco" className="block text-black font-semibold">Preço:</label>
        <input
          type="number"
          value={formValues.preco}
          onChange={(e) => onChange({ ...formValues, preco: Number.parseFloat(e.target.value) })}
          className="text-black w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="descricao" className="block text-black font-semibold">Descrição:</label>
        <textarea
          value={formValues.descricao}
          onChange={(e) => onChange({ ...formValues, descricao: e.target.value })}
          className="text-black w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="categoria" className="block text-black font-semibold">Categoria:</label>
        <input
          type="text"
          value={formValues.categoria}
          onChange={(e) => onChange({ ...formValues, categoria: e.target.value })}
          className="text-black w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-800 font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
        >
          {estahEditando ? "Salvar Alterações" : "Adicionar Produto"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
