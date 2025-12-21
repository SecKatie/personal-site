import CutCornerBox from './CutCornerBox'

interface PhotoBoxProps {
  src: string
  alt: string
}

export default function PhotoBox({ src, alt }: PhotoBoxProps) {
  return (
    <CutCornerBox
      corner={12}
      outerClassName="relative w-full aspect-[1/1] p-[2px] bg-[var(--color-accent)]"
      outerStyle={{ boxShadow: '0 0 20px var(--color-accent-glow)' }}
      innerClassName="w-full h-full overflow-hidden bg-[var(--color-bg-secondary)]"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
      />
    </CutCornerBox>
  )
}

