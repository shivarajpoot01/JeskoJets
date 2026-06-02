import { AnimatePresence, motion } from 'framer-motion'

interface LoadingScreenProps {
  loaded: boolean
}

export default function LoadingScreen({ loaded }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-bold text-4xl text-text/90 md:font-light">
              Jesko Jets
            </span>
            <div className="relative h-px w-24 overflow-hidden bg-border">
              <motion.div
                className="absolute inset-0 bg-accent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
              />
            </div>
            <span className="font-bold text-muted">Preparing your experience</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
