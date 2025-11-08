"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Produto } from "@/app/types/produto";
import { obterProduto } from "@/app/hooks/useProdutos";

export default function ProdutoDetalhes({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const router = useRouter();
  const [id, setId] = useState<string>("");

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      carregarProduto(Number(p.id));
    });
  }, [params]);

  async function carregarProduto(produtoId: number) {
    try {
      setCarregando(true);
      const data = await obterProduto(produtoId);
      setProduto(data);
    } catch (error: any) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return (
      <main className="min-h-screen bg-indigo-200 py-16 flex items-center justify-center">
        <p className="text-white text-xl">Carregando produto...</p>
      </main>
    );
  }

  if (erro || !produto) {
    return (
      <main className="min-h-screen bg-indigo-200 py-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">
            {erro || "Produto não encontrado"}
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-sky-500 text-white px-6 py-2 rounded hover:bg-sky-600"
          >
            Voltar para lista
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-indigo-200 py-16">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => router.push("/")}
          className="mb-6 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Voltar
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-black text-2xl font-bold mb-2">
            Detalhes do Produto
          </h2>
          <div className="mb-6">
            <span className="inline-block bg-sky-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              # {produto.categoria}
            </span>
          </div>

          <h3 className="text-black text-3xl font-bold mb-4">
            {produto.titulo}
          </h3>

          <p className="text-green-600 text-3xl font-bold mb-6">
            R$ {produto.preco.toFixed(2)}
          </p>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-black text-xl font-semibold mb-3">Descrição</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {produto.descricao}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 font-semibold">
                  ID do Produto:
                </span>
                <span className="text-black ml-2">{produto.id}</span>
              </div>
              <div>
                <span className="text-gray-500 font-semibold">Categoria:</span>
                <span className="text-black ml-2">{produto.categoria}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
