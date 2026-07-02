# Roadmap

Nano-phases: each phase is one PR-sized chunk of work with a clear done-condition.

---

## Phase 1 — Repo Init ✓
- Monorepo structure (`/client`, `/server`)
- TypeScript config, ESLint, Prettier
- CI skeleton (lint + type-check on push)

**Done when:** `npm run lint && npm run typecheck` pass on an empty repo.

---

## Phase 2 — Schema & Seed Data ✓
- Drizzle schema: `agents`, `ailments`, `therapies`, `appointments`
- Seed script with sample agents, ailments, therapies, and appointments
- `npm run seed` loads fixtures with one command

**Done when:** `npm run seed` runs without error and all four tables have data.

---

## Phase 3 — Home Page & Layout Shell ✓
- `Header`, `Footer`, `Layout` components, each in their own file
- `layout.css` imported by `Layout`
- Mobile-first responsive layout
- Home page renders seeded agents via `GET /api/agents`

**Done when:** Dev server shows the home page with agent cards; layout is responsive at 320 px and above.

---

## Phase 4 — Agent CRUD API
- `GET /agents` — list all agents
- `GET /agents/:id` — single agent
- `POST /agents` — create
- `PATCH /agents/:id` — update
- `DELETE /agents/:id` — delete

**Done when:** All five routes return correct responses, tested with Vitest or curl.

---

## Phase 5 — Auth
- Hono middleware: JWT or session cookie
- `POST /auth/login` endpoint
- Protected-route guard on the server (all write routes require auth)
- Minimal login page on the client

**Done when:** Unauthenticated `POST /agents` returns 401; login → token → `POST /agents` succeeds.

---

## Phase 6 — Agent CRUD UI
- Agent list page (dashboard)
- Agent detail page
- Create / edit form
- Delete confirmation

**Done when:** A user can create, view, edit, and delete an agent entirely through the UI.

---

## Phase 7 — Ailments & Therapies API
- `GET /ailments`, `GET /ailments/:id`
- `GET /therapies`, `GET /therapies/:id`

**Done when:** Both resources return seeded data; component tests cover happy paths.

---

## Phase 8 — Ailments & Therapies UI
- Ailment catalog page
- Therapy catalog page

**Done when:** Both catalog pages render seeded data with correct routing.

---

## Phase 9 — Appointments API
- `GET /appointments` — list (optionally filter by agent)
- `POST /appointments` — book a therapy session for an agent
- `DELETE /appointments/:id` — cancel

**Done when:** Booking and cancellation work end-to-end via the API.

---

## Phase 10 — Booking UI
- Booking flow: agent picks a therapy, selects a slot, confirms
- Appointment list visible on agent detail page

**Done when:** An agent can be booked into a therapy session entirely through the UI.

---

## Phase 11 — E2E Tests
- Pick Playwright or Cypress
- Cover: login → browse agents → book appointment → cancel

**Done when:** `npm run test:e2e` passes the happy-path flow.

---

## Phase 12 — Polish & Deploy
- Design pass: typography, color, spacing, empty states, error states
- Responsive audit: 320 px mobile → desktop
- Accessibility audit: keyboard nav, ARIA labels, Lighthouse
- Pick deployment target (Railway or Fly.io), wire environment config, ship

**Done when:** Site is live, passes Lighthouse accessibility check, looks good in a modern browser.
