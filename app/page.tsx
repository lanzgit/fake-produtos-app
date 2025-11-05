"use client";

import { useState } from "react";
import { AddForm, ProdutoFormValues } from "./components/screen/produtoForm";
import { ProdutoTable } from "./components/screen/produtoTable";
import { useProdutos } from "./hooks/useProdutos";

export default function Home() {
  const { produtos } = useProdutos();
  const [formValues, setFormValues] = useState<ProdutoFormValues>({
    titulo: "",
    preco: 0,
    descricao: "",
    categoria: "",
  });

  return (
    <main className="min-h-screen bg-indigo-200 py-16 space-y-8">
      <div className="space-y-8">
        <AddForm
          formValues={formValues}
          onChange={setFormValues}
          onSubmit={() => {
            console.log("Produto adicionado:", formValues);
          }}
          onCancel={() => {
            setFormValues({
              titulo: "",
              preco: 0,
              descricao: "",
              categoria: "",
            });
          }}
         />

         <ProdutoTable 
          produtos={produtos}
          onEdit={(produto) => {
            console.log("Editar produto:", produto);
          }}
          onDelete={(produtoId) => {
            console.log("Deletar produto com ID:", produtoId);
          }}
         />
      </div>
    </main>
  );
}
