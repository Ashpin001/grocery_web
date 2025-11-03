## Purpose

This file gives concise, actionable guidance for an AI coding agent to be productive in this repo.
Focus on the small, opinionated fullstack grocery app: `backend/` (Express + Mongoose), `frontend/` (CRA) and `frontend-1/` (Vite + TypeScript).

## Big-picture architecture

- backend/: Express API (entry: `backend/index.js`) that registers routes:
  - `/api/products` -> implemented in `backend/routes/productRoutes.js`
  - `/api/users` -> implemented in `backend/routes/userRoutes.js` (login/register)
  - `/api/orders` -> implemented in `backend/routes/orderRoutes.js` (JWT-protected)
- Models live in `backend/models/*.js` (Product, User, Order). DB access is via Mongoose.
- frontend/ is a Create-React-App style client (older). frontend-1/ is a newer Vite + TypeScript variant. The Vite app exposes API helpers in `frontend-1/src/api/api.ts`.

Why it is structured this way
- Very small codebase: routes contain inline handlers (controllerless). Prefer minimal, localized changes: editing the route file is the typical way to add endpoints.

## Developer workflows & exact commands

- Backend (dev):
  - Ensure `.env` exists: copy `backend/.env.example` -> `backend/.env` and set `MONGO_URI` and `JWT_SECRET`.
  - Install and run: `cd backend; npm install; npm run seed; npm start` (or `npm run dev` for nodemon).
  - Seed script: `backend/data/seed.js` — creates sample products and an admin user.

- Frontend (CRA):
  - `cd frontend; npm install; npm start` (runs react-scripts start)

- Frontend (Vite TS):
  - `cd frontend-1; npm install; npm run dev` (vite)

- VS Code task convenience (already included):
  - Workspace tasks: "Backend: Start" and "Frontend: Start" (see project tasks in `.vscode` or the workspace task list).

## API contract and common patterns (useful examples)

- Public product list
  - GET /api/products -> returns array of product documents (see `backend/routes/productRoutes.js`).
  - GET /api/products/:id -> single product by id.

- Auth
  - POST /api/users/register and POST /api/users/login (both in `backend/routes/userRoutes.js`). Responses include a JWT token. Token generation: `generateToken()` in `userRoutes.js` (JWT secret: `process.env.JWT_SECRET`).
  - Protected endpoints expect Authorization header: `Authorization: Bearer <token>`; the middleware is inline in `backend/routes/orderRoutes.js`.

- Orders
  - POST /api/orders (auth required) with body like: { orderItems: [{ product: "<id>", qty: 2 }], totalPrice: 123.45 }
  - GET /api/orders/my (auth required) returns orders for the authenticated user; server uses Mongoose `populate` for `orderItems.product`.

## Project-specific gotchas & conventions

- Two frontends coexist. The active modern one appears to be `frontend-1/` (Vite + TS). `frontend/` is an older CRA app. Pay attention to which UI you modify.
- API path mismatch to watch for: `frontend-1/src/api/api.ts` uses `API_URL = 'http://localhost:5000/api'` and helper endpoints like `/auth/login`, `/auth/register` — but the backend exposes `/api/users/login` and `/api/users/register`. Before changing frontend code, align endpoints or add a small route shim.
- Routes are controllerless (handlers inside `routes/*.js`). When adding features, add route handlers and, if needed, move logic to a new `controllers/` file for clarity.
- Minimal validation and error handling in backend; check `backend/index.js` and route files for existing patterns before adding new error behavior.

## Files to open first (for most tasks)

- `backend/index.js` — app entry, DB connect, registered routes
- `backend/routes/*.js` — add/modify endpoints here
- `backend/models/*.js` — DB schemas and ref shapes (Product, User, Order)
- `backend/data/seed.js` — sample data and admin user creation
- `frontend-1/src/api/api.ts` — API wrapper used by the Vite app (fix endpoint mismatches here)
- `frontend-1/src/pages` and `frontend-1/src/components` — UI entry points

## Small examples you can follow

- Add a new GET route that returns a summary count of products:
  - Create `backend/routes/summaryRoutes.js`, add `app.use('/api/summary', summaryRoutes)` in `backend/index.js`, and return { totalProducts: await Product.countDocuments() }.

- Fixing endpoint mismatch in `frontend-1/src/api/api.ts`:
  - Replace `/auth/login` with `/users/login` (or update backend to accept `/api/auth/*`).

## Tests, linting, CI

- There are no automated tests or CI config in the repo. Keep changes small and run the dev servers to verify behavior.

## When in doubt

- Prefer small, localized changes: edit the relevant route or model first. Run `backend` and `frontend-1` locally and test the network tab and API responses.
- If adding auth-protected features, reuse the inline `auth` middleware pattern from `backend/routes/orderRoutes.js`.

If anything in these notes is unclear or you want more detail for a specific task (e.g., add a new API, wire the frontend to a new endpoint, or add tests), tell me which area and I'll expand the instructions with exact code snippets and tests.
