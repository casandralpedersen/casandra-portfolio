import { useLayoutEffect, useState } from 'react'
import HomeModeSwitcher from './home/HomeModeSwitcher'
import { HOME_MODES } from './home/homeContent'

export default function Home() {
  const [mode, setMode] = useState(() => localStorage.getItem('home-layout') || 'original')
  const validMode = HOME_MODES.some((item) => item.id === mode) ? mode : 'original'

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [validMode])

  function selectMode(nextMode) {
    localStorage.setItem('home-layout', nextMode)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    setMode(nextMode)
  }

  return (
    <>
      <main
        data-home-mode={validMode}
        className="min-h-[200vh] bg-[var(--color-base)]"
      />
      <HomeModeSwitcher mode={validMode} onSelect={selectMode} />
    </>
  )
}
