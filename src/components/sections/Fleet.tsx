import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const specs = [
  { label: 'Max Range', value: '11,263 km' },
  { label: 'Speed', value: '480 knots' },
  { label: 'Passengers', value: 'Up to 12' },
  { label: 'Endurance', value: '14 hrs' },
  { label: 'Cruising Altitude', value: '15,544 m' },
  { label: 'Baggage', value: '5.52 m3' },
]

export default function Fleet() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-40px' })
  const blueprintRef = useRef<HTMLDivElement>(null)
  const blueprintInView = useInView(blueprintRef, { once: true, margin: '-60px' })

  return (
    <section className="bg-bg px-8 py-32 md:px-20 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <div>
            <p className="label mb-4 text-accent">Gulfstream</p>
            <h2 className="font-bold text-[clamp(3rem,7vw,8rem)] font-normal leading-none text-text md:font-light">650ER</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Rolls-Royce BR725 power, long-range aerodynamics, and a cabin tuned for sustained comfort at altitude.
          </p>
        </div>

        <div ref={gridRef} className="mb-20 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-3">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              className="bg-bg p-6 md:p-8"
              initial={{ opacity: 0, y: 18 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-1 font-display text-2xl font-normal text-text md:font-light">{spec.value}</p>
              <p className="label text-muted">{spec.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
          A true time-saving machine. It brings Tokyo and New York an hour closer at 92% of the speed of sound, with just a single stop around the globe.
        </p>
      </div>
    </section>
  )
}
