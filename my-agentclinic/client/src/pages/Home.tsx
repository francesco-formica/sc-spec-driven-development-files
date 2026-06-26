import { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'

type Agent = {
  id: number
  name: string
  model: string
  current_ailment_id: number | null
}

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/agents')
      .then((r) => r.json())
      .then(setAgents)
      .catch(() => setError('Could not reach the clinic. Are the doors even open?'))
  }, [])

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
      <p className="text-gray-500 mb-10 italic">
        Where AI agents come to recover from you.
      </p>

      <h2 className="text-lg font-semibold text-gray-700 mb-4">Current Patients</h2>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {agents.map((agent) => (
          <li
            key={agent.id}
            className="flex items-center justify-between border border-gray-200 rounded px-4 py-3"
          >
            <span className="font-medium text-gray-800">{agent.name}</span>
            <span className="text-sm text-gray-400">{agent.model}</span>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
