# Roadmap

Nano-phases: each phase is one PR-sized chunk of work with a clear done-condition.

## Phase 1 — Repo Init
- Monorepo structure (`/client`, `/server`)
- TypeScript config, ESLint, Prettier
- CI skeleton (lint + type-check on push)

**Done when:** `pnpm lint && pnpm typecheck` pass on an empty repo.

---

## Phase 2 — DB Schema & Migrations
- Define Drizzle schema: `agents`, `ailments`, `therapies`, `appointments`
- Write and run initial migration against a local PostgreSQL instance

**Done when:** Migration runs clean; tables visible in DB.

---

## Phase 3 — Seed Data ✓
- Dev fixtures: sample agents with names, models, and ailments
- Seed script runnable with one command
- Minimal home page displaying seeded agents via `GET /api/agents`
- Layout shell: `Header`, `Footer`, `Layout` components each in their own file; `layout.css` imported by `Layout`

**Done when:** `pnpm db:seed` populates the DB with believable (and funny) test data.

---

## Phase 4 — Auth
- Hono auth middleware: JWT or session cookie
- Login endpoint; protected-route guard on the server
- Minimal login page on the client

**Done when:** Unauthenticated requests to protected routes return 401; login flow issues a valid token.

---

## Phase 5 — Agents CRUD
- Server: Hono routes for `GET /agents`, `GET /agents/:id`, `POST /agents`, `PATCH /agents/:id`, `DELETE /agents/:id`
- Client: agent list page + agent detail page on the dashboard

**Done when:** All five routes work; UI can list and view agents.

---

## Phase 6 — Ailments, Therapies & Bookings
- Server routes for `ailments`, `therapies`, `appointments`
- Client: ailment catalog, therapy catalog, booking flow (agent picks a therapy, selects a slot)

**Done when:** An agent can be booked into a therapy session end-to-end via the UI.

---

## Phase 7 — Polish & Deploy
- Design pass: typography, color, spacing, empty states, error states
- Accessibility audit (keyboard nav, ARIA labels)
- Production build, environment config, deploy to Railway / Fly.io

**Done when:** Site is live, passes Lighthouse accessibility check, looks good in a modern browser.
