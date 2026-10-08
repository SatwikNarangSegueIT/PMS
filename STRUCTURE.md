# Folder Structure — PMS Frontend

Frontend only. The backend (NestJS, Prisma, Postgres/Neon, Redis, BullMQ) lives in a separate repo.

**Stack:** Next.js (App Router) · TypeScript · TanStack Query · Zustand · Orval · Tailwind CSS · shadcn/ui

Modules, routes, roles and permissions are taken from the reference app (`web-sq9o.vercel.app`).

---

## Core rules

1. **`app/` is routing only.** Pages stay thin: they read params and render a feature component.
2. **`features/` holds business logic**, grouped by module → sub-feature.
3. **`api/generated/` is Orval output. Never edit it by hand.** Regenerate it from `openapi/`.
4. **Server state = TanStack Query** (Orval hooks). **Client/UI state = Zustand** (cart, UI, session). Don't copy server data into Zustand.
5. **Import direction:** `app → features → components/lib/api`. A feature never imports from another feature. Shared code moves up to `components/` or `lib/`.

---

## Tree

```
pms/
├── .github/
│   ├── workflows/            # CI: lint, typecheck, test, build, orval drift check
│   └── ISSUE_TEMPLATE/
├── .husky/                   # git hooks (lint-staged, commitlint)
├── .vscode/                  # shared editor settings / recommended extensions
├── docs/
│   ├── architecture/         # diagrams, data flow, auth flow
│   ├── adr/                  # Architecture Decision Records
│   └── conventions/          # naming, git, code style, PR rules
├── openapi/                  # OpenAPI (Swagger) spec from the backend — Orval input
├── public/
│   ├── images/
│   └── icons/
├── scripts/                  # dev scripts (e.g. fetch openapi spec, codegen)
├── tests/
│   ├── e2e/                  # Playwright, one folder per module
│   │   ├── dispense/  pos/  office/  hq/  admin/
│   ├── fixtures/             # test data
│   └── mocks/                # MSW handlers (Orval can generate these)
│
└── src/
    ├── app/                              # ROUTING ONLY (Next.js App Router)
    │   ├── (auth)/
    │   │   └── login/                    # /login
    │   ├── (platform)/
    │   │   └── vendor/                   # /vendor — platform admin (tenants), no tenant context
    │   ├── (modules)/                    # authenticated app shell: sidebar + module & store switcher
    │   │   ├── dispense/                 # DISPENSE
    │   │   │   ├── new/                  #   New script
    │   │   │   ├── scripts/[scriptId]/   #   Script queue / script detail
    │   │   │   ├── patients/[patientId]/ #   Patients
    │   │   │   └── reports/
    │   │   ├── pos/                      # POS (page = Register)
    │   │   │   ├── sales/[saleId]/       #   Sales & returns
    │   │   │   ├── shift/                #   Cash & balancing
    │   │   │   ├── laybys/[laybyId]/
    │   │   │   └── hire/[hireId]/        #   Equipment hire
    │   │   ├── office/                   # OFFICE (back-office per store)
    │   │   │   ├── products/[productId]/
    │   │   │   ├── inventory/
    │   │   │   ├── orders/[orderId]/     #   Purchasing
    │   │   │   ├── suppliers/[supplierId]/
    │   │   │   ├── pricing/              #   Pricing review
    │   │   │   ├── accounts/[accountId]/ #   Customer accounts
    │   │   │   ├── stocktake/[stocktakeId]/
    │   │   │   └── reports/
    │   │   ├── hq/                       # HQ (group / head office)
    │   │   │   ├── stores/[storeId]/     #   Stores & groups
    │   │   │   ├── dispense-pricing/
    │   │   │   ├── drug-ranking/
    │   │   │   ├── retail-pricing/
    │   │   │   ├── promotions/[promotionId]/
    │   │   │   ├── price-files/          #   Supplier price files
    │   │   │   ├── sync/                 #   Publishing & sync
    │   │   │   ├── reports/
    │   │   │   └── audit/                #   Change log
    │   │   └── admin/                    # ADMIN
    │   │       ├── users/[userId]/       #   Users & roles
    │   │       ├── licence/              #   Licence & modules
    │   │       ├── integrations/
    │   │       ├── audit/                #   Audit log
    │   │       └── security/             #   My sessions
    │   └── api/
    │       └── auth/refresh/             # route handler: refresh httpOnly session cookie
    │
    ├── api/                              # API LAYER (Orval)
    │   ├── generated/                    # ⚠ AUTO-GENERATED — hooks + models per backend tag
    │   └── mutator/                      # custom fetch: base URL, cookies, 401 → refresh → retry, error mapping
    │
    ├── components/                       # SHARED, module-agnostic UI
    │   ├── ui/                           # shadcn/ui primitives (button, dialog, input…)
    │   ├── layout/                       # app shell, sidebar, topbar, module switcher, store switcher
    │   ├── data-table/                   # TanStack Table wrapper: paging, sorting, filters
    │   ├── forms/                        # form fields bound to react-hook-form + zod
    │   ├── feedback/                     # loading, empty, error, confirm dialogs, toasts
    │   ├── charts/                       # report/dashboard charts
    │   └── print/                        # labels, receipts, reports print layouts
    │
    ├── features/                         # BUSINESS LOGIC, by module → sub-feature
    │   ├── auth/                         # login, session, current user/tenant/store
    │   ├── dispense/
    │   │   ├── dashboard/
    │   │   ├── scripts/                  # script entry, queue, pharmacist check
    │   │   ├── patients/
    │   │   ├── prescribers/
    │   │   ├── pbs/                      # PBS copay / safety-net calculation helpers
    │   │   └── reports/
    │   ├── pos/
    │   │   ├── register/                 # cart lives in register/stores (Zustand)
    │   │   ├── sales/  shift/  laybys/  hire/
    │   ├── office/
    │   │   ├── dashboard/  products/  inventory/  purchasing/  suppliers/
    │   │   ├── pricing/  accounts/  stocktake/  reports/
    │   ├── hq/
    │   │   ├── dashboard/  stores/  dispense-pricing/  drug-ranking/  retail-pricing/
    │   │   ├── promotions/  price-files/  sync/  reports/  audit/
    │   ├── admin/
    │   │   ├── users/  licence/  integrations/  audit/  security/
    │   └── vendor/
    │       └── tenants/
    │
    ├── config/                           # module registry + nav (MODULE_UI, ADMIN_NAV), env schema, site config
    ├── lib/
    │   ├── rbac/                         # roles, permissions, can()/hasPerm(), <Can> guard, route guards
    │   ├── formatters/                   # currency (AUD, cents), dates, numbers
    │   ├── query/                        # QueryClient factory, query-key helpers, defaults
    │   └── utils/                        # cn(), small pure helpers
    ├── providers/                        # QueryProvider, ThemeProvider, AuthProvider (composed in root layout)
    ├── stores/                           # GLOBAL Zustand stores only (ui, active store/module)
    ├── hooks/                            # global hooks (useDebounce, useHotkeys, usePermission…)
    ├── types/                            # global TS types (non-API)
    ├── constants/                        # app-wide constants
    └── styles/                           # globals.css, Tailwind theme tokens, module colours
```

