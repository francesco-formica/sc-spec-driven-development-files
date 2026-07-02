import { serve } from '@hono/node-server'
import { createApp } from './app'

const app = createApp()

serve({ fetch: app.fetch, port: 3001 }, () => {
  console.log('AgentClinic server running on http://localhost:3001')
})
