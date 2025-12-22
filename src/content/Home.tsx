import Navigation from '../components/Navigation'
import TwoColumnLayout from '../components/TwoColumnLayout'
import PhotoBox from '../components/PhotoBox'
import AboutBox from '../components/AboutBox'
import Links from '../components/Links'

export default function Home() {
  const links = [
    { href: 'https://github.com/SecKatie', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/kmulliken', label: 'LinkedIn' },
    { href: 'mailto:katie@mulliken.net', label: 'Email' },
  ] satisfies Array<{ href: string; label: string }>

  return (
    <>
      <Navigation activeTab="katie" />

      <TwoColumnLayout
        left={
          <div className="md:flex md:flex-col md:h-full">
            <PhotoBox src="/avatar.jpg" alt="Katie Mulliken" />
          </div>
        }
        right={
          <>
            <div className="md:flex md:flex-col md:h-full">
              <h1 className="mb-8 leading-tight">
                <span className="block mb-3 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
                  Senior Product Security Engineer
                </span>
                <span className="block">
                  Katie <span className="text-[var(--color-accent)]">Mulliken</span>
                </span>
              </h1>

              <div className="hidden md:block md:flex-1" />

              <AboutBox>
                <div className="max-w-[65ch] space-y-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
                      About
                    </span>
                    <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                      Security × automation × OSS
                    </span>
                  </div>

                  <p className="m-0 text-base md:text-lg mb-2">
                    I&apos;m a{' '}
                    <span className="font-semibold text-[var(--color-text)]">Senior Product Security Engineer</span>{' '}
                    dedicated to making technology safer and more accessible—especially where security meets developer
                    velocity.
                  </p>
                  <p className="m-0 text-base md:text-lg mb-2">
                    I blend <span className="font-semibold text-[var(--color-text)]">security</span>,{' '}
                    <span className="font-semibold text-[var(--color-text)]">automation</span>, and{' '}
                    <span className="font-semibold text-[var(--color-text)]">open source</span>. Off-hours, I&apos;m
                    usually experimenting with smart home tech or digging into new research on{' '}
                    <span className="font-semibold text-[var(--color-text)]">LLMs</span>.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Product security', 'Security automation', 'Open source', 'Applied AI/LLMs'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs uppercase tracking-wider text-[var(--color-accent)] border border-[rgba(235,73,235,0.35)] bg-[rgba(235,73,235,0.08)]"
                        style={{
                          clipPath:
                            'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AboutBox>
            </div>
          </>
        }
      />

      <div className="mt-16 pt-14 border-t border-[rgba(235,73,235,0.2)]">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center space-y-3">
            <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
              Links
            </span>
            <p className="m-0 text-sm uppercase tracking-wider text-[var(--color-text-muted)]">
              Let&apos;s connect
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {links.map((link) => (
              <Links key={link.href} links={[link]} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

