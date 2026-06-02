import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <div ref={ref} className="bg-bg px-8 md:px-20">
      <motion.div
        className="h-px w-full origin-left bg-border"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
