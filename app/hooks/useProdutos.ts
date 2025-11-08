import { useEffect, useRef, useState } from "react";
import { AtualizarProduto, NovoProduto, Produto } from "../types/produto";
import { ProdutoService } from "../service/produtoService";

const produtosLocais = new Map<number, Produto>();
let proxIdLocal = 21;

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const operacoesEmAndamento = useRef<Set<string>>(new Set());

  useEffect(() => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    carregarProdutos(controller.signal);

    return () => {
      controller.abort();
      operacoesEmAndamento.current.clear();
    };
  }, []);

  async function carregarProdutos(signal: AbortSignal) {
    try {
      const response = await ProdutoService.obterTodosProdutos(signal);
      if (signal.aborted) return;
      const produtosCompletos = [...response, ...produtosLocais.values()];
      setProdutos(produtosCompletos);
    } catch (error: any) {
      if (error.name === "AbortError" || signal.aborted) return;
      throw error;
    }
  }

  async function adicionarProduto(produto: NovoProduto) {
    const controller = new AbortController();
    const novoProduto = await ProdutoService.adicionarProduto(produto, controller.signal);
    const idLocal = proxIdLocal++;
    novoProduto.id = idLocal;
    produtosLocais.set(novoProduto.id, novoProduto);
    setProdutos((prev) => [...prev, novoProduto]);
  }

  async function atualizarProduto(id: number, produto: AtualizarProduto) {
    const controller = new AbortController();
    const produtoAtualizado = await ProdutoService.atualizarProduto(
      id,
      produto,
      controller.signal
    );

    if (produtosLocais.has(id)) {
      produtosLocais.set(id, produtoAtualizado);
    }

    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? produtoAtualizado : p))
    );
  }

  async function deletarProduto(id: number) {
    const controller = new AbortController();
    await ProdutoService.deletarProduto(id, controller.signal);
    produtosLocais.delete(id);
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  }

  function cancelarOperacoes() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
    }
    operacoesEmAndamento.current.clear();
  }

  return {
    produtos,
    setProdutos,
    adicionarProduto,
    atualizarProduto,
    deletarProduto,
    obterProduto,
    cancelarOperacoes
  };
}

export async function obterProduto(id: number, signal?: AbortSignal): Promise<Produto> {
  if (produtosLocais.has(id)) {
    return produtosLocais.get(id)!;
  }
  return await ProdutoService.obterProdutoPorId(id, signal);
}
