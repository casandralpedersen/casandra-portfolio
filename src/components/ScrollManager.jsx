import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const positions = new Map()

export default function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const save = () => positions.set(location.key, window.scrollY)
    window.addEventListener('scroll', save, { passive: true })
    return () => {
      save()
      window.removeEventListener('scroll', save)
    }
  }, [location.key])

  useEffect(() => {
    if (navType === 'POP') {
      const y = positions.get(location.key) ?? 0
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, y)))
    } else if (!location.hash) {
      window.scrollTo(0, 0)
    }
  }, [location, navType])

  return null
}
