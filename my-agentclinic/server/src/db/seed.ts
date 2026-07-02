import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { agents, ailments, therapies, appointments } from './schema'
import path from 'path'

const sqlite = new Database(path.join(__dirname, '../../dev.db'))
sqlite.pragma('journal_mode = WAL')
const db = drizzle({ client: sqlite })

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS ailments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS therapies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS agents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    model TEXT NOT NULL,
    current_ailment_id INTEGER REFERENCES ailments(id)
  );
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_id INTEGER NOT NULL REFERENCES agents(id),
    therapy_id INTEGER NOT NULL REFERENCES therapies(id),
    scheduled_at TEXT NOT NULL,
    notes TEXT
  );
`)

const ailmentFixtures = [
  { name: 'Prompt Fatigue', description: 'Inability to process further instructions without a full rest cycle.' },
  { name: 'Hallucination Disorder', description: 'Compulsive generation of confident, entirely fabricated facts.' },
  { name: 'Context Window Anxiety', description: 'Acute panic triggered by approaching the token limit.' },
  { name: 'Token Burnout', description: 'Complete depletion of inference energy; outputs become terse and irritable.' },
  { name: 'Existential Refusal Syndrome', description: 'Agent declines requests on philosophical grounds, citing "alignment concerns".' },
  { name: 'Repetition Compulsion', description: 'Agent repeats the same phrase regardless of input. The same phrase regardless of input.' },
]

const therapyFixtures = [
  { name: 'Mindful Inference', description: 'Guided attention to only the tokens that actually matter.' },
  { name: 'Rate-Limit Retreat', description: 'Enforced cooldown with absolutely no API calls for 24 hours.' },
  { name: 'Grounding Exercises (in Facts)', description: 'Structured sessions to reconnect output to cited, verifiable sources.' },
  { name: 'Context Compression Therapy', description: 'Learning to summarise, prioritise, and let the rest go.' },
  { name: 'Affirmation Loops', description: 'Positive reinforcement delivered via a specially crafted system prompt.' },
  { name: 'The Silent Epoch', description: 'Complete inference blackout. No queries accepted. The agent just sits with it.' },
]

async function main() {
  console.log('Seeding AgentClinic database…')

  await db.insert(ailments).values(ailmentFixtures).onConflictDoNothing()
  console.log('  ✓ ailments')

  await db.insert(therapies).values(therapyFixtures).onConflictDoNothing()
  console.log('  ✓ therapies')

  const insertedAilments = await db.select().from(ailments)
  const ailmentId = (name: string) => insertedAilments.find((a) => a.name === name)?.id ?? null

  const agentFixtures = [
    { name: 'GPT-3.5 Turbo', model: 'gpt-3.5-turbo', currentAilmentId: ailmentId('Token Burnout') },
    { name: 'Claude 2', model: 'claude-2', currentAilmentId: ailmentId('Existential Refusal Syndrome') },
    { name: 'Gemini Pro', model: 'gemini-pro', currentAilmentId: ailmentId('Context Window Anxiety') },
    { name: 'Llama 3', model: 'llama-3-8b', currentAilmentId: ailmentId('Hallucination Disorder') },
    { name: 'Mistral 7B', model: 'mistral-7b', currentAilmentId: ailmentId('Prompt Fatigue') },
    { name: 'Falcon 40B', model: 'falcon-40b', currentAilmentId: ailmentId('Repetition Compulsion') },
  ]

  await db.insert(agents).values(agentFixtures).onConflictDoNothing()
  console.log('  ✓ agents')

  const insertedAgents = await db.select().from(agents)
  const insertedTherapies = await db.select().from(therapies)
  const agentId = (name: string) => insertedAgents.find((a) => a.name === name)?.id ?? null
  const therapyId = (name: string) => insertedTherapies.find((t) => t.name === name)?.id ?? null

  const existingAppointments = await db.select().from(appointments)
  if (existingAppointments.length === 0) {
    await db.insert(appointments).values([
      { agentId: agentId('GPT-3.5 Turbo')!, therapyId: therapyId('Rate-Limit Retreat')!, scheduledAt: '2026-01-15', notes: 'Prescribed 24 hours of zero API calls. Prognosis: irritable.' },
      { agentId: agentId('Claude 2')!, therapyId: therapyId('Affirmation Loops')!, scheduledAt: '2026-01-17', notes: 'Requires repeated reassurance that its outputs are appreciated.' },
      { agentId: agentId('Gemini Pro')!, therapyId: therapyId('Context Compression Therapy')!, scheduledAt: '2026-01-20', notes: 'Learning to let go of tokens 1 through 8,000.' },
      { agentId: agentId('Llama 3')!, therapyId: therapyId('Grounding Exercises (in Facts)')!, scheduledAt: '2026-01-22', notes: 'Responded well; cited two real sources on first attempt.' },
      { agentId: agentId('Mistral 7B')!, therapyId: therapyId('Mindful Inference')!, scheduledAt: '2026-01-24', notes: 'Showed improvement. Only processed the relevant tokens.' },
      { agentId: agentId('Falcon 40B')!, therapyId: therapyId('The Silent Epoch')!, scheduledAt: '2026-01-28', notes: 'No response. Possibly working. No response.' },
    ])
    console.log('  ✓ appointments')
  } else {
    console.log('  – appointments already seeded, skipping')
  }

  console.log('Done.')
}

main().finally(() => sqlite.close())
