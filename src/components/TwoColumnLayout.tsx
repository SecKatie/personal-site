import type { ReactNode } from 'react'

interface TwoColumnLayoutProps {
  left: ReactNode
  right: ReactNode
}

export default function TwoColumnLayout({ left, right }: TwoColumnLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start md:items-stretch">
      <div className="space-y-8 h-full">
        {left}
      </div>
      <div className="h-full">
        {right}
      </div>
    </div>
  )
}

