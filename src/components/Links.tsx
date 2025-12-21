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
      {links.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </div>
  )
}
