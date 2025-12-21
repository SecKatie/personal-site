import type { CSSProperties, ReactNode } from 'react'

function cutCornerClipPath(cornerPx: number) {
  return `polygon(0 0, calc(100% - ${cornerPx}px) 0, 100% ${cornerPx}px, 100% 100%, ${cornerPx}px 100%, 0 calc(100% - ${cornerPx}px))`
}

interface CutCornerBoxProps {
  children: ReactNode
  corner?: number
  outerClassName?: string
  innerClassName?: string
  outerStyle?: CSSProperties
  innerStyle?: CSSProperties
}

export default function CutCornerBox({
  children,
  corner = 12,
  outerClassName = '',
  innerClassName = '',
  outerStyle,
  innerStyle,
}: CutCornerBoxProps) {
  const clipPath = cutCornerClipPath(corner)

  return (
    <div
      className={outerClassName}
      style={{
        clipPath,
        ...outerStyle,
      }}
    >
      <div
        className={innerClassName}
        style={{
          clipPath,
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </div>
  )
}


