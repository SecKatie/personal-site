interface Link {
  href: string
  label: string
}

interface LinksProps {
  links: Link[]
}

export default function Links({ links }: LinksProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 flex-wrap mt-6 mb-4">
      {links.map((link) => {
        return (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex items-center justify-center md:justify-start gap-2 px-5 py-2.5 border border-[var(--color-cyber-cyan)] font-[Orbitron,monospace] text-sm font-bold uppercase tracking-wide text-[var(--color-cyber-cyan)] transition-all duration-300 relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(255, 42, 109, 0.1) 100%)',
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-cyber-cyan)'
              e.currentTarget.style.color = 'var(--color-cyber-bg)'
              e.currentTarget.style.boxShadow = '0 0 20px var(--color-cyber-cyan), 0 0 40px var(--color-cyber-cyan)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(255, 42, 109, 0.1) 100%)'
              e.currentTarget.style.color = 'var(--color-cyber-cyan)'
              e.currentTarget.style.boxShadow = ''
            }}
            {...{
              target: '_blank',
              rel: 'noopener noreferrer',
              'data-umami-event': 'outbound-link',
              'data-umami-event-url': link.href,
            }}
          >
            <span className="relative z-10">{link.label}</span>
            <span 
              className="absolute top-0 -left-full w-full h-full opacity-0 group-hover:left-full group-hover:opacity-100 transition-all duration-500"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3), transparent)'
              }}
            />
          </a>
        )
      })}
    </div>
  )
}
