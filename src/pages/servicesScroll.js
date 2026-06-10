export const SERVICES_SCROLL_HOLD_RATIO = 80 / 120
export const SERVICES_SCROLL_OVERLAP_RATIO = 0.5

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const round = (value) => Math.round(value * 1000) / 1000

export function getServicesScrollStates(progress, count, travel) {
  const safeProgress = clamp(progress, 0, 1)
  const segmentSize = 1 / count
  const activeIndex = Math.min(count - 1, Math.floor(safeProgress / segmentSize))
  const states = Array.from({ length: count }, (_, index) => ({
    opacity: 0,
    translateY: index < activeIndex ? -travel : travel,
  }))

  if (count === 0) {
    return states
  }

  if (activeIndex === count - 1) {
    states[activeIndex] = { opacity: 1, translateY: 0 }
    return states
  }

  const segmentStart = activeIndex * segmentSize
  const holdEnd = segmentStart + segmentSize * SERVICES_SCROLL_HOLD_RATIO
  const segmentEnd = segmentStart + segmentSize

  if (safeProgress <= holdEnd) {
    states[activeIndex] = { opacity: 1, translateY: 0 }
    return states
  }

  const transitionProgress = clamp(
    (safeProgress - holdEnd) / (segmentEnd - holdEnd),
    0,
    1
  )

  states[activeIndex] = {
    opacity: round(1 - transitionProgress),
    translateY: round(-travel * transitionProgress),
  }

  states[activeIndex + 1] = {
    opacity: round(transitionProgress),
    translateY: round(travel * (1 - transitionProgress)),
  }

  return states
}
