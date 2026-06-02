import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { label: 'Missions Completed', value: '5,000+' },
  { label: 'Countries Served', value: '150+' },
  { label: 'Always Available', value: '24/7' },
]

const features = [
  {
    body: 'Fly beyond boundaries. Our global operations team choreographs seamless travel from the first call to the final handoff.',
    title: 'Direct Access to Private Travel',
  },
  {
    body: 'Your schedule becomes the center of gravity. We create quiet, precise flights that return time to your day.',
    title: 'Your Freedom to Enjoy Life',
  },
  {
    body: 'Every route, crew, transfer, and onboard preference is handled with obsessive attention and calm execution.',
    title: 'Precision and Excellence',
  },
  {
    body: 'From Dubai to the world, Jesko Jets pairs global reach with the intuition of a private flight desk.',
    title: 'Global Reach, Personal Touch',
  },
]

function StatCounter({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="py-8 md:border-b-0 md:pr-8"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="mb-2 font-display text-[clamp(2.5rem,5vw,5rem)] font-normal text-text md:font-light">{value}</p>
      <p className="label text-muted">{label}</p>
    </motion.div>
  )
}

export default function About() {
  const headRef = useRef<HTMLHeadingElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-80px' })
  const featuresRef = useRef<HTMLDivElement>(null)
  const featuresInView = useInView(featuresRef, { once: true, margin: '-40px' })

  return (
    <section id="about" className="relative overflow-hidden bg-bg px-8 py-32 md:px-20 md:py-40">
      <div className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/3 blur-3xl" />

      <motion.p
        className="label mb-16 text-accent md:mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        01 / About
      </motion.p>

      <motion.h2
        ref={headRef}
        className="relative mb-20 max-w-5xl font-bold text-[clamp(1.8rem,4vw,4.2rem)] font-normal leading-tight text-text md:mb-24 md:font-light"
        initial={{ opacity: 0, y: 40 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Jesko Jets is a private aviation operator with over 5,000 missions completed across 150+ countries. Executives, families, and global industries trust us to deliver on time, every time.
      </motion.h2>

      <div className="grid gap-px border-t border-border pt-12 md:grid-cols-3 md:pt-16">
        {stats.map((stat, index) => (
          <StatCounter key={stat.label} {...stat} index={index} />
        ))}
      </div>

      <div ref={featuresRef} className="mt-20 grid gap-px border-t border-border md:mt-24 md:grid-cols-2">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            className="group border-b border-border py-10 md:py-12 md:pr-12"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="mb-3 text-sm font-medium uppercase tracking-widest2 text-text transition-colors duration-300 group-hover:text-accent">{feature.title}</h3>
            <p className="max-w-xl text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-text/70">{feature.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
