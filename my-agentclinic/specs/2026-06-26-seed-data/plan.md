# Plan — Phase 3: Seed Data

## Group 1 — Seed Script Scaffold

1. Create `server/src/db/seed.ts`
2. Import the Drizzle client and the full schema (agents, ailments, therapies)
3. Open a SQLite connection using the same config as the main app
4. Add a top-level `async main()` with `try/finally` to close the connection cleanly

## Group 2 — Fixture Data

5. Define a hard-coded `agents` array (5–8 entries) — satirical AI names, each referencing an ailment
6. Define a hard-coded `ailments` array (6–8 entries) — absurd but thematically on-brand conditions
7. Define a hard-coded `therapies` array (6–8 entries) — tongue-in-cheek treatment names
8. Insert all rows inside `main()` using Drizzle's `insert().values()` with upsert/ignore to keep re-runs idempotent

## Group 3 — Wire & Verify

9. Add `"db:seed": "tsx server/src/db/seed.ts"` to the root `package.json` scripts
10. Run `pnpm db:seed` locally and confirm it exits 0
11. Query the SQLite file and confirm row counts match the fixture arrays

## Group 4 — Minimal Home Page

12. Add a `GET /api/agents` Hono route that queries all agents and returns them as JSON
13. Create `client/src/pages/Home.tsx` — renders the AgentClinic name, a satirical tagline, and a list of agent names fetched from the API
14. Wire `<Home />` to the root route (`/`) in the React Router config
15. Run the dev server and confirm the page loads in the browser with seeded agent names visible

## Group 5 — Main Layout Component

16. Create `client/src/components/layout/Header.tsx` — site name and navigation placeholder
17. Create `client/src/components/layout/Footer.tsx` — satirical tagline and year
18. Create `client/src/components/layout/Layout.tsx` — composes `<Header>`, `<main>{children}</main>`, and `<Footer>`; accepts `children: React.ReactNode`
19. Create `client/src/components/layout/layout.css` — custom CSS for the layout shell (header/footer height, sticky header, body min-height)
20. Import `layout.css` inside `Layout.tsx`
21. Refactor `Home.tsx` to render inside `<Layout>` instead of its own `<main>` wrapper
22. Confirm the page still loads with header and footer visible
