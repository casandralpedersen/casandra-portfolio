import { useEffect, useLayoutEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { HOME_PILLARS, ease } from './homeContent'
import { SharedContact, SharedProjects } from './HomeShared'

const notes = [
  {
    da: 'Finder mønstre i rod og muligheder i det ufærdige.',
    en: 'Finding patterns in mess and possibilities in unfinished things.',
    className: 'md:col-start-1 md:rotate-[-2deg]',
  },
  {
    da: 'Den bedste idé er ofte den, vi kan forklare på en serviet.',
    en: 'The best idea is often the one we can explain on a napkin.',
    className: 'md:col-start-2 md:mt-20 md:rotate-[2deg]',
  },
  {
    da: 'Design skal både mærkes, forstås og kunne leve i virkeligheden.',
    en: 'Design should be felt, understood and able to live in the real world.',
    className: 'md:col-start-1 md:ml-16 md:rotate-[1deg]',
  },
]

function reveal(shouldReduceMotion, delay = 0) {
  return {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 24, rotate: -1 },
    whileInView: { opacity: 1, y: 0, rotate: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { ease, duration: shouldReduceMotion ? 0 : 0.65, delay: shouldReduceMotion ? 0 : delay },
  }
}

function Tape({ className = '' }) {
  return (
    <span
      data-scrapbook-tape
      aria-hidden="true"
      className={`absolute h-7 w-28 rotate-[-4deg] bg-[#d7bd7b]/55 shadow-sm backdrop-blur-[1px] ${className}`}
    />
  )
}

export default function HomeScrapbook() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const [canDrag, setCanDrag] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const desktop = window.matchMedia('(min-width: 768px)')
    const updateDrag = () => setCanDrag(!shouldReduceMotion && finePointer.matches && desktop.matches)

    updateDrag()
    finePointer.addEventListener('change', updateDrag)
    desktop.addEventListener('change', updateDrag)

    return () => {
      finePointer.removeEventListener('change', updateDrag)
      desktop.removeEventListener('change', updateDrag)
    }
  }, [shouldReduceMotion])

  useLayoutEffect(() => {
    const previousRootOverflowX = document.documentElement.style.overflowX
    const previousBodyOverflowX = document.body.style.overflowX
    document.documentElement.style.overflowX = 'hidden'
    document.body.style.overflowX = 'hidden'

    return () => {
      document.documentElement.style.overflowX = previousRootOverflowX
      document.body.style.overflowX = previousBodyOverflowX
    }
  }, [])

  return (
    <main className="overflow-hidden bg-[#ece5d6] text-[#29251f]">
      <section className="relative mx-auto min-h-[calc(100svh-64px)] max-w-[1320px] px-5 pb-20 pt-12 sm:px-10 lg:px-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'radial-gradient(#9b8c72 0.7px, transparent 0.7px)', backgroundSize: '18px 18px' }}
        />

        <motion.div
          data-scrapbook-reveal
          {...reveal(shouldReduceMotion)}
          className="relative z-10 mx-auto max-w-4xl rotate-[-1deg] bg-[#fffdf5] px-6 py-10 shadow-[0_20px_50px_rgba(61,49,32,0.16)] sm:px-12 sm:py-14"
        >
          <Tape className="-top-3 left-[18%]" />
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">
            {t('Casandras arbejdsbord - København', 'Casandra’s desk - Copenhagen')}
          </p>
          <h1
            className="mt-8 max-w-[10ch] text-[clamp(4rem,10vw,9rem)] leading-[0.78] text-[#913c27]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('Bygget af nysgerrighed', 'Built from curiosity')}
          </h1>
          <p className="ml-auto mt-8 max-w-[38ch] rotate-[1deg] text-sm leading-relaxed opacity-70 sm:text-base">
            {t(
              'Jeg samler spor, spørgsmål og skæve idéer, indtil de bliver til noget, mennesker kan bruge.',
              'I collect clues, questions and odd ideas until they become something people can use.',
            )}
          </p>
        </motion.div>

        <motion.figure
          data-scrapbook-draggable
          data-drag-enabled={String(canDrag)}
          drag={canDrag}
          dragMomentum={false}
          whileDrag={canDrag ? { scale: 1.03, rotate: 0, zIndex: 30 } : undefined}
          className={`relative z-20 mx-auto -mt-5 w-[min(72vw,330px)] rotate-[4deg] bg-[#fffdf5] p-3 pb-12 shadow-[0_18px_35px_rgba(61,49,32,0.22)] md:ml-auto md:mr-20 md:-mt-24 ${
            canDrag ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
        >
          <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[3deg]" />
          <img src="/images/sitwavemepic.png" alt="Casandra vinker" className="aspect-[4/5] w-full object-cover" draggable="false" />
          <figcaption className="absolute bottom-4 left-5 rotate-[-2deg] text-xs italic opacity-65">
            {t('Træk mig rundt', 'Drag me around')}
          </figcaption>
        </motion.figure>
      </section>

      <section className="relative mx-auto max-w-[1180px] px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          {HOME_PILLARS.map((pillar, index) => (
            <motion.span
              data-scrapbook-chip
              data-scrapbook-reveal
              key={pillar.da}
              {...reveal(shouldReduceMotion, index * 0.07)}
              className="rounded-full border-2 border-[#29251f] bg-[#fffdf5] px-5 py-2 text-sm font-bold shadow-[3px_3px_0_#29251f]"
              style={{ color: pillar.color }}
            >
              {t(pillar.da, pillar.en)}
            </motion.span>
          ))}
        </div>

        <svg
          data-scrapbook-arrow
          aria-hidden="true"
          viewBox="0 0 800 130"
          className="mx-auto my-10 block h-auto w-full max-w-3xl overflow-visible text-[#913c27]"
        >
          <motion.path
            d="M20 45 C180 125 405 0 690 70 C735 82 754 94 775 110 M740 106 L775 110 L758 78"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDashoffset={shouldReduceMotion ? 0 : 1}
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ ease, duration: shouldReduceMotion ? 0 : 1.4 }}
          />
        </svg>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {notes.map((note, index) => (
            <motion.article
              data-scrapbook-note
              data-scrapbook-reveal
              key={note.da}
              {...reveal(shouldReduceMotion, index * 0.08)}
              className={`relative min-h-44 bg-[#f4d778] p-7 shadow-[7px_9px_0_rgba(41,37,31,0.14)] ${note.className}`}
            >
              <span className="font-mono text-[10px] opacity-45">0{index + 1}</span>
              <p className="mt-8 max-w-[26ch] text-2xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {t(note.da, note.en)}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          data-scrapbook-reveal
          {...reveal(shouldReduceMotion)}
          className="relative mx-auto mt-24 max-w-2xl rotate-[-1deg] border-2 border-dashed border-[#29251f]/40 bg-[#c8dce8] px-7 py-10 text-center"
        >
          <Tape className="-top-3 right-[14%] rotate-[5deg]" />
          <p className="text-3xl leading-tight sm:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            {t('Mennesket først. Resten finder vi ud af.', 'People first. We will figure out the rest.')}
          </p>
          <Link
            data-scrapbook-about-link
            to="/om"
            className="mt-7 inline-block border-b-2 border-[#29251f] text-xs font-bold uppercase tracking-[0.14em]"
          >
            {t('Se hele min historie', 'See my full story')} →
          </Link>
        </motion.div>
      </section>

      <div className="overflow-hidden max-md:[&_[data-shared-contact]]:rotate-0">
        <SharedProjects t={t} variant="scrapbook" />
        <SharedContact t={t} variant="scrapbook" />
      </div>
    </main>
  )
}
