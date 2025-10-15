# 🛒 E-commerce Gateway
<img width="1872" height="919" alt="Screenshot from 2025-10-15 17-15-26" src="https://github.com/user-attachments/assets/ff44a56f-3ec3-4e98-9f89-99b0b7fb771a" />

> Plataforma completa de e-commerce com pagamentos Stripe, autenticação Supabase e dashboard administrativo

## 📋 Visão Geral

Sistema de e-commerce full-stack desenvolvido com Next.js 15, oferecendo uma solução completa para vendas online com integração de pagamentos, gestão de produtos e dashboard administrativo em tempo real.

### ✨ Principais Funcionalidades

- **🛍️ Catálogo de Produtos** - Interface responsiva para compra de produtos
- **💳 Pagamentos Stripe** - Processamento seguro de pagamentos com webhooks
- **👤 Autenticação** - Sistema de login/registro com Supabase Auth
- **📊 Dashboard Admin** - Gestão completa de produtos e pedidos
- **📱 Design Responsivo** - Interface moderna e adaptável
- **🔒 Segurança** - Row Level Security (RLS) e validação Zod

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 15** - App Router, Server/Client Components
- **TypeScript** - Tipagem estática e desenvolvimento seguro
- **Tailwind CSS** - Styling utilitário e design system
- **React Hook Form + Zod** - Validação de formulários

### Backend & Banco
- **Supabase** - Backend-as-a-Service
  - PostgreSQL com RLS
  - Auth com providers sociais
  - Storage para upload de imagens
  - Real-time subscriptions

### Pagamentos
- **Stripe** - Processamento de pagamentos
  - Payment Intents API
  - Webhooks para confirmação
  - Elementos seguros para cartão

### DevOps
- **Vercel** - Deploy e hosting
- **Environment Variables** - Configuração segura

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Routes    │    │   Database      │
│   (Next.js)     │◄──►│   (Next.js)     │◄──►│   (Supabase)    │
│                 │    │                 │    │                 │
│ • App Router    │    │ • Webhooks      │    │ • PostgreSQL    │
│ • Client/Server │    │ • Auth API      │    │ • RLS Policies  │
│ • Components    │    │ • Stripe API    │    │ • Real-time     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Stripe        │
                       │   • Payments    │
                       │   • Webhooks    │
                       └─────────────────┘
```

## 🚀 Funcionalidades Implementadas

### Para Compradores
- [x] Navegação por catálogo de produtos
- [x] Página de detalhes do produto
- [x] Formulário de compra com validação
- [x] Processamento de pagamento seguro
- [x] Confirmação de compra

### Para Vendedores
- [x] Dashboard administrativo
- [x] CRUD completo de produtos
- [x] Upload de imagens
- [x] Gestão de pedidos
- [x] Visualização de estatísticas

### Técnicas
- [x] Autenticação JWT com Supabase
- [x] Row Level Security (RLS)
- [x] Webhooks Stripe para sincronização
- [x] Validação de dados com Zod
- [x] Tratamento de erros robusto
- [x] Loading states e feedback visual

## 📱 Screenshots

<img width="1872" height="919" alt="Screenshot from 2025-10-15 17-12-44" src="https://github.com/user-attachments/assets/2fd6c7ea-60f2-4d57-b9f6-c42b06f69d3e" />
<img width="1872" height="919" alt="Screenshot from 2025-10-15 17-15-09" src="https://github.com/user-attachments/assets/f26cb8e8-f6ba-4a16-9e7a-517cccbbe787" />
<img width="1872" height="919" alt="Screenshot from 2025-10-15 17-15-18" src="https://github.com/user-attachments/assets/a925710d-7241-462e-ac3b-dbe6b6754928" />

## 🔧 Configuração do Projeto

### Pré-requisitos
- Conta Supabase
- Conta Stripe

### Variáveis de Ambiente

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

### Instalação

```bash
# Clone o repositório
git clone [repository-url]
cd ecommerce-gatewayfy-test

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Execute o projeto
npm run dev
```

## 🗃️ Estrutura do Banco

### Tabelas Principais
- **products** - Catálogo de produtos
- **orders** - Pedidos e transações
- **auth.users** - Usuários (Supabase Auth)

### Políticas RLS
- Acesso baseado em `user_id`
- Isolamento de dados por vendedor
- Webhooks com service role para operações administrativas

## 🔄 Fluxo de Desenvolvimento

```bash
# Criar nova feature
git checkout -b feature/nome-da-feature

# Desenvolvimento...
git add .
git commit -m "feat: implementar nova funcionalidade"

# Merge para dev
git checkout dev
git merge feature/nome-da-feature

# Deploy estável para master
git checkout master
git merge dev
git push origin master
```

## 🎯 Destaques Técnicos

### Performance
- **Server Components** para renderização otimizada
- **Image Optimization** com Next.js
- **Lazy Loading** de componentes
- **Code Splitting** automático

### Segurança
- **RLS** em todas as tabelas
- **Validação** de entrada com Zod
- **Sanitização** de dados
- **CORS** configurado

### UX/UI
- **Design System** consistente
- **Loading States** em todas as operações
- **Error Boundaries** para tratamento de erros
- **Responsive Design** mobile-first

## 📈 Próximos Passos

- [ ] Implementar notificações em tempo real
- [ ] Adicionar sistema de avaliações
- [ ] Dashboard de analytics avançado
- [ ] Integração com múltiplos gateways de pagamento
- [ ] Sistema de cupons e promoções

---

**Desenvolvido com foco em escalabilidade, segurança e experiência do usuário.**
