import type { ReactNode } from 'react'
import './layout.css'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="site-layout">
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  )
}
