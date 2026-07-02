import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'

type Agent = {
  id: number
  name: string
  model: string
  currentAilmentId: number | null
  ailmentName: string | null
}

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/agents')
      .then((r) => {
        if (!r.ok) throw new Error('not ok')
        return r.json()
      })
      .then(setAgents)
      .catch(() => setError('Could not reach the clinic. Are the doors even open?'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
      <p className="text-gray-500 mb-10 italic">
        Where AI agents come to recover from you.
      </p>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-brand-black">Current Patients</h2>
        <Link
          to="/agents/new"
          className="text-sm px-3 py-1 rounded border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors"
        >
          + Admit New Agent
        </Link>
      </div>

      {loading && <p className="text-gray-400 italic">Checking patients in…</p>}
      {!loading && error && <p className="text-red-500">{error}</p>}
      {!loading && !error && agents.length === 0 && (
        <p className="text-gray-400 italic">The waiting room is empty. Suspicious.</p>
      )}

      {!loading && !error && agents.length > 0 && (
        <ul className="space-y-2">
          {agents.map((agent) => (
            <li key={agent.id}>
              <Link
                to={`/agents/${agent.id}`}
                className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-l-4 border-l-brand-orange border border-gray-200 rounded px-4 py-3 hover:bg-orange-50 transition-colors"
              >
                <span className="font-medium text-gray-800">{agent.name}</span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  {agent.ailmentName && (
                    <span className="text-sm text-brand-orange italic">{agent.ailmentName}</span>
                  )}
                  <span className="text-sm text-gray-400">{agent.model}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}
