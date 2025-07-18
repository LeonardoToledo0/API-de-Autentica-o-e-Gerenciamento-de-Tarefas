# 🚀 API de Autenticação e Gerenciamento de Tarefas

API construída com NestJS para autenticação de usuários e gerenciamento de tarefas (to-dos).
Construído em **NestJS + TypeORM** e pronto para produção.

## 📄 Licença

![License: MIT](https://img.shields.io/badge/License-MIT-green)

> ⚠️ Recomendamos usar Node.js v18 ou superior para compatibilidade com as dependências.

---

## 🚀 Tecnologias Utilizadas

<p align="center">
  <img height="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
  <img height="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" />
  <img height="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg" />
  <img height="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original-wordmark.svg" />
  <img height="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" />
  <img height="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/yarn/yarn-original-wordmark.svg" />
</p>

---

## ✨ Recursos

| Módulo      | Descrição                                                 |
| :---------- | :-------------------------------------------------------- |
| **Auth**    | Registro & login via **JWT**, refresh‑token opcional      |
| **Users**   | CRUD de usuários                                          |
| **To-do**   | Tarefas dos Usuarios                                      |
| **Swagger** | Documentação interativa em **/api** com botão _Authorize_ |

---

## 🚀 Stack

- **NestJS 10** • **TypeScript 5**
- **TypeORM** + **MySQL** (pode trocar facilmente para PostgreSQL/MariaDB)
- **JWT** (access + refresh)
- **Swagger** para docs
- **Jest** + **SuperTest** para testes
- **Yarn** scripts & hooks **Husky + Lint‑staged**

---

## 📦 Instalação

```bash
git https://github.com/LeonardoToledo0/API-de-Autentica-o-e-Gerenciamento-de-Tarefas.git
cd desafio-replic
yarn
cp .env.example .env
```

Configure o `.env`:

```env
# App
PORT=3000
JWT_SECRET=super_secret

# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=todo_db


```

---

## ▶️ Execução

| Comando              | Ação                                                              |
| -------------------- | ----------------------------------------------------------------- |
| `yarn start:dev`     | Inicia em modo desenvolvimento com **TS‑Node** e **Hot‑Reload**   |
| `yarn start:prod`    | Compila e executa o projeto em produção a partir da pasta `dist/` |
| `yarn migration:run` | Aplica as **migrações** definidas no TypeORM                      |
| `yarn test`          | Executa os testes unitários com **Jest**                          |
| `yarn test:cov`      | Gera o **relatório de cobertura de testes**                       |

Acesse: [http://localhost:3000/api](http://localhost:3000/api) para a documentação Swagger.

---

## ✅ Funcionalidades

O backend Conéctar oferece uma API robusta com autenticação via JWT e gestão completa de usuários. As principais funcionalidades são:

- 🔐 **Autenticação segura com JWT**
- 👤 **Cadastro e login de usuários**
- 🧾 **Listagem de usuários** (com filtros por nome, role, data e status)
- 🛂 **Visualização e edição do próprio perfil**
- 📌 **Atualização e deleção de usuários (admin)**
- 🔎 **Busca por ID com validação de permissão**
- 🧩 **Swagger completo com testes via token Bearer**
- ✅ **Guards de autenticação e autorização**
- 🧪 **Testes unitários com Jest**

---

## 🔐 Rotas / Endpoints

> Todas as rotas (exceto `register` e `login`) exigem **Bearer Token** no header de autorização.

---

### 📘 Auth

| Método | Rota          | Descrição              |
| ------ | ------------- | ---------------------- |
| POST   | `/auth/user`  | Cria conta             |
| POST   | `/auth/login` | Retorna `access_token` |

---

### 👥 Users

| Método | Rota         | Quem pode | Descrição               |
| ------ | ------------ | --------- | ----------------------- |
| GET    | `/users`     | `usuario` | Lista todos os usuários |
| GET    | `/users/:id` | `usuario` | Detalha usuário por ID  |
| PUT.   | `/users/:id` | `usuario` | Atualiza usuário por ID |
| DELETE | `/users/:id` | `usuario` | Remove usuário          |

---

---

### 📘 Todos

| Método | Rota          | Quem pode | Descrição               |
| ------ | ------------- | --------- | ----------------------- |
| POST   | `/To-dos`     | `usuario` | Cria uma Tarefa         |
| GET    | `/To-dos`     | `usuario` | Lista todas os Tarefas  |
| GET    | `/To-dos/:id` | `usuario` | Detalha Tarefa por ID   |
| PUT.   | `/To-dos/:id` | `usuario` | Atualiza Tarefas por ID |
| DELETE | `/To-dos/:id` | `usuario` | Deleta a Tarefa         |

---

## 🧪 Testes

```bash
yarn test
```

## 📃 Documentação Swagger

<!-- ![Swagger UI](./assets/swagger.png) -->

Disponível em:  
🔗 [`http://localhost:3000/api`](http://localhost:3000/api)

Inclui:

- Descrição de todos os endpoints
- Teste de login direto pelo Swagger
- Proteção com Bearer Token

---

## ✍️ Autor

Desenvolvido por **Leonardo Toledo**  
📧 leotoledo010@gmail.com  
🔗 [github.com/leonardotoledo0](https://github.com/LeonardoToledo0)

---

## 📝 Observações

- JWT protegido com `@UseGuards(JwtAuthGuard)`

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**.

Veja o arquivo [LICENSE](./LICENSE) para detalhes completos.

---

Você pode usar, modificar e distribuir o código conforme os termos da licença MIT.
