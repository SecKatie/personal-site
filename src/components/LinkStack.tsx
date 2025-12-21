import type { ReactNode } from 'react'

interface LinkStackProps {
  children: ReactNode
}

export default function LinkStack({ children }: LinkStackProps) {
  return (
    <div className="space-y-4">
      {children}
    </div>
  )
}

