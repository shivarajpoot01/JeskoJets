import { motion } from 'framer-motion'

interface MarqueeProps {
  direction?: 'left' | 'right'
  items: string[]
  speed?: number
}

export default function Marquee({ direction = 'left', items, speed = 60 }: MarqueeProps) {
  const doubled = [...items, ...items]
  const duration = (items.length * 190) / speed

  return (
    <div className="overflow-hidden whitespace-nowrap py-3">
      <motion.div
        className="inline-flex gap-12"
        animate={{ x: direction === 'left' ? [0, '-50%'] : ['-50%', 0] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((city, index) => (
          <span key={`${city}-${index}`} className="font-display text-base font-normal uppercase tracking-widest text-muted md:font-light">
            {city}
            <span className="mx-6 text-accent/30">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
