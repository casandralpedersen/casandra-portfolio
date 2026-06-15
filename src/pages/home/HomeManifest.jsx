import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { ease } from './homeContent'
import { SharedContact, SharedProjects } from './HomeShared'

export default function HomeManifest() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="bg-[var(--color-base)]">
      <section className="relative flex min-h-[calc(100svh-64px)] flex-col items-center justify-center px-6 text-center sm:px-10">
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease, duration: 0.6 }}
          className="mb-6 text-[11px] uppercase tracking-[0.3em] opacity-50"
        >
          {t('Portfolio · København', 'Portfolio · Copenhagen')}
        </motion.p>

        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease, duration: 0.8, delay: 0.05 }}
          className="max-w-4xl text-[clamp(2.6rem,9vw,7rem)] font-bold leading-[0.98]"
        >
          {t('Design der løser noget. Ikke bare ser godt ud.', 'Design that solves something. Not just looks good.')}
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease, duration: 0.7, delay: 0.15 }}
          className="mt-8 max-w-md text-[1rem] leading-relaxed opacity-65"
        >
          {t(
            'UX, visuel identitet og forretningsforståelse i én pakke - baseret i København.',
            'UX, visual identity and business sense in one package - based in Copenhagen.'
          )}
        </motion.p>

        <motion.a
          href="#arbejde"
          aria-label={t('Rul til arbejde', 'Scroll to work')}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease, duration: 0.7, delay: 0.4 }}
          className="absolute bottom-8 hidden flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] opacity-45 transition-opacity hover:opacity-80 sm:flex"
        >
          {t('Udvalgt arbejde', 'Selected work')}
          <motion.span
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.a>
      </section>

      <SharedProjects t={t} variant="manifest" />
      <SharedContact t={t} variant="manifest" />
    </main>
  )
}
