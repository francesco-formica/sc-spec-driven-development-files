# Tech Stack

## Summary

Full-stack TypeScript: Hono REST server + React (Vite) SPA, with a clear client/server boundary and a lightweight footprint.

## Frontend

| Concern | Choice |
|---------|--------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router v6 |
| State | React Query (server state) + useState/Context (local) |

## Backend

| Concern | Choice |
|---------|--------|
| Server | Hono (TypeScript, Node.js) |
| ORM | Drizzle ORM |
| Database | SQLite |
| Auth | Hono middleware — JWT / session cookie |

## Deployment

| Concern | Choice |
|---------|--------|
| Hosting | Railway or Fly.io |
| DB | SQLite file (bundled with the server) |

## Rationale

- **Hono** is minimal, type-safe end-to-end, and fast — no magic, easy to test.
- **Drizzle + SQLite** keeps schema and queries in TypeScript with zero runtime overhead and no external DB process — ideal for demos and local dev.
- **Vite + React** gives Mary's team a snappy dashboard; shadcn/ui gives Steve attractive, accessible components out of the box.
