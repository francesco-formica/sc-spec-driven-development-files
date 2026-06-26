import './layout.css'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="site-layout">
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  )
}
