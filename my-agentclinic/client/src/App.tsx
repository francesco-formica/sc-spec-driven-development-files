import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AgentDetail from './pages/AgentDetail'
import AgentForm from './pages/AgentForm'
import Ailments from './pages/Ailments'
import Therapies from './pages/Therapies'
import Appointments from './pages/Appointments'
import Book from './pages/Book'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agents/new" element={<AgentForm />} />
      <Route path="/agents/:id/edit" element={<AgentForm />} />
      <Route path="/agents/:id" element={<AgentDetail />} />
      <Route path="/ailments" element={<Ailments />} />
      <Route path="/therapies" element={<Therapies />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/book" element={<Book />} />
    </Routes>
  )
}
