# 🛒 E-commerce Gateway
<img width="1872" height="919" alt="Screenshot from 2025-10-15 17-15-26" src="https://github.com/user-attachments/assets/ff44a56f-3ec3-4e98-9f89-99b0b7fb771a" />

> **Plataforma completa de e-commerce com pagamentos Stripe, autenticação Supabase e dashboard administrativo**
<div align="center">

![Stripe](https://img.shields.io/badge/Stripe-5469d4?style=for-the-badge&logo=stripe&logoColor=ffffff)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

[Ir pra site de produção](https://ecommerce-gatewayfy-test.vercel.app/)

## 🚀 **COMO TESTAR O PROJETO** (Para Recrutadores)

### **1️⃣ PRIMEIRO PASSO: FAÇA LOGIN**
- Acesse: `/auth/login`
- **Crie uma conta** ou use credenciais existentes
- **Após login** → Você será redirecionado para `/products`

### **2️⃣ SEGUNDO PASSO: GERENCIE PRODUTOS**
- **Rota:** `/products` (Dashboard do vendedor)
- **Funcionalidades:**
  - ➕ **Adicionar produtos** (botão "Add New Product")
  - ✏️ **Editar produtos** (clique no ícone de edição)
  - 🗑️ **Deletar produtos** (clique no ícone de lixeira)
  - 📸 **Upload de imagens** via drag & drop

### **3️⃣ TERCEIRO PASSO: COMPRE UM PRODUTO**
- **Rota:** `/buy` (Catálogo público)
- **Funcionalidades:**
  - 🛍️ **Visualizar produtos** disponíveis
  - 🛒 **Comprar produto** (clique em "Buy Now")
  - 💳 **Processar pagamento** via Stripe
  - ✅ **Confirmar compra** com dados do comprador

### **4️⃣ QUARTO PASSO: VER PEDIDOS**
- **Rota:** `/orders` (Gestão de pedidos)
- **Funcionalidades:**
  - 📋 **Listar todos os pedidos**
  - 👁️ **Ver detalhes** (clique no ID do pedido)
  - 📊 **Status de pagamento** (Pago/Pendente/Falhou)

---

## 🗺️ **ROTAS PRINCIPAIS**

| Rota | Descrição | Acesso |
|------|-----------|---------|
| `/` | Home (redireciona para /buy) | Público |
| `/auth/login` | **LOGIN** | Público |
| `/auth/sign-up` | **CADASTRO** | Público |
| `/buy` | **CATÁLOGO DE PRODUTOS** | Público |
| `/buy/[product-id]` | **COMPRA DE PRODUTO** | Público |
| `/products` | **DASHBOARD VENDEDOR** | Autenticado |
| `/orders` | **GESTÃO DE PEDIDOS** | Autenticado |
| `/orders/[orderId]` | **DETALHES DO PEDIDO** | Autenticado |

---

## ⚡ **RESUMO EXECUTIVO**

### **🎯 O que foi desenvolvido:**
- **Sistema completo de e-commerce** com Next.js 15 + TypeScript
- **Autenticação segura** com Supabase Auth
- **Pagamentos reais** integrados com Stripe
- **Dashboard administrativo** para gestão de produtos e pedidos
- **Interface responsiva** e moderna

### **🔧 Stack Tecnológica:**
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Pagamentos:** Stripe (Payment Intents + Webhooks)
- **Deploy:** Vercel

### **💡 Destaques Técnicos:**
- ✅ **Row Level Security (RLS)** para isolamento de dados
- ✅ **Webhooks Stripe** para sincronização de pagamentos
- ✅ **Upload de imagens** com Supabase Storage
- ✅ **Validação de formulários** com Zod
- ✅ **Arquitetura escalável** com Server/Client Components

---

## 🔧 **CONFIGURAÇÃO RÁPIDA**

### **Variáveis de Ambiente Necessárias:**
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

### **Instalação:**
```bash
npm install
npm run dev
# Acesse: http://localhost:3000
```

---

## 📱 **SCREENSHOTS DO PROJETO**

<img width="1872" height="919" alt="Screenshot from 2025-10-15 17-12-44" src="https://github.com/user-attachments/assets/2fd6c7ea-60f2-4d57-b9f6-c42b06f69d3e" />
<img width="1872" height="919" alt="Screenshot from 2025-10-15 17-15-09" src="https://github.com/user-attachments/assets/f26cb8e8-f6ba-4a16-9e7a-517cccbbe787" />
<img width="1872" height="919" alt="Screenshot from 2025-10-15 17-15-18" src="https://github.com/user-attachments/assets/a925710d-7241-462e-ac3b-dbe6b6754928" />

---

## 🏗️ **ARQUITETURA TÉCNICA**

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

---

## 🔄 **WEBHOOKS STRIPE**

### **Eventos Processados:**
- ✅ **`payment_intent.succeeded`** - Cria pedido automaticamente
- ⏳ **`payment_intent.payment_failed`** - COnfigura pedido como falha ao pagar

### **Fluxo de Webhook:**
1. **Pagamento confirmado** no Stripe
2. **Webhook recebido** em `/api/webhooks/stripe`
3. **Pedido criado** automaticamente no banco
4. **Status sincronizado** em tempo real

---

## 🎯 **FUNCIONALIDADES COMPLETAS**

### **✅ Para Vendedores:**
- Dashboard administrativo completo
- CRUD de produtos com upload de imagens
- Gestão de pedidos e status
- Autenticação segura

### **✅ Para Compradores:**
- Catálogo público de produtos
- Processamento de pagamentos reais
- Formulário de compra validado
- Confirmação automática

### **✅ Técnicas:**
- Row Level Security (RLS)
- Webhooks Stripe funcionais
- Validação Zod
- Interface responsiva

---

**🚀 Sistema de e-commerce completo e funcional, pronto para produção!**
