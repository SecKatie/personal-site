import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import CutCornerBox from '../components/CutCornerBox'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  topics: string[]
  fork: boolean
  archived: boolean
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/users/SecKatie/repos?sort=updated&per_page=100')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch repositories')
        return res.json()
      })
      .then((data: GitHubRepo[]) => {
        // Filter out forks/archived repos and sort by stars
        const filtered = data
          .filter(repo => !repo.fork && !repo.archived)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
        setRepos(filtered)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Navigation activeTab="projects" />
      
      <h1 className="mb-8">Projects</h1>
      
      {loading && (
        <p className="text-[var(--color-text-muted)]">Loading projects...</p>
      )}
      
      {error && (
        <p className="text-red-500">Error: {error}</p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map(repo => (
          <CutCornerBox
            key={repo.id}
            corner={12}
            outerClassName="relative p-[2px] bg-[var(--color-accent)] transition-all duration-200 hover:shadow-[0_0_20px_var(--color-accent-glow)]"
            innerClassName="h-full bg-[var(--color-bg-secondary)]"
          >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 h-full transition-all duration-200 hover:bg-[rgba(255,0,255,0.08)]"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-xl font-semibold text-[var(--color-text)] m-0">{repo.name}</h2>
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-[var(--color-accent)] text-sm whitespace-nowrap">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {repo.stargazers_count}
                    </span>
                  )}
                </div>
                
                <p className="text-[var(--color-text-muted)] text-sm mb-4">
                  {repo.description || 'No description available'}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {repo.language && (
                    <span className="text-xs px-2 py-1 border border-[var(--color-accent)] text-[var(--color-accent)] uppercase tracking-wider">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics.slice(0, 3).map(topic => (
                    <span 
                      key={topic}
                      className="text-xs px-2 py-1 bg-[rgba(255,0,255,0.1)] text-[var(--color-accent)] uppercase tracking-wider"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </a>
          </CutCornerBox>
        ))}
      </div>
    </>
  )
}

