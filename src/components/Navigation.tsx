import ViewTransitionLink from './ViewTransitionLink'
import CutCornerBox from './CutCornerBox'

interface NavigationProps {
  activeTab?: 'katie' | 'projects' | 'posts'
}

export default function Navigation({ activeTab = 'katie' }: NavigationProps) {
  return (
    <nav className="mb-12">
      <CutCornerBox
        corner={8}
        outerClassName="inline-flex p-[2px] bg-[var(--color-accent)]"
        outerStyle={{ boxShadow: '0 0 15px var(--color-accent-glow)' }}
        innerClassName="inline-flex gap-0 overflow-hidden bg-[var(--color-bg-secondary)]"
      >
          <ViewTransitionLink
            to="/"
            className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-200 ${
              activeTab === 'katie'
                ? 'bg-[var(--color-accent)] text-[var(--color-bg)]'
                : 'bg-transparent text-[var(--color-accent)] hover:bg-[rgba(255,0,255,0.08)]'
            }`}
          >
            Katie
          </ViewTransitionLink>
          <div className="w-px bg-[var(--color-accent)]"></div>
          <ViewTransitionLink
            to="/projects"
            className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-200 ${
              activeTab === 'projects'
                ? 'bg-[var(--color-accent)] text-[var(--color-bg)]'
                : 'bg-transparent text-[var(--color-accent)] hover:bg-[rgba(255,0,255,0.08)]'
            }`}
          >
            Projects
          </ViewTransitionLink>
          <div className="w-px bg-[var(--color-accent)]"></div>
          <ViewTransitionLink
            to="/posts"
            className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-200 ${
              activeTab === 'posts'
                ? 'bg-[var(--color-accent)] text-[var(--color-bg)]'
                : 'bg-transparent text-[var(--color-accent)] hover:bg-[rgba(255,0,255,0.08)]'
            }`}
          >
            Posts
          </ViewTransitionLink>
      </CutCornerBox>
    </nav>
  )
}

