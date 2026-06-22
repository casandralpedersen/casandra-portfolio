import { useEffect, useState } from 'react'
import LayoutScrapbook from './about/LayoutScrapbook'
import LayoutScrapbook2 from './about/LayoutScrapbook2'
import LayoutSpotlight from './about/LayoutSpotlight'

const MODES = [
  { id: 'scrapbook', label: 'Scrapbook', Component: LayoutScrapbook },
  { id: 'scrapbook2', label: 'Scrapbook 2.0', Component: LayoutScrapbook2 },
  { id: 'spotlight', label: 'Spotlight', Component: LayoutSpotlight },
]

export default function About() {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('about-layout')
    return MODES.find(m => m.id === saved) ? saved : 'scrapbook'
  })

  useEffect(() => {
    if (mode === 'scrapbook2') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [mode])

  function selectMode(id) {
    localStorage.setItem('about-layout', id)
    setMode(id)
  }

  const Active = MODES.find((m) => m.id === mode)?.Component ?? LayoutScrapbook

  return (
    <>
      <Active />

      <div className="fixed bottom-4 right-4 z-50 flex gap-1 bg-[var(--color-base)] border border-[var(--color-text)]/15 shadow-md rounded-full px-1.5 py-1.5">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => selectMode(m.id)}
            className={`px-4 py-1.5 text-[12px] tracking-wide rounded-full transition-colors ${
              mode === m.id
                ? 'bg-[var(--color-burgundy)] text-[var(--color-base)]'
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </>
  )
}
