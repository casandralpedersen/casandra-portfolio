import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { LINKEDIN, EMAIL, aboutIntro, aboutBlocks, renderEmphasised, quoteFont } from '../../data/aboutContent'

const ease = [0.22, 1, 0.36, 1]

function Block({ block, t, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })
  const text = t(block.da, block.en)

  if (block.type === 'quote-emphasis') {
    return (
      <section className="my-4 px-8 md:px-16 py-16 bg-[var(--color-burgundy)] text-[var(--color-base)]">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0, transition: { ease, duration: 0.8 } } : {}}
          className="max-w-4xl mx-auto text-center leading-tight"
          style={{ fontFamily: quoteFont(text), fontWeight: 700, fontSize: 'clamp(24px, 4vw, 46px)' }}
        >
          {renderEmphasised(text, '#F2C8B4')}
        </motion.p>
      </section>
    )
  }

  if (block.type === 'quote') {
    return (
      <motion.h3
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0, transition: { ease, duration: 0.8 } } : {}}
        className="px-8 md:px-16 my-20 text-center max-w-4xl mx-auto leading-[1.05]"
        style={{ fontFamily: quoteFont(text), fontSize: 'clamp(34px, 6vw, 72px)', color: 'var(--color-burgundy)' }}
      >
        {renderEmphasised(text)}
      </motion.h3>
    )
  }

  if (block.type === 'small') {
    return (
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0, transition: { ease, duration: 0.6 } } : {}}
        className="px-8 md:px-16 my-14 max-w-2xl mx-auto text-center text-[14px] tracking-wide uppercase opacity-50"
      >
        {text}
      </motion.p>
    )
  }

  const side = index % 2 === 0
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0, transition: { ease, duration: 0.7 } } : {}}
      className={`px-8 md:px-16 my-14 max-w-xl ${side ? 'mr-auto md:ml-[12%] text-left' : 'ml-auto md:mr-[12%] text-right'}`}
    >
      <span className="block text-[12px] tracking-[0.25em] uppercase opacity-40 mb-3">{String(index + 1).padStart(2, '0')}</span>
      <p className="text-[18px] md:text-[20px] leading-relaxed text-[var(--color-text)]/85">{text}</p>
    </motion.div>
  )
}

export default function LayoutSpotlight() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-[var(--color-base)] pb-32 overflow-hidden">
      {/* intro + cta */}
      <section className="px-8 md:px-16 pt-24 pb-16 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0, transition: { ease, duration: 0.8 } }}
          viewport={{ once: true }}
          className="text-[22px] md:text-[28px] leading-snug"
        >
          {t(aboutIntro.da, aboutIntro.en)}
        </motion.p>
      </section>

      {/* content */}
      <section>
        {aboutBlocks.map((block, i) => (
          <Block key={i} block={block} t={t} index={i} />
        ))}
      </section>

      {/* Contact */}
      <section className="px-8 md:px-16 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0, transition: { ease, duration: 0.6 } }}
          viewport={{ once: true }}
          className="flex gap-3 flex-wrap"
        >
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-[var(--color-burgundy)] text-[var(--color-base)] text-[13px] tracking-wide hover:opacity-80 transition-opacity">
            LinkedIn
          </a>
          <a href={`mailto:${EMAIL}`} className="px-5 py-2.5 border border-[var(--color-text)]/30 text-[13px] tracking-wide hover:border-[var(--color-text)]/60 transition-colors">
            {t('Send en mail', 'Send an email')}
          </a>
          <Link to="/cv" className="px-5 py-2.5 border border-[var(--color-text)]/30 text-[13px] tracking-wide hover:border-[var(--color-text)]/60 transition-colors">
            CV
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
