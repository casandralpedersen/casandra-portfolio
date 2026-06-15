import { useLayoutEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { HOME_PILLARS, ease } from './homeContent'
import { SharedContact, SharedProjects } from './HomeShared'

const modules = [
  {
    da: 'Fra spørgsmål til retning',
    en: 'From question to direction',
    detailDa: 'Research, målgrupper og prioritering.',
    detailEn: 'Research, audiences and priorities.',
  },
  {
    da: 'Fra retning til form',
    en: 'From direction to form',
    detailDa: 'Identitet, interfaces og fortællinger.',
    detailEn: 'Identity, interfaces and stories.',
  },
  {
    da: 'Fra form til virkning',
    en: 'From form to impact',
    detailDa: 'Drift, læring og målbare forbedringer.',
    detailEn: 'Operations, learning and measurable improvements.',
  },
]

const nodeClasses = [
  'left-[4%] top-[7%] md:left-[8%] md:top-[10%]',
  'right-[4%] top-[7%] md:right-[8%] md:top-[10%]',
  'bottom-[5%] left-1/2 -translate-x-1/2 md:bottom-[8%]',
]

export default function HomeLab() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

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
    <main className="overflow-hidden bg-[#efe8d2] text-[var(--color-text)]">
      <section className="texture min-h-[calc(100svh-64px)] px-4 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[30px] border border-[var(--color-text)]/20 bg-[var(--color-base)]/65 shadow-[0_30px_80px_rgba(41,92,125,0.12)]">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-text)]/15 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] opacity-60">
            <span>Creative system / Casandra</span>
            <span>Signal status: active</span>
          </header>

          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="flex flex-col justify-between border-b border-[var(--color-text)]/15 p-6 sm:p-10 lg:min-h-[680px] lg:border-b-0 lg:border-r lg:p-12">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">{t('Systemoversigt', 'System overview')}</p>
                <h1
                  className="mt-8 max-w-[10ch] text-[clamp(3.7rem,8vw,8.5rem)] leading-[0.82] text-[var(--color-burgundy)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t('Design x forretning x teknologi', 'Design x business x technology')}
                </h1>
                <p className="mt-8 max-w-[38ch] text-sm leading-relaxed opacity-65">
                  {t(
                    'Jeg arbejder som forbindelsen mellem det mennesker har brug for, det forretningen skal kunne, og det teknologien gør muligt.',
                    'I work as the connection between what people need, what the business must achieve and what technology makes possible.',
                  )}
                </p>
              </div>
              <Link to="/om" className="mt-10 w-fit border-b border-[var(--color-text)]/35 pb-1 font-mono text-[11px] uppercase tracking-[0.14em]">
                {t('Åbn profil', 'Open profile')} →
              </Link>
            </div>

            <div className="relative min-h-[500px] overflow-hidden p-5 sm:min-h-[620px] sm:p-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-35"
                style={{ backgroundImage: 'linear-gradient(rgba(41,92,125,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(41,92,125,.12) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
              />
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 600 600">
                {['M300 300 L155 145', 'M300 300 L445 145', 'M300 300 L300 470'].map((path, index) =>
                  shouldReduceMotion ? (
                    <path
                      data-lab-connector
                      key={path}
                      d={path}
                      fill="none"
                      stroke={HOME_PILLARS[index].color}
                      strokeWidth="2"
                      strokeDashoffset="0"
                    />
                  ) : (
                    <motion.path
                      data-lab-connector
                      key={path}
                      d={path}
                      fill="none"
                      stroke={HOME_PILLARS[index].color}
                      strokeWidth="2"
                      strokeDasharray="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ ease, duration: 1.1, delay: index * 0.12 }}
                    />
                  ),
                )}
              </svg>

              <div className="absolute left-1/2 top-1/2 z-10 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--color-text)]/25 bg-[var(--color-base)] text-center font-mono text-[10px] uppercase tracking-[0.12em] shadow-lg sm:h-36 sm:w-36">
                {t('Mennesker i centrum', 'People at the centre')}
              </div>

              {HOME_PILLARS.map((pillar, index) => (
                <motion.div
                  data-lab-node
                  key={pillar.da}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.72 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ease, duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.18 + index * 0.12 }}
                  className={`absolute z-10 grid h-28 w-28 place-items-center rounded-full border-4 border-[var(--color-base)] text-center text-xs font-bold text-[var(--color-base)] shadow-xl sm:h-36 sm:w-36 ${nodeClasses[index]}`}
                  style={{ background: pillar.color }}
                >
                  {t(pillar.da, pillar.en)}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <header className="mb-10 grid gap-5 border-b border-[var(--color-text)]/20 pb-8 md:grid-cols-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">{t('Procesmoduler', 'Process modules')}</p>
          <h2 className="text-[clamp(3rem,6vw,6.5rem)] leading-[0.88]" style={{ fontFamily: 'var(--font-display)' }}>
            {t('Et system der kan bevæge sig', 'A system built to move')}
          </h2>
        </header>
        <div className="grid gap-px overflow-hidden rounded-[24px] border border-[var(--color-text)]/15 bg-[var(--color-text)]/15 md:grid-cols-3">
          {modules.map((module, index) => (
            <motion.article
              data-lab-module
              key={module.da}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ ease, duration: shouldReduceMotion ? 0 : 0.65, delay: shouldReduceMotion ? 0 : index * 0.08 }}
              className="min-h-64 bg-[var(--color-base)] p-7"
            >
              <span className="font-mono text-[10px] opacity-45">MODULE / 0{index + 1}</span>
              <h3 className="mt-20 text-3xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(module.da, module.en)}</h3>
              <p className="mt-4 text-xs leading-relaxed opacity-55">{t(module.detailDa, module.detailEn)}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <SharedProjects t={t} variant="lab" />
      <SharedContact t={t} variant="lab" />
    </main>
  )
}
