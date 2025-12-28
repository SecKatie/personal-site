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

interface FeaturedProject {
  name: string
  url: string
  // Optional overrides for GitHub data
  description?: string
  language?: string
  tags?: string[]
}

interface EnrichedFeaturedProject extends FeaturedProject {
  stargazers_count?: number
  fetchedDescription?: string | null
  fetchedLanguage?: string | null
  fetchedTopics?: string[]
}

// Extract owner/repo from GitHub URL
function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (match) {
    return { owner: match[1], repo: match[2].replace(/\.git$/, '') }
  }
  return null
}

const featuredProjects: FeaturedProject[] = [
  {
    name: 'ha-wyzeapi',
    url: 'https://github.com/SecKatie/ha-wyzeapi',
  },
  {
    name: 'lola',
    url: 'https://github.com/RedHatProductSecurity/lola',
  },
  {
    name: 'CVE-2019-8978',
    url: 'https://github.com/SecKatie/CVE-2019-8978',
  }
]

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [enrichedFeatured, setEnrichedFeatured] = useState<EnrichedFeaturedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch data for featured GitHub repos
    const fetchFeaturedData = async () => {
      const enriched = await Promise.all(
        featuredProjects.map(async (project) => {
          const parsed = parseGitHubUrl(project.url)
          if (!parsed) return project as EnrichedFeaturedProject

          try {
            const res = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`)
            if (!res.ok) return project as EnrichedFeaturedProject
            const data: GitHubRepo = await res.json()
            return {
              ...project,
              stargazers_count: data.stargazers_count,
              fetchedDescription: data.description,
              fetchedLanguage: data.language,
              fetchedTopics: data.topics,
            } as EnrichedFeaturedProject
          } catch {
            return project as EnrichedFeaturedProject
          }
        })
      )
      setEnrichedFeatured(enriched)
    }

    // Fetch all repos
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/SecKatie/repos?sort=updated&per_page=100')
        if (!res.ok) throw new Error('Failed to fetch repositories')
        const data: GitHubRepo[] = await res.json()
        // Filter out forks/archived repos and featured projects, then sort by stars
        const featuredNames = new Set(featuredProjects.map(p => p.name.toLowerCase()))
        const filtered = data
          .filter(repo => !repo.fork && !repo.archived && !featuredNames.has(repo.name.toLowerCase()))
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
        setRepos(filtered)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch')
      }
    }

    Promise.all([fetchFeaturedData(), fetchRepos()]).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navigation activeTab="projects" />
      
      <h1 className="mb-8">Projects</h1>

      {/* Featured Projects */}
      {enrichedFeatured.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-accent)]">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {enrichedFeatured.map(project => {
              const description = project.description ?? project.fetchedDescription ?? 'No description available'
              const language = project.language ?? project.fetchedLanguage
              const tags = project.tags ?? project.fetchedTopics?.slice(0, 3)

              return (
                <CutCornerBox
                  key={project.name}
                  corner={12}
                  outerClassName="relative p-[2px] bg-[var(--color-accent)] transition-all duration-200 hover:shadow-[0_0_20px_var(--color-accent-glow)]"
                  innerClassName="h-full bg-[var(--color-bg-secondary)]"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 h-full transition-all duration-200 hover:bg-[rgba(255,0,255,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-[var(--color-text)] m-0">{project.name}</h3>
                      {project.stargazers_count != null && project.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-[var(--color-accent)] text-sm whitespace-nowrap">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {project.stargazers_count}
                        </span>
                      )}
                    </div>

                    <p className="text-[var(--color-text-muted)] text-sm mb-4">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {language && (
                        <span className="text-xs px-2 py-1 border border-[var(--color-accent)] text-[var(--color-accent)] uppercase tracking-wider">
                          {language}
                        </span>
                      )}
                      {tags?.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-[rgba(255,0,255,0.1)] text-[var(--color-accent)] uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                </CutCornerBox>
              )
            })}
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-muted)]">All Projects</h2>
        </>
      )}

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
