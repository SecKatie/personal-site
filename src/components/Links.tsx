interface Link {
  href: string
  label: string
}

interface LinksProps {
  links: Link[]
}

export default function Links({ links }: LinksProps) {
  return (
    <div className="links">
      {links.map((link) => {
        return (
          <a
            key={link.href}
            href={link.href}
            {...{
              target: '_blank',
              rel: 'noopener noreferrer',
              'data-umami-event': 'outbound-link',
              'data-umami-event-url': link.href,
            }}
          >
            {link.label}
          </a>
        )
      })}
    </div>
  )
}
