import type { ReactNode } from 'react'

interface TwoColumnLayoutProps {
  left: ReactNode
  right: ReactNode
}

export default function TwoColumnLayout({ left, right }: TwoColumnLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
      <div className="space-y-8">
        {left}
      </div>
      <div>
        {right}
      </div>
    </div>
  )
}

