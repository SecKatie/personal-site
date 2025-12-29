import CutCornerBox from '../components/CutCornerBox'
import ViewTransitionLink from '../components/ViewTransitionLink'

interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  tags?: string[]
}

interface Post extends PostFrontmatter {
  slug: string
}

// Import all posts from the posts directory
const postModules = import.meta.glob<{ frontmatter: PostFrontmatter }>('../posts/*.mdx', { eager: true })

const posts: Post[] = Object.entries(postModules)
  .map(([path, module]) => {
    const slug = path.replace('../posts/', '').replace('.mdx', '')
    const frontmatter = module.frontmatter ?? {}
    return {
      slug,
      title: frontmatter.title ?? 'Untitled',
      date: frontmatter.date ?? '',
      excerpt: frontmatter.excerpt ?? '',
      tags: frontmatter.tags,
    }
  })
  .filter(post => post.date) // Only include posts with valid dates
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default function Posts() {
  return (
    <>
      <h1 className="mb-8">Posts</h1>

      {posts.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">No posts yet. Check back soon!</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map(post => (
            <CutCornerBox
              key={post.slug}
              corner={12}
              outerClassName="relative p-[2px] bg-[var(--color-accent)] transition-all duration-200 hover:shadow-[0_0_20px_var(--color-accent-glow)]"
              innerClassName="bg-[var(--color-bg-secondary)]"
            >
              <ViewTransitionLink
                to={`/posts/${post.slug}`}
                className="block p-6 transition-all duration-200 hover:bg-[rgba(255,0,255,0.08)]"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-xl font-semibold text-[var(--color-text)] m-0">
                    {post.title}
                  </h2>
                  <time className="text-[var(--color-text-muted)] text-sm whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                <p className="text-[var(--color-text-muted)] text-sm mb-4">
                  {post.excerpt}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-[rgba(255,0,255,0.1)] text-[var(--color-accent)] uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </ViewTransitionLink>
            </CutCornerBox>
          ))}
        </div>
      )}
    </>
  )
}
