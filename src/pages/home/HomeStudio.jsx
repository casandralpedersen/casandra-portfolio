import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { ease } from './homeContent'
import { SharedContact, SharedProjects } from './HomeShared'

const GALLERY_IMAGES = [
  { src: '/images/mefinalpic.png', alt: { da: 'Casandra', en: 'Casandra' } },
  { src: '/images/projects/o-bar.jpeg', alt: { da: 'Ø Bar', en: 'Ø Bar' } },
  { src: '/images/gallery/obar-event.jpg', alt: { da: 'Ø Bar - stemning', en: 'Ø Bar - atmosphere' } },
  { src: '/images/projects/etsy-composestudio.jpg', alt: { da: 'Etsy / CompozeStudio', en: 'Etsy / CompozeStudio' } },
  { src: '/images/gallery/paris.jpg', alt: { da: 'Bibliothèque, Paris', en: 'Bibliothèque, Paris' } },
  { src: '/images/projects/brodrene-vejen.jpeg', alt: { da: 'Brødrene Vejen', en: 'Brødrene Vejen' } },
]

function formatTime() {
  return new Date().toLocaleTimeString('da-DK', {
    timeZone: 'Europe/Copenhagen',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function useCopenhagenTime() {
  const [time, setTime] = useState(formatTime)

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

export default function HomeStudio() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const time = useCopenhagenTime()

  return (
    <main className="bg-[var(--color-base)]">
      <section className="flex min-h-[calc(100svh-64px)] flex-col px-6 pb-10 pt-6 sm:px-10">
        <div className="flex items-center justify-between border-b border-[var(--color-text)]/15 pb-4 text-[11px] uppercase tracking-[0.2em] opacity-50">
          <span>{time} · {t('København, DK', 'Copenhagen, DK')}</span>
          <span>{t('UX & grafisk design', 'UX & graphic design')}</span>
        </div>

        <div className="flex flex-1 items-center justify-center gap-6 sm:gap-12 lg:gap-20">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease, duration: 0.7 }}
            className="hidden text-right text-[11px] uppercase leading-snug tracking-[0.25em] opacity-50 sm:block"
          >
            {t('Design', 'Design')}<br />{t('& UX', '& UX')}
          </motion.span>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease, duration: 0.8 }}
            className="text-center text-[clamp(3.5rem,16vw,11rem)] leading-[0.92] text-[var(--color-burgundy)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Casandra
          </motion.h1>

          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease, duration: 0.7 }}
            className="hidden text-left text-[11px] uppercase leading-snug tracking-[0.25em] opacity-50 sm:block"
          >
            {t('Forretning', 'Business')}<br />{t('& strategi', '& strategy')}
          </motion.span>
        </div>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease, duration: 0.7, delay: 0.15 }}
          className="mx-auto max-w-xl text-center text-sm leading-relaxed opacity-65"
        >
          {t(
            'Grafisk designer og UX’er fra København - jeg forbinder visuel identitet, brugeroplevelse og forretning i ét greb.',
            'Graphic designer and UX-er from Copenhagen - I connect visual identity, user experience and business in one go.'
          )}
        </motion.p>
      </section>

      <section
        aria-label={t('Et udsnit af mit arbejde og min hverdag', 'A glimpse of my work and everyday life')}
        className="flex gap-4 overflow-x-auto px-6 pb-16 sm:px-10 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {GALLERY_IMAGES.map((image, index) => (
          <motion.div
            key={image.src}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ ease, duration: 0.6, delay: shouldReduceMotion ? 0 : index * 0.05 }}
            className="h-[220px] w-[280px] flex-shrink-0 overflow-hidden sm:h-[300px] sm:w-[380px]"
          >
            <img src={image.src} alt={t(image.alt.da, image.alt.en)} className="h-full w-full object-cover" />
          </motion.div>
        ))}
      </section>

      <SharedProjects t={t} variant="studio" />
      <SharedContact t={t} variant="studio" />
    </main>
  )
}
