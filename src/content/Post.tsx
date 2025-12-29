import { useParams } from 'react-router-dom'
import ViewTransitionLink from '../components/ViewTransitionLink'

interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  tags?: string[]
}

interface PostModule {
  default: React.ComponentType
  frontmatter: PostFrontmatter
}

const postModules = import.meta.glob<PostModule>('../posts/*.mdx', { eager: true })

export default function Post() {
  const { slug } = useParams<{ slug: string }>()

  const postPath = `../posts/${slug}.mdx`
  const postModule = postModules[postPath]

  if (!postModule) {
    return (
      <>
        <h1 className="mb-4">Post Not Found</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          The post you're looking for doesn't exist.
        </p>
        <ViewTransitionLink
          to="/posts"
          className="text-[var(--color-accent)] hover:underline"
        >
          ← Back to Posts
        </ViewTransitionLink>
      </>
    )
  }

  const { default: Content, frontmatter } = postModule

  return (
    <>
      <article className="max-w-3xl mx-auto">
        <ViewTransitionLink
          to="/posts"
          className="text-[var(--color-accent)] hover:underline text-sm mb-6 inline-block"
        >
          ← Back to Posts
        </ViewTransitionLink>

        <header className="mb-8">
          <h1 className="mb-2">{frontmatter.title}</h1>
          <time className="text-[var(--color-text-muted)] text-sm">
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {frontmatter.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-[rgba(255,0,255,0.1)] text-[var(--color-accent)] uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="max-w-none">
          <Content />
        </div>
      </article>
    </>
  )
}
