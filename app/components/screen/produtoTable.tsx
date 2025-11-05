"use client";

import { Produto } from "@/app/types/produto";

interface ProdutoTableProps {
  readonly produtos: Produto[];
  readonly onEdit: (produto: Produto) => void;
  readonly onDelete: (produtoId: number) => void;
}

export function ProdutoTable({
  produtos,
  onEdit,
  onDelete,
}: ProdutoTableProps) {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-black text-2xl font-bold mb-6 text-center">Lista de Produtos</h2>

      {produtos.length === 0 ? (
        <p className="text-black text-center">Nenhum produto disponível.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-white bg-sky-500 border-b-2 border-gray-300">
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Título</th>
                <th className="px-4 py-2 text-center">Preço</th>
                <th className="px-4 py-2 text-center">Descrição</th>
                <th className="px-4 py-2 text-center">Categoria</th>
                <th className="px-4 py-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, index) => (
                <tr
                  key={produto.id}
                  className={`text-black border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{produto.id}</td>
                  <td className="px-4 py-2">{produto.titulo}</td>
                  <td className="px-4 py-2">
                    R$ {produto.preco.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 max-w-xs">
                    <div className="truncate" title={produto.descricao}>
                      {produto.descricao}
                    </div>
                  </td>
                  <td className="px-4 py-2">{produto.categoria}</td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                        onClick={() => onEdit(produto)}
                      >
                        E
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
                        onClick={() => onDelete(produto.id)}
                      >
                        D
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
