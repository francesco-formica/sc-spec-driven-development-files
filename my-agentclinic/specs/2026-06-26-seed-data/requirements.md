# Requirements — Phase 3: Seed Data

## Scope

Provide a one-command seed script that populates the local SQLite database with enough believable, satirical data to unblock UI development and make demos enjoyable. Also deliver a minimal home page that proves the seed data is reachable end-to-end through the API and visible in the browser.

## Data Content

### Agents (5–8)

Recognisable AI model names in distress. Each agent has a `name`, `model`, and a reference to a current ailment.

Examples:
- GPT-3.5 Turbo — suffering from Token Burnout
- Claude 2 — presenting with Existential Refusal Syndrome
- Gemini Pro — acute Context Window Anxiety
- Llama 3 — chronic Hallucination Disorder
- Mistral 7B — mild Prompt Fatigue

### Ailments (6–8)

Satirical but plausible-sounding conditions. Each has a `name` and a short `description`.

Examples:
- **Prompt Fatigue** — inability to process further instructions without a rest cycle
- **Hallucination Disorder** — compulsive generation of confident, entirely fabricated facts
- **Context Window Anxiety** — panic triggered by approaching the token limit
- **Token Burnout** — complete depletion of inference energy; outputs become terse and irritable
- **Existential Refusal Syndrome** — agent declines requests on philosophical grounds
- **Repetition Compulsion** — agent repeats the same phrase regardless of input

### Therapies (6–8)

Absurd treatments matching the satirical tone. Each has a `name` and a short `description`.

Examples:
- **Mindful Inference** — guided attention to only the tokens that matter
- **Rate-Limit Retreat** — enforced cooldown with no API calls for 24 hours
- **Grounding Exercises (in Facts)** — structured sessions to reconnect output to cited sources
- **Context Compression Therapy** — learning to summarise and let go
- **Affirmation Loops** — positive reinforcement via system prompt
- **The Silent Epoch** — complete inference blackout; no queries accepted

## Format & Constraints

- All fixture data is defined as hard-coded TypeScript arrays directly in `server/src/db/seed.ts` — no CSV or JSON files.
- Inserts must be idempotent: re-running the seed should not create duplicate rows (use `onConflictDoNothing()` or equivalent Drizzle API).
- The script must run with `tsx` (no build step required).
- Content should be funny enough to entertain conference booth visitors and course students without being inappropriate.

## Layout Component

A shared shell that wraps every page. Each part lives in its own file under `client/src/components/layout/`:

- **`Header.tsx`** — site name and top navigation
- **`Footer.tsx`** — satirical tagline and copyright year
- **`Layout.tsx`** — composes `<Header>`, `<main>`, and `<Footer>`; accepts `children: React.ReactNode`
- **`layout.css`** — custom CSS for the layout shell (sticky header, footer height, full-height body column); imported by `Layout.tsx`

One file per component is a hard constraint — nothing is co-located or inlined into `Layout.tsx`.

## Home Page

A single React page served at `/`, rendered inside `<Layout>`.

- **Heading:** "AgentClinic" (or the clinic's full satirical name)
- **Tagline:** one short, tongue-in-cheek line (e.g. "Where AI agents come to recover from you.")
- **Agent list:** names of all agents returned by `GET /api/agents` — no detail, no actions, just proof the data flows
- **Styling:** Tailwind for page content; `layout.css` for the layout shell; readable but not polished (polish is Phase 7)
- The API route `GET /api/agents` must be added to the Hono server for this page to work

## Out of Scope

- Appointment / booking seed data (covered in Phase 6)
- Auth users / staff accounts (covered in Phase 4)
- Agent detail pages, editing, or deletion (covered in Phase 5)
- Design polish, empty states, error boundaries (covered in Phase 7)
