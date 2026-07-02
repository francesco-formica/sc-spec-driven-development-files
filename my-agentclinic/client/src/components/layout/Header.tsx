import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-header__name">AgentClinic</Link>
      <nav className="site-header__nav">
        <Link to="/">Home</Link>
        <Link to="/ailments">Ailments</Link>
        <Link to="/therapies">Therapies</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/book">Book</Link>
      </nav>
    </header>
  )
}
