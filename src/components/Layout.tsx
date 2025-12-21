import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* Scanlines effect */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1000]"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 3px)'
        }}
      >
        <div 
          className="absolute top-0 left-0 w-full h-2.5 animate-[scanline_8s_linear_infinite]"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 240, 255, 0.1), transparent)'
          }}
        />
      </div>
      
      {/* Noise effect */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999] opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")"
        }}
      />
      
      <main className="flex-1 max-w-[900px] mx-auto px-8 md:px-16 py-16 md:py-16 w-full relative z-10">
        {children}
      </main>
      
      <footer className="text-center p-8 text-[var(--color-cyber-text-muted)] text-sm font-[Orbitron,monospace] tracking-[0.2em] uppercase border-t border-[rgba(0,240,255,0.2)] relative z-10">
        <p>&copy; {new Date().getFullYear()} // CHARLOTTE NC</p>
      </footer>
    </>
  )
}
