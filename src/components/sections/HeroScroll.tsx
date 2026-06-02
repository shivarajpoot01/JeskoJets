import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useImagePreloader } from '@/hooks/useImagePreloader'
import { drawCoverFit, lerp } from '@/lib/utils'
import { getElementScrollProgress } from '@/hooks/useScrollProgress'

const FRAME_COUNT = 120
const FOLDER = '/sequence-1/'

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rawProgress = useRef(0)
  const lerpedProgress = useRef(0)
  const frameIndex = useRef(-1)
  const lastSize = useRef({ w: 0, h: 0 })
  const { firstFrame, frames, loaded, loadedCount } = useImagePreloader(FOLDER, FRAME_COUNT)
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const img = firstFrame
    if (!canvas || !img) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    lastSize.current = { w: canvas.width, h: canvas.height }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCoverFit(ctx, img, canvas.width, canvas.height)
  }, [firstFrame])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateProgress = () => {
      rawProgress.current = getElementScrollProgress(container)
      setDisplayProgress(rawProgress.current)
    }

    let rafPending = false
    const onScroll = () => {
      if (!rafPending) {
        rafPending = true
        requestAnimationFrame(() => {
          updateProgress()
          rafPending = false
        })
      }
    }

    let animationId = 0
    const draw = () => {
      lerpedProgress.current = lerp(lerpedProgress.current, rawProgress.current, 0.08)
      const index = Math.min(FRAME_COUNT - 1, Math.floor(lerpedProgress.current * (FRAME_COUNT - 1)))
      const img = frames[index] ?? firstFrame

      const cw = canvas.clientWidth
      const ch = canvas.clientHeight
      const sizeChanged = cw !== lastSize.current.w || ch !== lastSize.current.h

      if (img && img.complete && img.naturalWidth > 0 && (index !== frameIndex.current || sizeChanged)) {
        if (sizeChanged) {
          canvas.width = cw
          canvas.height = ch
          lastSize.current = { w: cw, h: ch }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawCoverFit(ctx, img, canvas.width, canvas.height)
        frameIndex.current = index
      }

      canvas.style.filter = `brightness(${1 - lerpedProgress.current * 0.35})`
      animationId = requestAnimationFrame(draw)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateProgress()
    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [firstFrame, frames])

  const textReveal = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  }

  return (
    <section id="hero" ref={containerRef} className="relative h-[250vh] md:h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg" data-cursor="crosshair">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/5 to-bg/90" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(5,5,5,0.2)_45%,rgba(5,5,5,0.92)_100%)]" />

        <div
          className="relative z-10 flex h-full flex-col justify-end px-8 pb-20 md:px-20 md:pb-28"
          style={{ opacity: Math.max(0, 1 - displayProgress * 3) }}
        >
          <motion.p
            className="label mb-6 text-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Private Aviation / Worldwide
          </motion.p>

          <motion.h1
            className="mb-5 font-bold text-[clamp(3.6rem,10vw,9.5rem)] font-normal leading-[0.86] text-text text-balance md:font-light"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.span
              className="block overflow-hidden"
              variants={{ initial: { y: 80 }, animate: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
            >
              <motion.span className="block">We are</motion.span>
            </motion.span>
            <motion.span
              className="block overflow-hidden"
              variants={{ initial: { y: 80 }, animate: { y: 0, transition: { duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] } } }}
            >
              <motion.span className="block">movement</motion.span>
            </motion.span>
          </motion.h1>

          <motion.h2
            className="mb-8 max-w-2xl font-bold text-[clamp(1.5rem,3vw,3.2rem)] font-normal leading-tight text-muted md:font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Your freedom to enjoy life
          </motion.h2>

          <motion.p
            className="max-w-md text-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Every flight is designed around your comfort, time, and ambition, so you can focus on what matters while we handle the invisible details.
          </motion.p>

          <motion.div
            className="mt-12 flex items-center gap-3 text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <motion.div
              className="h-10 w-px bg-muted/40"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            />
            <span className="">Scroll to explore</span>
          </motion.div>
        </div>
      </div>
      <div
        className="fixed left-0 top-0 z-[100] h-px bg-accent transition-opacity duration-500"
        style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%`, opacity: loaded ? 0 : 1 }}
      />
    </section>
  )
}
