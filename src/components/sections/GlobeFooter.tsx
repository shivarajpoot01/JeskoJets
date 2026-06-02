import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface GlobeFooterProps {
  onBook: () => void
}

export default function GlobeFooter({ onBook }: GlobeFooterProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const contentInView = useInView(contentRef, { once: true, margin: '-80px' })

  return (
    <footer className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-bg">
      <video src="/globe-loop.mp4" autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,transparent_24%,rgba(5,5,5,0.72)_72%,#050505_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg to-transparent" />

      <div ref={contentRef} className="relative z-10 px-8 pb-16 pt-40 md:px-20 md:pb-24">
        <motion.h2
          className="mb-8 max-w-4xl font-bold text-[clamp(2.7rem,7vw,8rem)] font-normal leading-none text-text md:font-light"
          initial={{ opacity: 0, y: 40 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Fly anywhere with total comfort and control
        </motion.h2>

        <motion.p
          className="font-bold mb-14 text-muted md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          5,000+ Flights Successfully Arranged
        </motion.p>

        <motion.div
          className="mb-20 flex flex-col gap-6 md:mb-24 md:flex-row md:items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <a href="mailto:info@jeskojets.com" className="text-sm text-text transition-colors duration-300 hover:text-accent">
              info@jeskojets.com
            </a>
            <span className="hidden h-4 w-px bg-border md:block" />
            <a href="tel:+971544325050" className="text-sm text-text transition-colors duration-300 hover:text-accent">
              +971 54 432 5050
            </a>
          </div>
          <button
            type="button"
            onClick={onBook}
              className="font-bold w-fit border border-accent/40 px-8 py-3 rounded-full text-accent transition-all duration-300 hover:bg-accent hover:text-bg md:ml-auto"
          >
            Book the Flight
          </button>
        </motion.div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-center">
          <span className="font-bold text-muted">Copyright {new Date().getFullYear()} Jesko Jets. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="https://github.com/shivarajpoot01" className="font-bold text-muted transition-colors duration-300 hover:text-text">
              Developed by Shiva Rajpoot
            </a>
            <a href="#hero" className="font-bold text-muted transition-colors duration-300 hover:text-text">
              Return to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
