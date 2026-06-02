import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { href: '#about', label: 'About' },
  { href: '#fleet', label: 'Our Fleet' },
  { href: '#benefits', label: 'Advantages' },
  { href: '#global', label: 'Global' },
]

interface NavbarProps {
  onBook: () => void
}

export default function Navbar({ onBook }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [nearBottom, setNearBottom] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const distFromBottom = docHeight - (currentY + winHeight)

      const atBottom = distFromBottom < 300
      setNearBottom(atBottom)
      setScrolled(currentY > 60)

      if (atBottom) {
        setHidden(false)
      } else if (currentY < 80) {
        setHidden(false)
      } else if (currentY > lastScrollY.current + 10) {
        setHidden(true)
      } else if (currentY < lastScrollY.current - 5) {
        setHidden(false)
      }

      lastScrollY.current = currentY
    }

    const sections = document.querySelectorAll('section[id], div[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => observer.observe(s))

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div
        className="fixed left-0 right-0 top-4 z-50 px-5 md:px-10"
        style={{
          transform: hidden ? 'translateY(calc(-100% - 1.5rem))' : 'translateY(0)',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className={`
            group relative flex items-center justify-between
            rounded-full px-5 py-3 md:px-6 md:py-3.5
            border transition-all duration-500
            ${scrolled || nearBottom
              ? 'border-white/10 bg-[#050505]/90 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
              : 'border-white/5 bg-[#050505]/40 backdrop-blur-md'
            }
            ${nearBottom ? 'border-accent/20 shadow-[0_0_24px_rgba(200,185,154,0.07),inset_0_1px_0_rgba(200,185,154,0.08)]' : ''}
          `}
        >
          <div
            className={`pointer-events-none absolute inset-x-6 top-0 h-px rounded-full transition-opacity duration-700
              ${scrolled ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,185,154,0.18), transparent)' }}
          />

          <a
            href="#hero"
            className="relative z-10 font-bold text-[11px] font-normal uppercase tracking-[0.3em] text-text/90 transition-colors duration-300 hover:text-text md:font-light"
          >
            Jesko Jets
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-[9px] tracking-[0.32em] uppercase transition-all duration-300
                  ${activeLink === link.href ? 'text-text' : 'text-muted hover:text-text/70'}
                `}
              >
                {activeLink === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/5 border border-white/8"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {nearBottom && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative hidden md:block"
              >
                <span className="block h-1.5 w-1.5 rounded-full bg-accent/60" />
                <span className="absolute inset-0 h-1.5 w-1.5 animate-ping rounded-full bg-accent/40" />
              </motion.div>
            )}

            <button
              type="button"
              onClick={onBook}
              className={`
                font-bold hidden rounded-full border px-4 py-1.5 text-[9px] tracking-[0.3em] uppercase transition-all duration-300 md:block
                ${nearBottom
                  ? 'border-accent/60 bg-accent text-bg hover:bg-accent/90'
                  : 'border-accent/30 text-accent hover:border-accent/60 hover:bg-accent/8'
                }
              `}
            >
              {nearBottom ? 'Book Now' : 'Book the Flight'}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-10 flex h-6 w-6 flex-col items-center justify-center gap-1 md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.span
                className="block h-px w-4 bg-text"
                animate={menuOpen ? { rotate: 45, y: 2.5, width: 18 } : { rotate: 0, y: 0, width: 16 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-px w-3 bg-text"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px w-4 bg-text"
                animate={menuOpen ? { rotate: -45, y: -2.5, width: 18 } : { rotate: 0, y: 0, width: 16 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="fixed left-0 right-0 top-0 z-40 flex flex-col gap-6 border-b border-border bg-bg px-8 pb-10 pt-24 shadow-glow md:hidden"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`py-2 font-display text-3xl font-normal tracking-wide transition-colors duration-300 md:font-light ${
                    activeLink === link.href ? 'text-text' : 'text-muted hover:text-text'
                  }`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                type="button"
                onClick={() => { setMenuOpen(false); onBook() }}
                className="label mt-4 w-fit border border-accent/40 px-8 py-3 text-accent transition-all duration-300 hover:bg-accent hover:text-bg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Book the Flight
              </motion.button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
