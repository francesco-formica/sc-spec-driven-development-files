import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { db } from './db'
import { agents } from './db/schema'

const app = new Hono()

app.get('/api/agents', async (c) => {
  const rows = await db.select().from(agents)
  return c.json(rows)
})

serve({ fetch: app.fetch, port: 3001 }, () => {
  console.log('AgentClinic server running on http://localhost:3001')
})
