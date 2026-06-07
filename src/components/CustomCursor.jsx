import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 })
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 })
  const trailX = useSpring(x, { damping: 32, stiffness: 140, mass: 0.6 })
  const trailY = useSpring(y, { damping: 32, stiffness: 140, mass: 0.6 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    function handleMove(e) {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
      const target = e.target.closest('a, button, [role="button"], input, [data-cursor-hover]')
      setHovering(!!target)
    }

    function handleLeave() {
      setVisible(false)
    }

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [x, y, visible])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          border: '1px solid var(--color-base)',
          opacity: visible ? 1 : 0,
          transition: 'width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          backgroundColor: 'var(--color-burgundy)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />
    </>
  )
}
