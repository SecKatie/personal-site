import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className="flex-1 max-w-[1200px] mx-auto px-8 md:px-16 py-16 md:py-16 w-full">
        {children}
      </main>
      
      <footer className="text-center p-8 text-[var(--color-text-muted)] text-sm border-t border-[var(--color-accent)] uppercase tracking-wider" style={{ boxShadow: '0 -1px 15px var(--color-accent-glow)' }}>
        <p>&copy; {new Date().getFullYear()} // Charlotte, NC</p>
      </footer>
    </>
  )
}
