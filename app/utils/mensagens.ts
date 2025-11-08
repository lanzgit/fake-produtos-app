export const Mensagem = {
  successAdd: (titulo: string) => `Produto "${titulo}" adicionado com sucesso!`,

  successUpdate: (titulo: string) =>
    `Produto "${titulo}" atualizado com sucesso!`,

  successDelete: (titulo: string) =>
    `Produto "${titulo}" removido com sucesso!`,

  errorAdd: (titulo: string, error?: string) =>
    `Erro ao adicionar "${titulo}"${error ? `: ${error}` : "."}`,

  errorUpdate: (titulo: string, error?: string) =>
    `Erro ao atualizar "${titulo}"${error ? `: ${error}` : "."}`,

  errorDelete: (titulo: string, error?: string) =>
    `Erro ao deletar "${titulo}"${error ? `: ${error}` : "."}`,

  errorLoad: (error?: string) =>
    `Erro ao carregar produtos${error ? `: ${error}` : "."}`,

  errorNotFound: (id: number) =>
    `Produto #${id} não foi encontrado. Ele pode ter sido removido ou não existe.`,
};

export const MensagemIcon = {
  success: "check_circle",
  error: "error",
  warning: "warning",
  info: "info",
  loading: "progress_activity",
  delete: "delete",
  edit: "edit",
  add: "add_circle",
};
