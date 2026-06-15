import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { ease } from './homeContent'
import { SharedContact, SharedProjects } from './HomeShared'

export default function HomeWelcome() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="relative overflow-hidden bg-[var(--color-base)]">
      <section className="relative min-h-[calc(100svh-64px)] px-6 pt-10 pb-20 sm:px-10">
        <h1
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[42%] -rotate-3 text-center text-[clamp(5.5rem,28vw,22rem)] leading-none text-[var(--color-burgundy)]/[0.08]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Casandra
        </h1>

        <div className="relative z-10 grid gap-12 pt-6 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:pt-0">
          <div>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ ease, duration: 0.7 }}
              className="relative inline-block"
            >
              <p className="text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-script)' }}>
                {t('Velkommen til min portfolio', 'Welcome to my portfolio')}
              </p>
              <span aria-hidden="true" className="absolute -right-6 -top-4 text-2xl text-[var(--color-burgundy)]">✦</span>
            </motion.div>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease, duration: 0.7, delay: 0.1 }}
              className="mt-6 max-w-md text-[1rem] leading-relaxed opacity-70"
            >
              {t(
                'Jeg er Casandra - grafisk designer og UX\'er fra København. Her samler jeg projekter, der bygger bro mellem visuel identitet, brugeroplevelse og forretning.',
                "I'm Casandra - a graphic designer and UX-er from Copenhagen. Here I gather projects that bridge visual identity, user experience and business."
              )}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{ ease, duration: 0.7, delay: 0.2 }}
              className="mt-10 w-[180px] rounded-xl border border-[var(--color-text)]/25 bg-[#fffdf5] p-4 shadow-md"
            >
              <div className="flex items-center justify-between text-sm text-[var(--color-burgundy)]">
                <span>C</span>
                <span aria-hidden="true">♥</span>
              </div>
              <p className="mt-8 text-center text-lg" style={{ fontFamily: 'var(--font-script)' }}>
                {t('Designer af hjertet', 'Designer at heart')}
              </p>
              <div className="mt-8 flex items-center justify-between rotate-180 text-sm text-[var(--color-burgundy)]">
                <span>C</span>
                <span aria-hidden="true">♥</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ ease, duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-[260px] bg-[#fffdf5] p-3 pb-4 shadow-xl sm:w-[320px]"
          >
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-[-3deg] bg-[var(--color-blue)]/30 backdrop-blur-[1px]"
            />
            <img src="/images/mefinalpic.png" alt="Casandra" className="aspect-[4/5] w-full object-cover" />
            <p className="mt-3 -rotate-1 text-center text-base" style={{ fontFamily: 'var(--font-script)' }}>
              {t('København', 'Copenhagen')}
            </p>
            <span aria-hidden="true" className="absolute -right-4 -top-5 text-4xl text-[var(--color-burgundy)]">★</span>
          </motion.div>
        </div>
      </section>

      <SharedProjects t={t} variant="welcome" />
      <SharedContact t={t} variant="welcome" />
    </main>
  )
}
