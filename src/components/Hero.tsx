interface HeroProps {
  name: string
  tagline: string
  avatarSrc?: string
  avatarAlt?: string
}

export default function Hero({
  name,
  tagline,
  avatarSrc = '/avatar.png',
  avatarAlt = 'Avatar',
}: HeroProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 mb-8">
      <div className="relative flex-shrink-0">
        <div 
          className="absolute -inset-1.5 bg-gradient-to-br from-[var(--color-cyber-cyan)] to-[var(--color-cyber-magenta)] opacity-50 -z-10"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
          }}
        />
        <img 
          src={avatarSrc} 
          alt={avatarAlt} 
          className="w-40 h-40 md:w-[200px] md:h-[200px] object-cover object-top border-3 border-[var(--color-cyber-cyan)] transition-all duration-300 hover:border-[var(--color-cyber-magenta)]"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
            boxShadow: '0 0 20px var(--color-cyber-cyan), 0 0 40px rgba(0, 240, 255, 0.3), inset 0 0 20px rgba(0, 240, 255, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px var(--color-cyber-magenta), 0 0 60px rgba(255, 42, 109, 0.4), inset 0 0 30px rgba(255, 42, 109, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px var(--color-cyber-cyan), 0 0 40px rgba(0, 240, 255, 0.3), inset 0 0 20px rgba(0, 240, 255, 0.1)'
          }}
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h1>{name}</h1>
        <p 
          className="text-lg md:text-xl text-[var(--color-cyber-text-muted)] mb-0 tracking-[0.2em] uppercase pl-0 md:pl-8 pt-4 md:pt-0 border-t-2 md:border-t-0 md:border-l-2 border-[var(--color-cyber-magenta)]"
        >
          {tagline}
        </p>
      </div>
    </div>
  )
}
