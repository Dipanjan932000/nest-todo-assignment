# NestJS Todo Assignment

<p align="left">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white" />
</p>

**Simple Todo API** built with NestJS, Prisma (PostgreSQL), JWT authentication and unit tests.

## Tech stack

* Node.js + TypeScript
* NestJS
* Prisma ORM (Postgres)
* JWT for auth (`@nestjs/jwt`)
* class-validator / class-transformer
* Swagger for API docs
* Jest + ts-jest for unit tests

---

## Quick status

* Auth: register, login, profile (JWT)
* Todos: create, list (filter by `completed`), get by id, update, delete (per-user)
* Swagger UI: `/api`
* Prisma migrations applied
* Unit tests (todos service): passing

---

## Prerequisites

* Node.js 16+ (LTS recommended)
* npm
* PostgreSQL running locally (or remotely)
* Optional: pgAdmin / Prisma Studio / Postman

---

## Setup (local)

1. Clone the repo (or copy files):

   ```bash
   git clone <your-repo-url>
   cd nest-todo-assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` in the project root (see below). Example:

   ```env
   DATABASE_URL="postgresql://<DB_USER>:<DB_PASS>@localhost:5432/nest_assignment?schema=public"
   JWT_SECRET="your_jwt_secret_here"
   JWT_EXPIRES_IN="3600s"
   ```

4. Apply Prisma migrations (creates tables and generates client):

   ```bash
   npx prisma migrate dev --name init
   # (If migrations already exist and are applied, run: npx prisma generate)
   ```

5. Start the server (development):

   ```bash
   npm run start:dev
   ```

6. Open Swagger UI:

   ```
   http://localhost:3000/api
   ```

---

## Environment variables

* `DATABASE_URL` — Postgres connection URL (required)
* `JWT_SECRET` — Secret to sign JWT tokens (required)
* `JWT_EXPIRES_IN` — Token expiry (e.g. `3600s`(optional)

**Do NOT commit ****`.env`**** to the repo.** Add `.env` to `.gitignore`. Provide `.env.example` with placeholders for reviewers.

---

## Database (Prisma)

* Prisma schema: `prisma/schema.prisma`
* Generate/migrate with:

  ```bash
  npx prisma migrate dev --name init
  npx prisma generate
  ```
* Optional: open Prisma Studio:

  ```bash
  npx prisma studio
  ```

---

## Scripts (package.json)

* `npm run start:dev` — start dev server with ts-node and nodemon
* `npm run start` — run once with ts-node
* `npm run build` — compile TypeScript (`tsc`)
* `npm run test` — run Jest tests

---

## API Endpoints

All protected endpoints require: `Authorization: Bearer <access_token>`

### Auth

* `POST /auth/register` — Register user
  Body:

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secret123"
  }
  ```

  Response: user object (no password).

* `POST /auth/login` — Login
  Body:

  ```json
  {
    "email": "john@example.com",
    "password": "secret123"
  }
  ```

  Response:

  ```json
  {
    "access_token": "<JWT_TOKEN>",
    "user": { "id": 1, "name": "John Doe", "email": "john@example.com" }
  }
  ```

* `GET /auth/profile` — Get current user (protected)

### Todos

* `POST /todos` — Create todo (protected)
  Body:

  ```json
  { "title": "Buy groceries" }
  ```

* `GET /todos` — List todos for current user (protected)
  Optional query: `?completed=true` or `?completed=false`

* `GET /todos/:id` — Get a single todo by id (protected)

* `PUT /todos/:id` — Update a todo (protected)
  Body (any of):

  ```json
  { "title": "New title" }
  { "isCompleted": true }
  ```

* `DELETE /todos/:id` — Delete a todo (protected)

---

## Example requests (curl)

1. Register

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Dipanjan", "email": "dip@example.com", "password": "secret123"}'
```

2. Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"dip@example.com","password":"secret123"}'
```

3. Create a todo (replace TOKEN with the JWT)

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title": "Buy milk"}'
```

4. Get todos

```bash
curl -X GET "http://localhost:3000/todos" \
  -H "Authorization: Bearer TOKEN"
```

5. Update todo

```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"isCompleted": true}'
```

---

## Testing (Jest)

Run all tests:

```bash
npm run test
```

You should see tests pass (example: `TodosService - findById()` tests).

---

## What to include in the git repo / recommended `.gitignore`

**Include**

* `src/` — source files
* `prisma/` — prisma schema & migrations
* `package.json`, `package-lock.json`
* `tsconfig.json`, `jest.config.js`
* `README.md`

**Do NOT include**

* `.env` (use `.env.example`)
* `node_modules/`
* `dist/`

Example `.gitignore`:

```
node_modules/
.env
dist/
.vscode/
.DS_Store
```

---

## Deployment

When you’re ready to publish this NestJS Todo application to production, a few additional steps will help ensure it runs efficiently and securely. Check out **[NestJS Deployment Guide](https://docs.nestjs.com/deployment)** for detailed guidance on preparing production builds, managing environment variables, optimizing modules, and tuning performance — all of which are useful when deploying this project.

If you prefer a cloud-hosted solution with minimal setup, you can use **Mau**, the official NestJS deployment platform built on AWS. Mau automates most of the infrastructure setup and lets you deploy your application with just a couple of commands.

To deploy using Mau:

```bash
npm install -g @nestjs/mau
mau deploy
```
With Mau handling provisioning and deployment, you can focus on developing features rather than dealing with servers, DevOps, or cloud configuration.

---

## Resources

Here are useful official documentation links relevant to this project:

**NestJS**: [https://docs.nestjs.com](https://docs.nestjs.com)

**Prisma ORM**: [https://www.prisma.io/docs](https://www.prisma.io/docs)

**PostgreSQL**: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)

**Jest Testing**: [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)

**JSON Web Tokens**: [https://jwt.io/introduction](https://jwt.io/introduction)

**Class Validator**: [https://github.com/typestack/class-validator](https://github.com/typestack/class-validator)

**Swagger OpenAPI**: [https://swagger.io/specification/](https://swagger.io/specification/)

---

## Support

Nest is an open source project licensed under MIT, and community support has enabled its continuous development. 
<br>If you would like to join, then please **[read more](https://docs.nestjs.com/support)**.</br>

## License

Nest is an open source project with an **[MIT license](https://github.com/nestjs/nest/blob/master/LICENSE)**.
<br>You are free to use, modify, and distribute it as allowed under the license terms.</br>
