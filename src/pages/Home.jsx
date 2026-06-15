import { useLayoutEffect, useState } from 'react'
import HomeModeSwitcher from './home/HomeModeSwitcher'
import HomeEditorial from './home/HomeEditorial'
import HomeOriginal from './home/HomeOriginal'
import { HOME_MODES } from './home/homeContent'

const ACTIVE_MODES = {
  original: HomeOriginal,
  editorial: HomeEditorial,
}

export default function Home() {
  const [mode, setMode] = useState(() => localStorage.getItem('home-layout') || 'original')
  const validMode = HOME_MODES.some((item) => item.id === mode) ? mode : 'original'
  const ActiveMode = ACTIVE_MODES[validMode] ?? HomeOriginal

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [validMode])

  function selectMode(nextMode) {
    localStorage.setItem('home-layout', nextMode)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    setMode(nextMode)
  }

  return (
    <>
      <div data-home-mode={validMode}>
        <ActiveMode />
      </div>
      <HomeModeSwitcher mode={validMode} onSelect={selectMode} />
    </>
  )
}
