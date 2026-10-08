# PMS — Pharmacy Management System (Frontend)

Frontend for an enterprise pharmacy management system: Dispense, POS, Office, HQ, Admin.

**Stack:** Next.js 16 (App Router) · TypeScript · TanStack Query · Zustand · Orval · Tailwind CSS 4 · shadcn/ui

The backend (NestJS) lives in a separate repo. Its API reaches this repo through an OpenAPI spec, which Orval turns into typed TanStack Query hooks.

See **[STRUCTURE.md](./STRUCTURE.md)** for the folder layout and rules.

## Getting started

Requires Node.js 22+ and pnpm (`corepack enable`).

```bash
pnpm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
pnpm dev                     # http://localhost:3000
```

## Scripts

| Command                             | What it does                                    |
| ----------------------------------- | ----------------------------------------------- |
| `pnpm dev`                          | Dev server                                      |
| `pnpm build` / `pnpm start`         | Production build / serve                        |
| `pnpm lint`                         | ESLint                                          |
| `pnpm typecheck`                    | Generate route types + `tsc`                    |
| `pnpm format` / `pnpm format:check` | Prettier                                        |
| `pnpm test` / `pnpm test:watch`     | Vitest                                          |
| `pnpm api:generate`                 | Orval: generate API hooks from the backend spec |

## API code generation

1. Backend exposes Swagger JSON (`@nestjs/swagger`).
2. Either set `OPENAPI_URL` (e.g. `http://localhost:4000/api-json`) or save the spec as `openapi/openapi.json`.
3. Run `pnpm api:generate`. Output goes to `src/api/generated/` — never edit it by hand.

Every request goes through `src/api/mutator/custom-fetch.ts` (base URL, error → `ApiError`).

## Status

Foundation + app shell. All routes exist as placeholders. Not built yet: auth, API integration, feature screens.
