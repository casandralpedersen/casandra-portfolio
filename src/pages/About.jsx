import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const LINKEDIN = 'https://www.linkedin.com/in/casandra-linde-pedersen'

export default function About() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-[var(--color-base)]">

      {/* Bio */}
      <section className="texture px-10 pt-20 pb-16 flex gap-16 items-start">
        <div className="flex-1 max-w-lg">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 } }}
            className="text-[11px] tracking-[0.16em] uppercase opacity-50 mb-8"
          >
            {t('En designer med forretningsforståelse', 'A designer with business insight')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7, delay: 0.1 } }}
            className="space-y-5 text-[16px] leading-relaxed"
          >
            <p>
              {t(
                'Jeg kom til design via forretning, ikke omvendt. Baggrunden er bred: grafisk design, fotografi, UX, visuel identitet og erfaring som COO. Det mærkes i arbejdet.',
                'I came to design through business, not the other way around. My background spans graphic design, photography, UX, visual identity, and experience as COO. It shows in the work.'
              )}
            </p>
            <p className="opacity-60 text-[15px]">
              {t(
                'Som 13-årig startede jeg en YouTube-kanal. Jeg brugte ligeså meget tid på statistik og thumbnails som på selve indholdet. Det var nok første tegn.',
                'At 13, I started a YouTube channel. I spent as much time on analytics and thumbnails as on the content itself. That was probably the first sign.'
              )}
            </p>
            <p className="opacity-60 text-[15px]">
              {t(
                'Studerer B-DDIT på ITU. ENTP. Taler dansk, engelsk og spansk.',
                'Currently studying B-DDIT at ITU. ENTP. Speaks Danish, English, and Spanish.'
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6, delay: 0.35 } }}
            className="mt-10 flex gap-3"
          >
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[var(--color-burgundy)] text-[var(--color-base)] text-[13px] tracking-wide hover:opacity-80 transition-opacity"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:casandralpedersen@gmail.com`}
              className="px-5 py-2.5 border border-[var(--color-text)]/20 text-[13px] tracking-wide hover:border-[var(--color-text)]/50 transition-colors"
            >
              {t('Send en mail', 'Send an email')}
            </a>
            <Link
              to="/cv"
              className="px-5 py-2.5 border border-[var(--color-text)]/20 text-[13px] tracking-wide hover:border-[var(--color-text)]/50 transition-colors"
            >
              CV
            </Link>
          </motion.div>
        </div>

        {/* Foto */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.8, delay: 0.15 } }}
          className="shrink-0 w-72 overflow-hidden"
        >
          <img
            src="/images/mefinalpic.png"
            alt="Casandra"
            className="w-full object-cover object-top"
            style={{ height: 400 }}
          />
        </motion.div>
      </section>
    </main>
  )
}
