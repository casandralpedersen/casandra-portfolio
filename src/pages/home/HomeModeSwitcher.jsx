import { HOME_MODES } from './homeContent'

export default function HomeModeSwitcher({ mode, onSelect }) {
  return (
    <div
      aria-label="Forside-layout"
      className="fixed bottom-4 right-4 z-[70] flex max-w-[calc(100vw-2rem)] gap-1 overflow-x-auto rounded-full border border-[var(--color-text)]/15 bg-[var(--color-base)] px-1.5 py-1.5 shadow-md"
    >
      {HOME_MODES.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] tracking-wide ${
            mode === item.id
              ? 'bg-[var(--color-burgundy)] text-[var(--color-base)]'
              : 'opacity-50 hover:opacity-100'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
