
# ✅ Lista de Tarefas com Autenticação

Projeto fullstack que permite cadastro de usuários, login com JWT, e gerenciamento de tarefas autenticadas.

---

## 🚀 Tecnologias Utilizadas

### 🛠 Backend
- Node.js
- Express
- PostgreSQL (via Neon)
- Prisma ORM
- JWT (autenticação)
- Dotenv

### 🎨 Frontend (em desenvolvimento)
- React
- Next.js
- Shadcn UI

---

## 🧩 Funcionalidades

- Cadastro de usuário
- Login com geração de token JWT
- Verificação de token nas rotas protegidas
- Criação, listagem e exclusão de tarefas por usuário logado

---

## 📁 Estrutura de Pastas (Backend)

```
📦 backend
├── src
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   ├── prisma
│   └── index.ts
├── .env
├── package.json
```

---

## 🔐 Autenticação

- Após o login, o backend retorna um token JWT.
- Esse token deve ser enviado no header das rotas protegidas:  
  `Authorization: Bearer seu_token_aqui`
- O middleware `verifyToken` garante que só usuários autenticados acessem as tarefas.

---

## ⚙️ Como rodar o projeto (backend)

```bash
# Clone o repositório
git clone https://github.com/alexandra002dev/backend-auth-tasks.git
cd backend-auth-tasks

# Instale as dependências
npm install

# Configure o banco de dados no arquivo .env
DATABASE_URL="sua_url_do_postgres_no_neon"
JWT_SECRET="sua_chave_secreta"

# Rode as migrações do Prisma
npx prisma migrate dev

# Rode o projeto
npm run dev
```

---

## 🔗 Conecte com o Frontend

- O frontend consumirá as rotas da API para:
  - Login
  - Cadastro
  - Criar, listar e excluir tarefas

---

## 👩‍💻 Desenvolvedora

**Alexandra Marques**  
📍 Cabo Frio / RJ  
🔗 [GitHub](https://github.com/alexandra002dev)

---

## 📌 Observações

- O projeto ainda está em evolução.
- O frontend está sendo construído com Next.js + Shadcn UI.
