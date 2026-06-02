import { useEffect, useRef, useState } from 'react'
import { lerp } from '@/lib/utils'

export default function CustomCursor() {
  const smallRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const crosshairRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const small = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const [mode, setMode] = useState<'default' | 'hover' | 'crosshair'>('default')

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX
      mouse.current.y = event.clientY
    }

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null
      if (!target) return
      if (target.closest('[data-cursor="crosshair"]')) {
        setMode('crosshair')
      } else if (target.closest('a, button, input, textarea, select, [data-cursor="hover"]')) {
        setMode('hover')
      }
    }

    const onPointerOut = (event: PointerEvent) => {
      const related = event.relatedTarget as Element | null
      if (related?.closest('[data-cursor="crosshair"], a, button, input, textarea, select, [data-cursor="hover"]')) {
        return
      }
      setMode('default')
    }

    let rafId = 0
    const tick = () => {
      small.current.x = lerp(small.current.x, mouse.current.x, 0.12)
      small.current.y = lerp(small.current.y, mouse.current.y, 0.12)
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.07)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.07)

      if (smallRef.current) {
        smallRef.current.style.transform = `translate3d(${small.current.x - 4}px, ${small.current.y - 4}px, 0)`
      }
      if (ringRef.current) {
        const scale = mode === 'hover' ? 1.5 : 1
        ringRef.current.style.transform = `translate3d(${ring.current.x - 20}px, ${ring.current.y - 20}px, 0) scale(${scale})`
      }
      if (crosshairRef.current) {
        crosshairRef.current.style.transform = `translate3d(${mouse.current.x - 8}px, ${mouse.current.y - 8}px, 0)`
      }

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('pointerover', onPointerOver, { passive: true })
    window.addEventListener('pointerout', onPointerOut, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('pointerover', onPointerOver)
      window.removeEventListener('pointerout', onPointerOut)
    }
  }, [mode])

  return (
    <>
      <div
        ref={smallRef}
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-2 w-2 rounded-full bg-accent transition-opacity duration-200 md:block"
        style={{ opacity: mode === 'hover' || mode === 'crosshair' ? 0 : 1, willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[119] hidden h-10 w-10 rounded-full border border-accent/55 transition-[opacity,transform] duration-200 md:block"
        style={{ opacity: mode === 'crosshair' ? 0 : 1, willChange: 'transform' }}
      />
      <div
        ref={crosshairRef}
        className="pointer-events-none fixed left-0 top-0 z-[121] hidden h-4 w-4 text-accent transition-opacity duration-150 md:block"
        style={{ opacity: mode === 'crosshair' ? 1 : 0, willChange: 'transform' }}
      >
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 0.5V5M8 11v4.5M0.5 8H5M11 8h4.5" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        </svg>
      </div>
    </>
  )
}