---

## Inside a sub-feature

Every sub-feature (e.g. `features/dispense/scripts/`) uses the same layout. Create folders only when needed.

```
scripts/
├── components/     # UI used only by this feature
├── hooks/          # wrappers around Orval hooks, feature logic
├── schemas/        # zod schemas for forms / validation
├── stores/         # Zustand store, if feature needs client state
├── utils/          # pure helpers
├── types/          # feature-only types
├── constants/
├── __tests__/      # unit/component tests (Vitest + Testing Library)
└── index.ts        # public API — other layers import only from here
```

---

## Modules, roles, permissions (from the reference app)

| Module   | Route       | Permission prefix |
|----------|-------------|-------------------|
| Dispense | `/dispense` | `dispense.*`      |
| POS      | `/pos`      | `pos.*`           |
| Office   | `/office`   | `office.*`        |
| HQ       | `/hq`       | `hq.*`            |
| Admin    | `/admin`    | `platform.*`      |
| Vendor   | `/vendor`   | platform admin only |

**Roles:** Pharmacist, Dispensary Technician, Pharmacy Assistant, Store Manager, Group Administrator, Pricing Manager, Category Manager, Reporting User, System Administrator.

Nav items are shown or hidden by permission (`lib/rbac`). Modules are gated by the tenant licence (`admin/licence`).

---

## Root config files (added when code starts)

`package.json`, `tsconfig.json`, `next.config.ts`, `orval.config.ts`, `components.json` (shadcn), `eslint.config.mjs`, `.prettierrc`, `vitest.config.ts`, `playwright.config.ts`, `.env.example`, and `src/proxy.ts` (route protection; it is called `middleware.ts` on Next.js ≤ 15).

---

## Open decisions (frontend + backend teams)

- **Swagger:** the backend must expose an OpenAPI spec (`@nestjs/swagger`) for Orval.
- **Orval output:** commit `src/api/generated/` to git, or generate it in CI?
- **Auth:** confirm httpOnly-cookie sessions plus the `/api/auth/refresh` flow (the reference app uses this).
- **Next.js version:** pin it (it decides whether `proxy.ts` or `middleware.ts` is used).
