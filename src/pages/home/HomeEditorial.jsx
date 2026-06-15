import { useLayoutEffect } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { HOME_PILLARS, ease } from './homeContent'
import { SharedContact, SharedProjects } from './HomeShared'

const editorialWords = ['Design', 'med', 'forretningsinstinkt']

const pillarDescriptions = {
  Design: {
    da: 'Identiteter, interfaces og fortællinger, der gør komplekse valg intuitive.',
    en: 'Identities, interfaces and stories that make complex choices intuitive.',
  },
  Forretning: {
    da: 'Retning, drift og prioritering med blik for både mennesker og resultater.',
    en: 'Direction, operations and priorities with an eye for people and results.',
  },
  Teknologi: {
    da: 'Digitale muligheder omsat til løsninger, der kan bruges i virkeligheden.',
    en: 'Digital possibilities turned into solutions that work in the real world.',
  },
}

export default function HomeEditorial() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const portraitY = useTransform(scrollYProgress, [0, 0.45], [0, 64])
  const folioY = useTransform(scrollYProgress, [0, 0.6], [0, -28])

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
    <main className="overflow-hidden bg-[var(--color-base)]">
      <section className="texture relative mx-auto grid min-h-[calc(100svh-64px)] max-w-[1600px] px-5 pb-10 pt-8 sm:px-8 lg:grid-cols-[1.35fr_0.65fr] lg:px-12 lg:pb-14">
        <div className="relative z-10 flex min-h-[60svh] flex-col justify-between border-y border-[var(--color-text)]/20 py-7 lg:min-h-0 lg:py-9">
          <div className="flex justify-between gap-5 pr-3 text-[10px] uppercase tracking-[0.2em] opacity-50">
            <span>Casandra Pedersen</span>
            <span>{t('København - Portfolio', 'Copenhagen - Portfolio')}</span>
          </div>

          <h1
            aria-label={t('Design med forretningsinstinkt', 'Design with business instinct')}
            className="my-12 max-w-[9ch] uppercase text-[clamp(3.7rem,10vw,10.5rem)] leading-[0.78] text-[var(--color-burgundy)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {editorialWords.map((word, index) => (
              <motion.span
                key={word}
                data-editorial-word
                aria-hidden="true"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 42 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease, duration: 0.85, delay: shouldReduceMotion ? 0 : 0.08 + index * 0.12 }}
                className={`block ${
                  index === 1
                    ? 'ml-[18%] text-[0.48em] italic text-[var(--color-blue)]'
                    : index === 2
                      ? 'text-[0.5em] tracking-[-0.035em] sm:text-[0.62em]'
                      : ''
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <div className="grid gap-6 pr-3 text-xs leading-relaxed sm:grid-cols-[1fr_1fr]">
            <p className="max-w-[34ch] opacity-65">
              {t(
                'Jeg forbinder design, forretning og teknologi med mennesker i centrum.',
                'I connect design, business and technology with people at the centre.',
              )}
            </p>
            <Link to="/om" className="self-end border-b border-[var(--color-text)]/30 pb-2 uppercase tracking-[0.15em] opacity-65 transition-opacity hover:opacity-100">
              {t('Læs hele historien', 'Read the full story')} →
            </Link>
          </div>
        </div>

        <motion.div
          data-editorial-portrait
          style={{ y: shouldReduceMotion ? 0 : portraitY }}
          className="relative min-h-[420px] border-b border-[var(--color-text)]/20 lg:min-h-0 lg:border-l lg:border-t"
        >
          <div className="absolute inset-x-5 top-7 flex justify-between text-[10px] uppercase tracking-[0.2em] opacity-45 lg:inset-x-7">
            <span>{t('Profil', 'Profile')}</span>
            <span>01 / 05</span>
          </div>
          <img
            src="/images/mefinalpic.png"
            alt="Casandra"
            className="absolute inset-0 h-full w-full object-contain object-bottom"
          />
        </motion.div>
      </section>

      <section aria-labelledby="editorial-pillars-title" className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-8 border-b border-[var(--color-text)]/20 pb-10 md:grid-cols-[0.65fr_1.35fr]">
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">{t('Tre perspektiver', 'Three perspectives')}</p>
          <motion.h2
            id="editorial-pillars-title"
            style={{ y: shouldReduceMotion ? 0 : folioY, fontFamily: 'var(--font-display)' }}
            className="max-w-[12ch] text-[clamp(3.2rem,7vw,7.5rem)] leading-[0.86]"
          >
            {t('Ét blik på hele opgaven', 'One view of the whole brief')}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3">
          {HOME_PILLARS.map((pillar, index) => (
            <motion.article
              data-editorial-feature
              key={pillar.da}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ ease, duration: 0.65, delay: shouldReduceMotion ? 0 : index * 0.08 }}
              className="border-b border-[var(--color-text)]/20 py-8 md:border-r md:px-7 md:last:border-r-0"
            >
              <span className="text-[10px] uppercase tracking-[0.18em] opacity-40">0{index + 1}</span>
              <h3
                className="mt-14 text-[clamp(2.6rem,4.5vw,5rem)] leading-none"
                style={{ fontFamily: 'var(--font-display)', color: pillar.color }}
              >
                {t(pillar.da, pillar.en)}
              </h3>
              <p className="mt-5 max-w-[30ch] text-xs leading-relaxed opacity-60">
                {t(pillarDescriptions[pillar.da].da, pillarDescriptions[pillar.da].en)}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <SharedProjects t={t} variant="editorial" />
      <SharedContact t={t} variant="editorial" />
    </main>
  )
}
