import { type RefObject, useEffect, useRef, useState } from 'react'
import { clamp } from '@/lib/utils'

export function getElementScrollProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const total = Math.max(1, el.offsetHeight - window.innerHeight)
  return clamp(-rect.top / total, 0, 1)
}

export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)
  const rafPending = useRef(false)

  useEffect(() => {
    const updateProgress = () => {
      if (ref.current) {
        setProgress(getElementScrollProgress(ref.current))
      }
    }

    const onScroll = () => {
      if (!rafPending.current) {
        rafPending.current = true
        requestAnimationFrame(() => {
          updateProgress()
          rafPending.current = false
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateProgress()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])

  return progress
}
