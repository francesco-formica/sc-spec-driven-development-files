# Validation — Phase 3: Seed Data

Phase 3 is complete and mergeable when every item below is checked off.

## Checklist

- [ ] `pnpm db:seed` exits with code 0 (no unhandled errors or exceptions)
- [ ] `agents` table contains the expected number of rows (matches the fixture array length)
- [ ] `ailments` table contains the expected number of rows
- [ ] `therapies` table contains the expected number of rows
- [ ] Re-running `pnpm db:seed` a second time produces **no duplicate rows** (idempotent)
- [ ] `GET /api/agents` returns a JSON array containing the seeded agents
- [ ] Home page loads at `/` in the browser and displays the agent names
- [ ] `pnpm typecheck` passes with no TypeScript errors

## How to verify row counts

```bash
# From project root — adjust path to your SQLite file
sqlite3 server/dev.db "SELECT 'agents', COUNT(*) FROM agents UNION ALL SELECT 'ailments', COUNT(*) FROM ailments UNION ALL SELECT 'therapies', COUNT(*) FROM therapies;"
```

Expected output should match the number of entries defined in `server/src/db/seed.ts`.

## Merge criteria

All eight checklist items must pass. The TypeScript check must be clean (zero errors, zero warnings treated as errors). No manual data-content review is required beyond the automated checks above.
