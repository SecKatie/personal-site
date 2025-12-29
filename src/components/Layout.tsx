import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  // Determine active tab from path
  const getActiveTab = (): 'katie' | 'projects' | 'posts' => {
    if (location.pathname.startsWith('/projects')) return 'projects'
    if (location.pathname.startsWith('/posts')) return 'posts'
    return 'katie'
  }

  return (
    <>
      <main className="flex-1 max-w-[1200px] mx-auto px-8 md:px-16 py-16 md:py-16 w-full">
        <Navigation activeTab={getActiveTab()} />
        <div style={{ viewTransitionName: 'content' } as React.CSSProperties}>
          {children}
        </div>
      </main>

      <footer className="text-center p-8 text-[var(--color-text-muted)] text-sm border-t border-[var(--color-accent)] uppercase tracking-wider" style={{ boxShadow: '0 -1px 15px var(--color-accent-glow)' }}>
        <p>&copy; {new Date().getFullYear()} // Charlotte, NC</p>
      </footer>
    </>
  )
}
