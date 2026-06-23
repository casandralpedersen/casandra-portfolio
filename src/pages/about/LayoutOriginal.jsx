import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

const LINKEDIN = 'https://www.linkedin.com/in/casandra-linde-pedersen'

function emphasis(word) {
  return (
    <em className="not-italic" style={{ color: 'var(--color-burgundy)' }}>
      {word}
    </em>
  )
}

export default function LayoutOriginal() {
  const { t } = useLanguage()
  const moreRef = useRef(null)
  const moreInView = useInView(moreRef, { once: true, margin: '-100px' })

  return (
    <main className="min-h-screen">

      {/* Bio */}
      <section className="px-10 pt-20 pb-16 flex gap-16 items-start">
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
                'Mit venndiagram med kommunikation, design og teknologi - altid med målgruppen i centrum.',
                'My Venn diagram of communication, design and technology - always with the audience at the centre.'
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

      {/* Læs mere */}
      <section ref={moreRef} className="px-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={moreInView ? { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7 } } : {}}
          className="max-w-xl space-y-5 text-[15px] leading-relaxed opacity-75"
        >
          <p>
            {t(
              'Uanset om det er en hjemmeside, en kampagne eller et opslag, starter jeg med det samme spørgsmål: hvem taler vi til, og hvad skal de føle, forstå eller gøre?',
              "Whether it's a website, a campaign or a post, I start with the same question: who are we talking to, and what should they feel, understand or do?"
            )}
          </p>
          <p>
            {t(
              'Jeg arbejder med kommunikation, design og teknologi - og ser dem som tre ting der ikke giver mening uden hinanden.',
              "I work with communication, design and technology - and see them as three things that don't make sense without each other."
            )}
          </p>
          <p>
            {t(
              'Jeg har haft et arbejdsliv drevet af nysgerrighed og indre motivation, og det har fået mig i mange spændende retninger. Alt fra drift, rekruttering og marketing som COO, til at bygge visuel identitet fra bunden og arbejde med IT-support og kundeservice. Det mix, parallelt med relevante studier, gør at jeg har fået forståelse for hvordan ting hænger sammen i teori og praksis.',
              "I've had a working life driven by curiosity and inner motivation, and it's taken me in many interesting directions. Everything from operations, recruitment and marketing as a COO, to building a visual identity from scratch and working in IT support and customer service. That mix, alongside relevant studies, has given me an understanding of how things fit together in theory and practice."
            )}
          </p>
          <p>
            {t(
              'Jeg brænder for målgrupper, UX og optimering. Hvordan tilpasses kommunikation og brugeroplevelse, så den virker - og gerne kan måles i statistik? Tilfredsstillende! Jeg har altid elsket statistik og systemer, og AI er et område jeg bruger meget tid på at dykke ned i lige nu.',
              "I'm passionate about target audiences, UX and optimisation. How do you tailor communication and user experience so it works - and can ideally be measured in numbers? Satisfying! I've always loved statistics and systems, and AI is something I'm spending a lot of time diving into right now."
            )}
          </p>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={moreInView ? { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7, delay: 0.15 } } : {}}
          className="max-w-xl mt-12 mb-5 leading-snug"
          style={{ fontFamily: 'VSOP, serif', fontSize: 'clamp(26px, 3.6vw, 42px)', color: 'var(--color-burgundy)' }}
        >
          {t(
            'Jeg ved, hvornår jeg er specialisten, og hvornår jeg skal spørge en.',
            "I know when I'm the specialist, and when to ask one."
          )}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={moreInView ? { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7, delay: 0.2 } } : {}}
          className="max-w-xl space-y-5 text-[15px] leading-relaxed opacity-75"
        >
          <p>
            {t(
              'Jeg elsker at lære fra mig, men er på samme måde ikke bange for at lære nyt eller stille dumme spørgsmål. Jeg tror på, at det mest selvstændige, proaktive arbejde forudsætter, at man er en teamplayer og kender sine styrker og svagheder.',
              "I love sharing what I know, but I'm just as unafraid to learn something new or ask a stupid question. I believe the most independent, proactive work depends on being a team player who knows their strengths and weaknesses."
            )}
          </p>
          <p>
            {t(
              <>Mit mål er, at folk ikke bare ser indholdet - men {emphasis('forstår')} det, {emphasis('stoler')} på det og {emphasis('handler')} på det.</>,
              <>My goal is that people don't just see the content - but {emphasis('understand')} it, {emphasis('trust')} it and {emphasis('act')} on it.</>
            )}
          </p>
          <p className="opacity-60 text-[15px]">
            {t(
              'Og så det formelle: jeg læser Digital Design og Interaktive Teknologier på ITU.',
              "And the formal part: I'm studying Digital Design and Interactive Technologies at ITU."
            )}
          </p>
        </motion.div>
      </section>
    </main>
  )
}
