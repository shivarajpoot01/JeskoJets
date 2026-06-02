import { useEffect, useState } from 'react'

interface ImagePreloaderOptions {
  extension?: string
  padTo?: number
  prefix?: string
  startAt?: number
}

export function useImagePreloader(folder: string, count: number, options: ImagePreloaderOptions = {}) {
  const { extension = 'jpg', padTo = 3, prefix = 'ezgif-frame-', startAt = 1 } = options
  const [firstFrame, setFirstFrame] = useState<HTMLImageElement | null>(null)
  const [frames, setFrames] = useState<HTMLImageElement[]>([])
  const [loadedCount, setLoadedCount] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    const images = Array.from({ length: count }, () => new Image())
    const srcFor = (index: number) => {
      const frameNumber = String(index + startAt).padStart(padTo, '0')
      return `${folder}${prefix}${frameNumber}.${extension}`
    }

    setFirstFrame(null)
    setFrames([])
    setLoadedCount(0)
    setLoaded(false)

    const loadImage = (index: number) =>
      new Promise<void>((resolve) => {
        const img = images[index]
        img.decoding = 'async'
        img.onload = () => {
          if (!cancelled) {
            setLoadedCount((current) => Math.min(count, current + 1))
          }
          resolve()
        }
        img.onerror = () => resolve()
        img.src = srcFor(index)
      })

    loadImage(0).then(() => {
      if (cancelled) return
      setFirstFrame(images[0])

      Promise.all(Array.from({ length: count - 1 }, (_, i) => loadImage(i + 1))).then(() => {
        if (cancelled) return
        setFrames(images)
        setLoadedCount(count)
        setLoaded(true)
      })
    })

    return () => {
      cancelled = true
    }
  }, [count, extension, folder, padTo, prefix, startAt])

  return { firstFrame, frames, loaded, loadedCount }
}
