import CutCornerBox from './CutCornerBox'

interface Link {
  href: string
  label: string
}

interface LinksProps {
  links: Link[]
}

export default function Links({ links }: LinksProps) {
  return (
    <>
      {links.map((link) => {
        return (
          <CutCornerBox
            key={link.href}
            corner={8}
            outerClassName="w-full p-[2px] bg-[var(--color-accent)] transition-all duration-200 hover:shadow-[0_0_20px_var(--color-accent-glow)]"
            innerClassName="w-full bg-[var(--color-bg-secondary)]"
          >
            <a
              href={link.href}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium uppercase tracking-wide text-[var(--color-accent)] transition-all duration-200 hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] bg-transparent"
              {...{
                target: '_blank',
                rel: 'noopener noreferrer',
                'data-umami-event': 'outbound-link',
                'data-umami-event-url': link.href,
              }}
            >
              {link.label}
            </a>
          </CutCornerBox>
        )
      })}
    </>
  )
}
