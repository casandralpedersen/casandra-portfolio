import { useLayoutEffect } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { HOME_PILLARS, ease } from './homeContent'
import { SharedContact, SharedProjects } from './HomeShared'

export default function HomeCinema() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const portraitY = useTransform(scrollYProgress, [0, 0.32], [0, 90])
  const titleY = useTransform(scrollYProgress, [0, 0.32], [0, -55])

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
    <main className="overflow-hidden bg-[#163d55] text-[var(--color-base)]">
      <section data-cinema-scene className="relative min-h-[calc(100svh-64px)] overflow-hidden px-5 py-10 sm:px-10 lg:px-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(145,60,39,.85),transparent_38%),linear-gradient(145deg,#163d55_0%,#295c7d_62%,#913c27_100%)]" />
        <motion.div
          data-cinema-portrait
          style={{ y: shouldReduceMotion ? 0 : portraitY }}
          className="absolute inset-y-0 right-[-18%] w-[105%] opacity-70 sm:right-[-5%] sm:w-[72%]"
        >
          <img src="/images/mefinalpic.png" alt="Casandra" className="h-full w-full object-contain object-bottom" />
        </motion.div>

        <motion.div
          data-cinema-title
          style={{ y: shouldReduceMotion ? 0 : titleY }}
          className="relative z-10 mx-auto flex min-h-[calc(100svh-150px)] max-w-[1500px] flex-col justify-between"
        >
          <div className="flex justify-between gap-5 border-b border-[var(--color-base)]/25 pb-4 text-[10px] uppercase tracking-[0.2em] opacity-65">
            <span>{t('Åbningsscene', 'Opening scene')}</span>
            <span>01 / 03</span>
          </div>
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.2em] opacity-65">Casandra Pedersen / Portfolio</p>
            <h1
              className="max-w-[9ch] text-[clamp(4.5rem,12vw,13rem)] leading-[0.76]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('Portfolio med mere puls', 'A portfolio with more pulse')}
            </h1>
          </div>
        </motion.div>
      </section>

      <section data-cinema-scene className="relative bg-[var(--color-burgundy)] px-5 py-24 sm:px-10 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1450px]">
          <header className="mb-12 flex items-end justify-between gap-8 border-b border-[var(--color-base)]/25 pb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-65">{t('Anden scene', 'Second scene')} / 02</p>
              <h2 className="mt-4 max-w-[10ch] text-[clamp(3.5rem,8vw,9rem)] leading-[0.82]" style={{ fontFamily: 'var(--font-display)' }}>
                {t('Tre kræfter i samme fortælling', 'Three forces in one story')}
              </h2>
            </div>
            <Link to="/om" className="hidden border-b border-[var(--color-base)]/40 pb-1 text-[10px] uppercase tracking-[0.16em] md:block">
              {t('Læs hele historien', 'Read the full story')} →
            </Link>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            {HOME_PILLARS.map((pillar, index) => (
              <motion.article
                data-cinema-frame
                key={pillar.da}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ ease, duration: shouldReduceMotion ? 0 : 0.75, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                className="flex min-h-[330px] flex-col justify-between rounded-[28px] border border-[var(--color-base)]/20 bg-[var(--color-base)]/8 p-7 backdrop-blur-[2px]"
              >
                <div className="flex justify-between text-[10px] uppercase tracking-[0.18em] opacity-55">
                  <span>Frame 0{index + 1}</span>
                  <span style={{ color: pillar.color }}>●</span>
                </div>
                <h3 className="text-[clamp(3rem,5vw,5.5rem)] leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                  {t(pillar.da, pillar.en)}
                </h3>
              </motion.article>
            ))}
          </div>
          <Link to="/om" className="mt-10 inline-block border-b border-[var(--color-base)]/40 pb-1 text-[10px] uppercase tracking-[0.16em] md:hidden">
            {t('Læs hele historien', 'Read the full story')} →
          </Link>
        </div>
      </section>

      <section data-cinema-scene className="bg-[var(--color-base)] py-16 text-[var(--color-text)] sm:py-24">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-14">
          <div className="flex items-end justify-between gap-6 border-b border-[var(--color-text)]/20 pb-5 text-[10px] uppercase tracking-[0.18em] opacity-55">
            <span>{t('Tredje scene', 'Third scene')} / 03</span>
            <span>{t('Udvalgte projekter', 'Selected projects')}</span>
          </div>
        </div>
        <SharedProjects t={t} variant="cinema" />
      </section>

      <SharedContact t={t} variant="cinema" />
    </main>
  )
}
