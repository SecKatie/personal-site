import type { ReactNode } from 'react'
import CutCornerBox from './CutCornerBox'

interface AboutBoxProps {
  children: ReactNode
}

export default function AboutBox({ children }: AboutBoxProps) {
  return (
    <CutCornerBox
      corner={12}
      outerClassName="p-px bg-[rgba(235,73,235,0.55)]"
      outerStyle={{ boxShadow: '0 0 10px rgba(255, 0, 255, 0.18)' }}
      innerClassName="p-7 md:p-9 bg-[rgba(15,20,32,0.9)]"
    >
      <div className="max-w-full break-words [overflow-wrap:anywhere] [text-wrap:pretty] [hyphens:auto] text-[var(--color-text-muted)] leading-relaxed [&>p]:mb-0">
        {children}
      </div>
    </CutCornerBox>
  )
}

