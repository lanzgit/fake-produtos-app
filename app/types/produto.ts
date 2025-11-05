export interface Produto {
    id: number;
    titulo: string;
    preco: number;
    descricao: string;
    categoria: string;
}
export type NovoProduto = Omit<Produto, 'id'>;
export type AtualizarProduto = Partial<NovoProduto>;

export const produtos: Produto[] = [
    { id: 1, titulo: 'Camiseta', preco: 29.99, descricao: 'Camiseta de algodão confortável', categoria: 'Roupas' },
    { id: 2, titulo: 'Tênis', preco: 89.99, descricao: 'Tênis esportivo para corrida', categoria: 'Calçados' },
    { id: 3, titulo: 'Mochila', preco: 49.99, descricao: 'Mochila resistente para uso diário', categoria: 'Acessórios' },
];

export interface FakeStoreProducts {
    readonly id: number;
    readonly title: string;
    readonly price: number;
    readonly description: string;
    readonly category: string;
}

export function mapFakeStoreToProduto(fakeStoreProduct: FakeStoreProducts): Produto {
    return {
        id: fakeStoreProduct.id,
        titulo: fakeStoreProduct.title,
        preco: fakeStoreProduct.price,
        descricao: fakeStoreProduct.description,
        categoria: fakeStoreProduct.category,
    };
}