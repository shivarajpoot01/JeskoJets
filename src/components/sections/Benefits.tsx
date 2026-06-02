import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const benefits = [
  {
    body: 'Documentation, ground handling, cabin care, and calm logistics for the companions who matter most.',
    num: '01',
    title: 'Pets Welcome',
  },
  {
    body: 'From urgent departures to carefully staged itineraries, our flight desk operates across every time zone.',
    num: '02',
    title: '24/7 Availability',
  },
  {
    body: 'Fine dining, connectivity, entertainment, and attentive crew service shaped around how you prefer to fly.',
    num: '03',
    title: 'Onboard Services',
  },
  {
    body: 'Optimized routes, fast boarding, private terminals, and ground support that makes time feel expansive again.',
    num: '04',
    title: 'Efficient by Design',
  },
]

export default function Benefits() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-40px' })
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-40px' })

  return (
    <section id="benefits" className="bg-bg px-8 py-32 md:px-20 md:py-40">
      <motion.p
        className="label mb-16 text-accent md:mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        03 / Advantages
      </motion.p>

      <motion.h2
        ref={titleRef}
        className="mb-20 max-w-2xl font-bold text-[clamp(2.2rem,4vw,4.5rem)] font-normal leading-tight text-text md:mb-24 md:font-light"
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        A Better Way to Fly
      </motion.h2>

      <div ref={gridRef} className="grid gap-px border-t border-border md:grid-cols-2">
        {benefits.map((benefit, index) => (
          <motion.article
            key={benefit.num}
            className="group py-10 md:py-12 md:pr-12"
            initial={{ opacity: 0, y: 32 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label mb-6 block text-border transition-all duration-500 group-hover:text-accent">{benefit.num}</span>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-widest2 text-text transition-colors duration-300 group-hover:text-accent">{benefit.title}</h3>
            <p className="max-w-lg text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-text/70">{benefit.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
