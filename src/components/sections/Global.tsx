import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Marquee from '@/components/ui/Marquee'

const cities = [
  'Sao Paulo',
  'Lagos',
  'Seoul',
  'Los Angeles',
  'New York',
  'Dubai',
  'Cape Town',
  'Abu Dhabi',
  'Singapore',
  'Tokyo',
  'Cairo',
  'Paris',
  'London',
  'Mexico City',
  'Melbourne',
  'Miami',
  'Geneva',
  'Marrakech',
  'Mykonos',
  'Berlin',
  'Bangkok',
  'Hong Kong',
  'Sydney',
  'Toronto',
  'Zurich',
  'Milan',
  'Riyadh',
  'Shanghai',
  'Doha',
]

export default function Global() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' })

  return (
    <section id="global" className="overflow-hidden bg-bg py-32 md:py-40">
      <div className="mb-16 px-8 md:px-20">
        <motion.p
          className="label mb-6 text-accent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          04 / Global
        </motion.p>
        <motion.h2
          className="font-bold text-[clamp(2.8rem,6vw,7rem)] font-normal leading-none text-text md:font-light"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Fly Anywhere
        </motion.h2>
      </div>

      <div className="flex flex-col gap-2">
        <Marquee items={cities.slice(0, 15)} speed={50} direction="left" />
        <Marquee items={cities.slice(14)} speed={40} direction="right" />
      </div>

      <div ref={statsRef} className="mt-20 flex flex-col gap-10 border-t border-border px-8 pt-14 md:flex-row md:gap-16 md:px-20 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display text-5xl font-normal text-text md:font-light">174</p>
          <p className="label mt-1 text-muted">Countries Supported</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display text-5xl font-normal text-text md:font-light">Dubai</p>
          <p className="label mt-1 text-muted">Based in UAE</p>
        </motion.div>
      </div>
    </section>
  )
}
