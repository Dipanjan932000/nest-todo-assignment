# NestJS Todo Assignment

**Simple Todo API** built with NestJS, Prisma (PostgreSQL), JWT authentication and unit tests.

**Tech stack**

* Node.js + TypeScript
* NestJS
* Prisma ORM (Postgres)
* JWT for auth (`@nestjs/jwt`)
* class-validator / class-transformer
* Swagger for API docs
* Jest + ts-jest for unit tests

---

## Quick status

* ✅ Auth: register, login, profile (JWT)
* ✅ Todos: create, list (filter by `completed`), get by id, update, delete (per-user)
* ✅ Swagger UI: `/api`
* ✅ Prisma migrations applied
* ✅ Unit tests (todos service): passing

---

## Table of contents

* [Prerequisites](#prerequisites)
* [Setup (local)](#setup-local)
* [Environment variables](#environment-variables)
* [Database (Prisma)](#database-prisma)
* [Scripts](#scripts)
* [API Endpoints](#api-endpoints)
* [Example requests (curl)](#example-requests-curl)
* [Testing](#testing)
* [What to include in repo/.gitignore](#what-to-include-in-repo--gitignore)

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

> All protected endpoints require: `Authorization: Bearer <access_token>`

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
  -d '{"name":"Dipanjan","email":"dip@example.com","password":"secret123"}'
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
  -d '{"title":"Buy milk"}'
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
