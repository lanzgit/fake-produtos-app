# 📦 Fake Produtos App

## Objetivo do Projeto

Aplicação web moderna de gerenciamento de produtos desenvolvida com **Next.js 16**, que permite realizar operações completas de **CRUD** (Create, Read, Update, Delete) consumindo a API pública [FakeStore API](https://fakestoreapi.com/). A aplicação resolve o problema de gerenciamento eficiente de catálogos de produtos, oferecendo uma interface intuitiva, responsiva e com feedback visual em tempo real para todas as operações. Por fim, aprendizado e fins acadêmicos.

## Features Implementadas

### 1. **CRUD de Produtos**

#### 1.1 **Listagem de Produtos**
- Exibição em tabela produtos da API
- Campos exibidos: ID, Título, Preço (formatado em R$), Descrição e Categoria
- Navegação para página de detalhes ao clicar em qualquer linha da tabela

#### 1.2 **Visualização Detalhada**
- Página individual para cada produto (`/produtos/[id]`)
- Descrição completa do produto

#### 1.3 **Adicionar Produto**
- Formulário com validação de campos obrigatórios
- Campos: Título, Preço (number), Descrição (textarea) e Categoria
- Integração com cache local para persistência temporária
- Notificações Toast de sucesso/erro após operação

#### 1.4 **Editar Produto**
- Preenchimento automático do formulário com dados do produto selecionado
- Suporte a edição de produtos locais (cache) e produtos da API

#### 1.5 **Deletar Produto**
- Modal de confirmação com mensagem
- Sincronização automática com cache local
- Notificação Toast de sucesso após exclusão

### 2. **Gerenciamento de Estado**
- **Cache Local**: usando `Map` para armazenar produtos criados durante a sessão
- **ID Sequencial Local**: gera de forma automática de IDs únicos para produtos novos (a partir de 21) fora da API
- **Tratamento de Race Conditions**: rastreamento de operações ativas usando `Set` e `useRef`
- **Cancelamento Automático**: requisições pendentes são canceladas ao desmontar componentes
- **Limite de Operações**: controle de até 3 operações simultâneas para evitar sobrecarga
- **Mesclagem de Dados**: combinação entre produtos da API e produtos locais

### 3. **Tratamento de Erros e Loading States**
- **AbortController**: cancelamento de requisições HTTP em todas as operações
- **Promise.race**: implementação de timeout de 5 segundos para requisições
- **Mensagens de Erro**: erros específicos para certas operações
- **Tratamento de AbortError**: diferenciação entre erros reais e cancelamentos intencionais

### 4. **Sistema de Notificações Toast**
- **Componente Toast Customizado** ([`app/components/ui/toast.tsx`](app/components/ui/toast.tsx)):
  - 4 tipos de notificações: success, error, info e warning (somente a success foi implementada)
  - Ícones do Material Symbols para identificação visual
  - Animações nas notificações

### 5. **Mensagens Dinâmicas**
- **Módulo Centralizado** ([`app/utils/mensagens.ts`](app/utils/mensagens.ts)):
  - Sistema de mensagens usando template literals para personalização

### 6. **Navegação e Roteamento**
- **File-based Routing**: Estrutura de pastas do Next.js App Router
- **Rotas Dinâmicas**: `/produtos/[id]` para detalhes individuais
- **Async Params**: Suporte ao novo formato de `params` como `Promise` do Next.js 16
- **Prevenção de Navegação em Botões de Ação**: `stopPropagation` nos botões de editar/deletar

### 7. **UI/UX Responsiva e Moderna**
- **Componentes Estilizados com Tailwind CSS**:

## Tecnologias Utilizadas

### **Core**
- **[Next.js 16.0.1](https://nextjs.org/)** - Framework React com SSR, App Router e File-based Routing
- **[React 19.2.0](https://react.dev/)** 
- **[TypeScript 5](https://www.typescriptlang.org/)**

### **Estilização e UI**
- **[Tailwind CSS 4](https://tailwindcss.com/)**
- **[@tailwindcss/postcss](https://tailwindcss.com/docs/installation/using-postcss)** 
- **[Material Symbols](https://fonts.google.com/icons)**

### **API e HTTP**
- **[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)**
- **[FakeStore API](https://fakestoreapi.com/)** - API pública REST para dados de produtos
- **[AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)** - API nativa para cancelamento de requisições

### **Gerenciamento de Estado**
- **React Hooks**:
  - `useState` - Estado local de componentes
  - `useEffect` - Efeitos colaterais e lifecycle
  - `useRef` - Referências mutáveis e rastreamento
- **Custom Hooks**:
  - `useProdutos` - Lógica CRUD e gerenciamento de cache
  - `useToast` - Sistema de notificações globais
- **Async Patterns**:
  - `Promise.race` - Timeout em operações assíncronas
  - `AbortController` - Cancelamento de requisições HTTP

## Pré-requisitos

- **Node.js** 20.x ou superior
- **Gerenciador de Pacotes**: npm, yarn, pnpm ou bun
- **Navegador Moderno**: Chrome, Firefox, Safari ou Edge (últimas versões)

## Instruções de Execução

### 1. **Clone o Repositório**
```bash
git clone https://github.com/lanzgit/fake-produtos-app
cd fake-produtos-app
```

### 2. **Instale as Dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 3. **Execute o Servidor de Desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
fake-produtos-app/
├── app/
│   ├── api/                          # API Routes (Proxy para FakeStore API)
│   │   ├── route.ts                 # GET /api (listar) e POST /api (criar)
│   │   └── [id]/
│   │       └── route.ts             # GET/PUT/DELETE /api/[id] (operações individuais)
│   ├── components/
│   │   ├── screen/                  # Componentes de tela
│   │   │   ├── produtoForm.tsx     # Formulário de adicionar/editar produto
│   │   │   └── produtoTable.tsx    # Tabela de listagem de produtos
│   │   └── ui/                      # Componentes UI reutilizáveis
│   │       └── toast.tsx            # Sistema de notificações Toast
│   ├── hooks/
│   │   └── useProdutos.ts          # Hook customizado com lógica CRUD e cache
│   ├── produtos/
│   │   └── [id]/
│   │       └── page.tsx             # Página de detalhes dinâmica (rota /produtos/[id])
│   ├── service/
│   │   └── produtoService.ts        # Serviço de comunicação com API (camada de dados)
│   ├── types/
│   │   └── produto.ts               # Tipos e interfaces TypeScript
│   ├── utils/
│   │   └── mensagens.ts             # Mensagens dinâmicas com template literals
│   ├── globals.css                  # Estilos globais e variáveis CSS
│   ├── layout.tsx                   # Layout raiz da aplicação
│   └── page.tsx                     # Página principal (home) com listagem
├── public/                           # Arquivos estáticos (imagens, fonts, etc.)
├── .next/                            
├── node_modules/                     
├── .gitignore                        
├── eslint.config.mjs                 
├── next.config.ts                    
├── package.json                      
├── postcss.config.mjs                
├── README.md                         # Documentação do projeto
└── tsconfig.json                     
```

## 🔗 Link do Repositório GitHub

[https://github.com/lanzgit/fake-produtos-app](https://github.com/lanzgit/fake-produtos-app)

## 💭 Considerações Finais

### **Desafios Enfrentados e Soluções**

1. **Persistência de Dados com API Simulada**
   - **Problema**: FakeStore API não persiste dados criados (retorna sempre ID fictício) e certa dificuldade em encontrar uma API pública que tivesse operações CRUD
   - **Solução**: Sistema de cache local usando `Map<number, Produto>` com geração de IDs sequenciais locais

2. **Async Params no Next.js 16**
   - **Problema**: Nova versão do Next.js mudou `params` de objeto síncrono para `Promise`
   - **Solução**: Uso de `params.then()` e `await params` nas rotas dinâmicas

3. **Timeout em Requisições Lentas**
   - **Problema**: API externa podia travar a aplicação em caso de lentidão
   - **Solução**: `Promise.race` entre fetch e timeout de 5 segundos em todas as operações

4. **Arquitetura**
   - **Dasafio**: Arquitetura e organização de pastas por vezes me causou estranheza e confusão
   - **Solução**: A própria documentação do Next.js e alguns artigos me ambientaram

5. **React**
   - **Desafio**: Além de ser uma linguagem nova, o fato de conter tags html dentro de um arquivo typescript (.tsx) me causou certo incômodo
   - **Solução**: As próprias aulas me trouxeram clareza

6. **Tailwind**
   - **Desafio**: primeira vez utlizando essa estilização
   - **Solução**: Documentação clara e por vezes divertida
  

## Créditos e Referências

### **APIs e Serviços**
- **[FakeStore API](https://fakestoreapi.com/)** - API REST pública utilizada para dados de produtos
- **[Google Fonts](https://fonts.google.com/)** - Fonte Material Symbols para ícones

### **Documentação Oficial**
- **[Next.js Documentation](https://nextjs.org/docs)** - Guia completo do framework
- **[React Documentation](https://react.dev/)** - Referência para hooks e padrões React
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Manual oficial TypeScript
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)** - Documentação de classes e utilitários

---

**Última atualização**: Novembro 2025
