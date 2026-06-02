import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount

export function drawCoverFit(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number,
) {
  const imgRatio = img.naturalWidth / img.naturalHeight
  const canvasRatio = canvasW / canvasH
  let drawW: number
  let drawH: number
  let offsetX: number
  let offsetY: number

  if (canvasRatio > imgRatio) {
    drawW = canvasW
    drawH = canvasW / imgRatio
    offsetX = 0
    offsetY = (canvasH - drawH) / 2
  } else {
    drawH = canvasH
    drawW = canvasH * imgRatio
    offsetX = (canvasW - drawW) / 2
    offsetY = 0
  }

  ctx.drawImage(img, offsetX, offsetY, drawW, drawH)
}
