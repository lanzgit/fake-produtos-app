import { useEffect, useState } from "react";
import { Produto } from "../types/produto";
import { ProdutoService } from "../service/produtoService";

export function useProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        carregarProdutos();
    }, []);

    async function carregarProdutos() {
        const response = await ProdutoService.obterTodosProdutos();
        setProdutos(response);
    }

    return {
        produtos,
        setProdutos,
    };
}