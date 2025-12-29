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
                <div className="max-w-[65ch] space-y-6 md:space-y-7">
                  <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-[rgba(255,79,216,0.18)] pb-3">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
                      <span className="inline-block h-1.5 w-1.5 bg-[var(--color-accent)] shadow-[0_0_16px_rgba(255,79,216,0.35)]" />
                      About
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 text-[10px] md:text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)] border border-[rgba(255,79,216,0.22)] bg-[rgba(255,79,216,0.06)]">
                      Security × Automation × OSS
                    </span>
                  </div>

                  <div className="spac text-[15px] md:text-[17px] leading-relaxed">
                    <p className="mb-4">
                      I&apos;m a{' '}
                      <span className="font-semibold text-[var(--color-text)]">Senior Product Security Engineer</span>{' '}
                      dedicated to making technology safer. I believe in the power of open source to make advanced
                      security, features, and services available to everyone.
                    </p>
                    <p className="mb-4">
                      At Red Hat, I work on the <span className="font-semibold text-[var(--color-text)]">security</span>{' '}
                      of our products and services. I specialize in{' '}
                      <span className="font-semibold text-[var(--color-text)]">Threat Modeling</span>,{' '}
                      <span className="font-semibold text-[var(--color-text)]">IAM</span>,{' '}
                      <span className="font-semibold text-[var(--color-text)]">Automation</span>, and{' '}
                      <span className="font-semibold text-[var(--color-text)]">Applied AI</span>.
                    </p>
                    <p className="m-0">
                      Off-hours, I&apos;m usually experimenting with smart home tech, my homelab, or digging into new
                      research on <span className="font-semibold text-[var(--color-text)]">LLMs</span>.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1.5">
                    {['Product security', 'Security automation', 'Open source', 'Applied AI/LLMs'].map((tag) => (
                      <span
                        key={tag}
                        className="select-none px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)] border border-[rgba(255,79,216,0.35)] bg-[linear-gradient(180deg,rgba(255,79,216,0.10),rgba(255,79,216,0.06))] shadow-[0_0_0_1px_rgba(255,79,216,0.10)_inset] transition-colors transition-shadow duration-200 hover:text-[var(--color-accent-yellow)] hover:border-[rgba(255,213,74,0.45)] hover:shadow-[0_0_18px_rgba(255,213,74,0.12)]"
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

