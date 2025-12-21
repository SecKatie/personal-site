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
    <div className="hero">
      <div className="avatar-container">
        <img src={avatarSrc} alt={avatarAlt} className="avatar" />
      </div>
      <div className="hero-text">
        <h1>{name}</h1>
        <p className="tagline">{tagline}</p>
      </div>
    </div>
  )
}
