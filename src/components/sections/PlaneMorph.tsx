import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { getElementScrollProgress } from '@/hooks/useScrollProgress'
import { useImagePreloader } from '@/hooks/useImagePreloader'
import { drawCoverFit, lerp } from '@/lib/utils'

const FRAME_COUNT = 120
const FOLDER = '/sequence-2/'

export default function PlaneMorph() {
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

  return (
    <section id="fleet-scroll" ref={containerRef} className="relative h-[250vh] md:h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg" data-cursor="crosshair">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/10 to-bg/30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/50 to-transparent" />

        <div className="absolute bottom-20 left-8 max-w-lg md:bottom-24 md:left-20">
          <motion.p
            className="label mb-4 text-accent"
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            02 / Our Fleet
          </motion.p>
          <motion.h2
            className="mb-4 font-bold text-[clamp(2.4rem,5vw,5.5rem)] font-normal leading-none text-text md:font-light"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 1 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Fly the Legacy
          </motion.h2>
          <p className="text-sm leading-relaxed text-muted" style={{ opacity: 1 - displayProgress * 0.4 }}>
            Engineering born for exceptional range, quiet confidence, and top-end speed.
          </p>
        </div>
      </div>
      <div
        className="fixed left-0 top-0 z-[100] h-px bg-accent transition-opacity duration-500"
        style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%`, opacity: loaded ? 0 : 1 }}
      />
    </section>
  )
}
