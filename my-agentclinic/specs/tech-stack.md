# Tech Stack

## Summary

Full-stack TypeScript: Hono REST server + React (Vite) SPA, with a clear client/server boundary and a lightweight footprint.

## Frontend

| Concern | Choice |
|---------|--------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Brand colors | Orange (`#F97316`) and black (`#111111`) — defined as `brand.orange` / `brand.black` Tailwind tokens and `--brand-orange` / `--brand-black` CSS custom properties |
| Responsive | Mobile-first; Tailwind breakpoint prefixes (`sm`, `md`, `lg`) govern layout shifts |
| Routing | React Router v6 |
| State | React Query (server state) + useState/Context (local) |

## Backend

| Concern | Choice |
|---------|--------|
| Server | Hono (TypeScript, Node.js) |
| ORM | Drizzle ORM |
| Database | SQLite |
| Auth | Hono middleware — JWT / session cookie (**not yet implemented — Phase 5**) |

## Testing

| Concern | Choice |
|---------|--------|
| Unit / component | Vitest |
| E2E | **Undecided — Playwright or Cypress; gap to resolve before Phase 7** |
| Script | `npm test` at the root runs both workspaces |

## Deployment

| Concern | Choice |
|---------|--------|
| Hosting | **Undecided — Railway or Fly.io; to be decided in Phase 7** |
| DB | SQLite file (bundled with the server) |

## Known Gaps

| Gap | Status | Target phase |
|-----|--------|--------------|
| Auth (JWT / session) | Spec'd, not built | Phase 5 |
| E2E test layer | No Playwright / Cypress yet | Phase 6 |
| Deployment target | Railway vs. Fly.io undecided | Phase 7 |

## Rationale

- **Hono** is minimal, type-safe end-to-end, and fast — no magic, easy to test.
- **Drizzle + SQLite** keeps schema and queries in TypeScript with zero runtime overhead and no external DB process — ideal for demos and local dev.
- **Vite + React** gives the dashboard a snappy feel; shadcn/ui gives attractive, accessible components out of the box.
- **Mobile-first responsive design** ensures the site works on conference-booth tablets, not just desktop browsers.
- **Vitest** shares the Vite config and TypeScript setup, so unit/component tests run in the same environment as the app with no extra tooling.
