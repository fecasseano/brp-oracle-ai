# BRP Oracle AI

> Sistema inteligente de gestão de conhecimento com IA integrada para BR Partners

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-blue?logo=tailwind-css)](https://tailwindcss.com)
[![Shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black)](https://ui.shadcn.com)

## 📋 Sobre o Projeto

O **BRP Oracle AI** é um sistema inteligente que centraliza todo o conhecimento da BR Partners (Jira, Backstage e documentação) em uma única plataforma com busca alimentada por IA. Desenvolvedores e QAs podem fazer perguntas em linguagem natural e receber respostas instantâneas baseadas no histórico real da empresa.

### 🎯 Funcionalidades Implementadas

- **🏠 Dashboard Interativo**: Estatísticas em tempo real, atividade recente, ações rápidas
- **🔍 Busca Inteligente**: Pesquisa unificada em documentos, épicos e serviços com filtros avançados
- **📱 Design Responsivo**: Interface moderna que funciona perfeitamente em desktop e mobile
- **🔒 Segurança OWASP Top 10**: Rate limiting, headers de segurança, validação de inputs
- **📊 Mock Data Realístico**: Dados estruturados simulando ambiente real da BR Partners

### 🎨 Interface

- **Layout Moderno**: Sidebar responsiva com navegação intuitiva
- **Tema Zinc**: Design profissional com Shadcn/ui
- **Feedback Visual**: Toasts e estados de loading
- **Acessibilidade**: Componentes acessíveis e navegação por teclado

## 🚀 Tecnologias Utilizadas

### Core Stack
- **[Next.js 15](https://nextjs.org)** - React framework com App Router
- **[TypeScript](https://www.typescriptlang.org)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com)** - Estilização utility-first
- **[Shadcn/ui](https://ui.shadcn.com)** - Componentes UI modernos

### Funcionalidades
- **[Zod](https://zod.dev)** - Validação de schemas
- **[Sonner](https://sonner.emilkowal.ski)** - Sistema de toast notifications
- **[Lucide React](https://lucide.dev)** - Ícones modernos
- **[React Hook Form](https://react-hook-form.com)** - Gerenciamento de formulários

### Segurança & Performance
- **Rate Limiting** - Proteção contra abuso de APIs
- **OWASP Top 10** - Práticas de segurança implementadas
- **CSP Headers** - Content Security Policy configurado
- **Input Validation** - Sanitização com Zod

## 🏗️ Arquitetura

```
src/
├── app/                    # Rotas e páginas (App Router)
│   ├── page.tsx           # Dashboard principal
│   ├── search/            # Página de busca
│   └── layout.tsx         # Layout root
├── components/            # Componentes React
│   ├── ui/               # Shadcn/ui components
│   ├── features/         # Componentes de funcionalidades
│   │   └── search/       # Interface de busca
│   └── layout/           # Layout principal
├── lib/                  # Utilities e configurações
│   ├── mock-data/        # Sistema de mock data
│   └── validations/      # Schemas Zod
├── types/                # Definições TypeScript
└── middleware.ts         # Middleware de segurança
```

## ⚡ Quick Start

### Pré-requisitos
- Node.js 18.x ou superior
- npm ou yarn
- Git

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/fecasseano/brp-oracle-ai.git
   cd brp-oracle-ai
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.local.example .env.local
   # Edite .env.local com suas configurações
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Abra no navegador**
   ```
   http://localhost:3000 (ou 3002 se 3000 estiver ocupado)
   ```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

## 📚 Funcionalidades Detalhadas

### 🏠 Dashboard
- **Estatísticas em Tempo Real**: Documentos, épicos, serviços, consultas IA
- **Atividade Recente**: Últimas atualizações em tempo real
- **Ações Rápidas**: Acesso direto às funcionalidades principais
- **Consultas Populares**: Perguntas mais feitas ao Oracle AI

### 🔍 Sistema de Busca
- **Busca Unificada**: Pesquisa em documentos, épicos e serviços simultaneamente
- **Filtros Inteligentes**: Por time, produto, status, data
- **Resultados Categorizados**: Tabs separadas por tipo de conteúdo
- **Preview de Conteúdo**: Visualização do conteúdo antes de abrir
- **Metadados Ricos**: Autor, data, tags, status

### 🎨 Design System
- **Componentes Reutilizáveis**: Baseados no Shadcn/ui
- **Tema Consistente**: Cores e tipografia padronizadas
- **Estados Visuais**: Loading, erro, vazio, sucesso
- **Responsividade**: Mobile-first design

## 🔒 Segurança Implementada

- ✅ **Headers de Segurança** (OWASP)
- ✅ **Rate Limiting** por endpoint
- ✅ **Validação de Input** com Zod
- ✅ **CORS** configurado para domínios internos
- ✅ **CSP** (Content Security Policy)
- ✅ **XSS Protection**
- ✅ **Sanitização** de dados

## 📊 Mock Data

Sistema completo de dados simulados incluindo:
- **Usuários da BR Partners** com roles e times
- **Épicos do Jira** com status e detalhes
- **Serviços do Backstage** com APIs e dependências  
- **Documentos** (PRDs, guias técnicos, onboarding)
- **Delays Realísticos** para simular APIs reais

## 🚦 Status do Projeto

### ✅ Concluído (Fase 1)
- [x] Setup inicial com Next.js 15 + TypeScript
- [x] Interface moderna com Shadcn/ui
- [x] Sistema de mock data estruturado
- [x] Dashboard interativo com estatísticas
- [x] Busca inteligente com filtros
- [x] Layout responsivo
- [x] Middleware de segurança

### 🚧 Em Desenvolvimento (Fase 2)
- [ ] Chat com IA (Oracle Chat)
- [ ] APIs de integração
- [ ] Geração automática de documentos
- [ ] Sistema de autenticação
- [ ] Analytics e métricas

### 📋 Próximas Features (Fase 3)
- [ ] Integração real com Jira API
- [ ] Conexão com Backstage
- [ ] IA local (Ollama)
- [ ] Mobile PWA
- [ ] Deploy em produção

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Commit
Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new search functionality
fix: resolve authentication bug
docs: update README with new instructions
style: format code with prettier
refactor: restructure components folder
```

## 📈 Roadmap

### Q1 2024
- [x] ✅ Setup e documentação inicial
- [x] ✅ Interface moderna com busca
- [ ] 🚧 Chat IA contextual

### Q2 2024
- [ ] Integração Jira/Backstage real
- [ ] Sistema de autenticação
- [ ] Geração automática de docs

### Q3 2024
- [ ] Analytics avançados
- [ ] IA local (Ollama)
- [ ] Mobile PWA

## 📞 Suporte

- **GitHub Issues**: [Reportar problemas](https://github.com/fecasseano/brp-oracle-ai/issues)
- **Email**: f.casseano@gmail.com

## 📄 Licença

Este projeto é desenvolvido para a **BR Partners**. 

---

**Desenvolvido com ❤️ para acelerar a produtividade da equipe BR Partners** 🚀