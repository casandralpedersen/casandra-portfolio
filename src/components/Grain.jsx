import { useEffect, useRef } from 'react'

export default function Grain() {
  const ref = useRef(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const y = window.scrollY
      if (ref.current) {
        ref.current.style.backgroundPosition = `${(y * 0.55) % 230}px ${(-y * 0.85) % 230}px`
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="grain-overlay" aria-hidden="true" />
}
