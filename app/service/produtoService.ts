import { mapFakeStoreToProduto, Produto } from "../types/produto";

export class ProdutoService {
   static async obterTodosProdutos(): Promise<Produto[]> {
        const response = await fetch("/api");
        const data = await response.json();
        
        return data.map(mapFakeStoreToProduto);
    }
}