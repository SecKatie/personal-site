import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="scanlines"></div>
      <div className="noise"></div>
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} // CHARLOTTE NC</p>
      </footer>
    </>
  )
}
