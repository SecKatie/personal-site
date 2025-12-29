import { useNavigate, useLocation, type To } from 'react-router-dom'
import { type ReactNode, type MouseEvent } from 'react'

// Count path segments (depth) for a given path
function getPathDepth(path: string): number {
  return path.split('/').filter(Boolean).length
}

interface ViewTransitionLinkProps {
  to: To
  children: ReactNode
  className?: string
}

export default function ViewTransitionLink({
  to,
  children,
  className,
}: ViewTransitionLinkProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const targetPath = typeof to === 'string' ? to : to.pathname ?? ''
    const currentDepth = getPathDepth(location.pathname)
    const targetDepth = getPathDepth(targetPath)

    // Determine direction based on URL hierarchy depth
    let direction: string | null
    if (targetDepth > currentDepth) {
      // Going deeper (e.g., /a → /a/page) - slide from right
      direction = 'right'
    } else if (targetDepth < currentDepth) {
      // Going up (e.g., /a/page → /a) - slide from left
      direction = 'left'
    } else {
      // Same level (lateral navigation) - no animation
      direction = null
    }

    // Check if View Transitions API is supported or if no animation needed
    if (!document.startViewTransition || direction === null) {
      delete document.documentElement.dataset.transition
      navigate(to)
      return
    }

    // Set direction on document for CSS to use
    document.documentElement.dataset.transition = direction

    document.startViewTransition(() => {
      navigate(to)
    })
  }

  const href = typeof to === 'string' ? to : to.pathname ?? ''

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
