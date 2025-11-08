import { mapFakeStoreToProduto, Produto } from "../types/produto";

export class ProdutoService {
  static async obterTodosProdutos(signal?: AbortSignal): Promise<Produto[]> {
    const response = await fetch("/api", { signal });

    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }

    const data = await response.json();
    return data.map(mapFakeStoreToProduto);
  }

  static async obterProdutoPorId(id: number, signal?: AbortSignal): Promise<Produto> {
    const response = await fetch(`/api/${id}`, { signal });

    if (!response.ok) {
      throw new Error(`Erro ao buscar produto: ${response.statusText}`);
    }

    const data = await response.json();
    return mapFakeStoreToProduto(data);
  }

  static async adicionarProduto(
    produto: Omit<Produto, "id">,
    signal?: AbortSignal,
    timeout: number = 5000
  ): Promise<Produto> {
    const fetchPromise = fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: produto.titulo,
        price: produto.preco,
        description: produto.descricao,
        category: produto.categoria,
      }),
      signal,
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout ao adicionar produto")), timeout)
    );

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
      throw new Error(`Erro ao adicionar produto: ${response.statusText}`);
    }

    const data = await response.json();
    return mapFakeStoreToProduto(data);
  }

  static async atualizarProduto(
    id: number,
    produto: Partial<Produto>,
    signal?: AbortSignal,
    timeout: number = 5000
  ): Promise<Produto> {
    const fetchPromise = fetch(`/api/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: produto.titulo,
        price: produto.preco,
        description: produto.descricao,
        category: produto.categoria,
      }),
      signal,
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout ao atualizar produto")), timeout)
    );

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
      throw new Error(`Erro ao atualizar produto: ${response.statusText}`);
    }

    const data = await response.json();
    return mapFakeStoreToProduto(data);
  }

  static async deletarProduto(
    id: number,
    signal?: AbortSignal,
    timeout: number = 5000
  ): Promise<void> {
    const fetchPromise = fetch(`/api/${id}`, {
      method: "DELETE",
      signal,
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout ao deletar produto")), timeout)
    );

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
      throw new Error(`Erro ao deletar produto: ${response.statusText}`);
    }
  }
}