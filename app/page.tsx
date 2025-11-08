"use client";

import { useState } from "react";
import { AddForm, ProdutoFormValues } from "./components/screen/produtoForm";
import { ProdutoTable } from "./components/screen/produtoTable";
import { useProdutos } from "./hooks/useProdutos";
import { useToast } from "./components/ui/toast";
import { Mensagem } from "./utils/mensagens";

export default function Home() {
  const { produtos, adicionarProduto, atualizarProduto, deletarProduto, cancelarOperacoes } = useProdutos();
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<number | null>(null);
  const { showToast, ToastContainer } = useToast();
  const [formValues, setFormValues] = useState<ProdutoFormValues>({
    titulo: "",
    preco: 0,
    descricao: "",
    categoria: "",
  });
  const resetForm = () => {
    setFormValues({ 
      titulo: "",
      preco: 0,
      descricao: "",
      categoria: "",
    });
    setProdutoEmEdicao(null);
  }

  const handleSubmit = async () => {
    if (produtoEmEdicao) {
      await atualizarProduto(produtoEmEdicao, formValues);
      showToast(Mensagem.successUpdate(formValues.titulo), "success");
    } else {
      await adicionarProduto(formValues);
      showToast(Mensagem.successAdd(formValues.titulo), "success");
    }
    resetForm();
  }

  const handleEdit = async (produto: any) => {
    setFormValues({
      titulo: produto.titulo,
      preco: produto.preco,
      descricao: produto.descricao,
      categoria: produto.categoria,
    });
    setProdutoEmEdicao(produto.id);
  }

  const handleDelete = async (produtoId: number) => {
    if(confirm("Tem certeza que deseja deletar este produto?")) {
      await deletarProduto(produtoId);
      showToast(Mensagem.successDelete(`ID ${produtoId}`), "success");
    }
  }

  return (
    <main className="min-h-screen bg-indigo-200 py-16 space-y-8">
      <ToastContainer />
      <div className="space-y-8">
        <AddForm
          formValues={formValues}
          onChange={setFormValues}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          estahEditando={produtoEmEdicao !== null}
         />

         <ProdutoTable 
          produtos={produtos}
          onEdit={handleEdit}
          onDelete={handleDelete}
         />
      </div>
    </main>
  );
}
