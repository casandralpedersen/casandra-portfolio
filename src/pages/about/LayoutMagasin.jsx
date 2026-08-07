import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { LINKEDIN, EMAIL, ABOUT_PHOTO, aboutLabel, aboutIntro, aboutBlocks, renderEmphasised, quoteFont } from '../../data/aboutContent'

const ease = [0.22, 1, 0.36, 1]

function Reveal({ children, className, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0, transition: { ease, duration: 0.7 } } : {}}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function VennFigure({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0, transition: { ease, duration: 0.7 } } : {}}
      className="md:float-right md:ml-10 mb-6 mx-auto md:mx-0 w-full max-w-[260px]"
    >
      <div className="relative aspect-square border border-[var(--color-text)]/25 bg-[#FFFDF5] p-8">
        <div className="relative w-full h-full">
          <div
            className="absolute w-[62%] h-[62%] rounded-full -top-[4%] left-0 mix-blend-multiply"
            style={{ background: 'rgba(145,60,39,0.24)' }}
          />
          <div
            className="absolute w-[62%] h-[62%] rounded-full -top-[4%] right-0 mix-blend-multiply"
            style={{ background: 'rgba(90,134,171,0.26)' }}
          />
          <div
            className="absolute w-[62%] h-[62%] rounded-full bottom-0 left-1/2 -translate-x-1/2 mix-blend-multiply"
            style={{ background: 'rgba(201,162,75,0.32)' }}
          />
          <span className="absolute top-2 left-1 inline-flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase" style={{ color: 'var(--color-burgundy)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-burgundy)' }} />
            {t('Kommunikation', 'Communication')}
          </span>
          <span className="absolute top-2 right-1 inline-flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase" style={{ color: '#5A86AB' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: '#5A86AB' }} />
            {t('Design', 'Design')}
          </span>
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase" style={{ color: '#A9802E' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: '#C9A24B' }} />
            {t('Teknologi', 'Technology')}
          </span>
        </div>
      </div>
      <figcaption className="mt-2 text-[11px] tracking-wide uppercase opacity-40 flex justify-between">
        <span>{t('Fig. 2', 'Fig. 2')}</span>
        <span>{t('Mit venndiagram', 'My venn diagram')}</span>
      </figcaption>
    </motion.figure>
  )
}

function Block({ block, t, dropcap }) {
  const text = t(block.da, block.en)

  if (block.type === 'quote' || block.type === 'quote-emphasis') {
    const isEmphasis = block.type === 'quote-emphasis'
    return (
      <Reveal className="my-14 md:-mx-16 text-center">
        <span className="block text-[40px] leading-none mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-burgundy)' }}>
          &ldquo;
        </span>
        <p
          className="leading-snug mx-auto max-w-2xl"
          style={
            isEmphasis
              ? { fontFamily: quoteFont(text), fontWeight: 700, fontSize: 'clamp(21px, 2.8vw, 30px)', color: 'var(--color-text)' }
              : { fontFamily: quoteFont(text), fontSize: 'clamp(24px, 3.4vw, 40px)', color: 'var(--color-burgundy)' }
          }
        >
          {renderEmphasised(text)}
        </p>
      </Reveal>
    )
  }

  if (block.type === 'small') {
    return (
      <Reveal className="my-10">
        <p className="text-[13px] tracking-wide leading-relaxed opacity-50 italic border-l-2 border-[var(--color-burgundy)]/30 pl-4">
          {text}
        </p>
      </Reveal>
    )
  }

  return (
    <Reveal className="my-6">
      <p className="text-[16px] md:text-[17px] leading-[1.75] text-[var(--color-text)]/85">
        {dropcap ? (
          <>
            <span
              className="float-left mr-3 mt-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-burgundy)', fontSize: '72px', lineHeight: '0.7' }}
            >
              {text.charAt(0)}
            </span>
            {text.slice(1)}
          </>
        ) : (
          text
        )}
      </p>
    </Reveal>
  )
}

export default function LayoutMagasin() {
  const { t } = useLanguage()
  const firstText = aboutBlocks.findIndex((b) => b.type === 'text')

  return (
    <main className="min-h-screen pb-32">
      {/* Masthead */}
      <div className="texture px-8 md:px-16 pt-12">
        <div className="flex items-baseline justify-between border-b-2 border-[var(--color-text)] pb-3">
          <span className="text-[11px] tracking-[0.3em] uppercase font-semibold">{t('Om mig', 'About')}</span>
          <span className="text-[11px] tracking-[0.3em] uppercase opacity-50">Nr. 01 · 2025</span>
        </div>
        <div className="flex items-baseline justify-between border-b border-[var(--color-text)]/30 py-2 text-[10px] tracking-[0.25em] uppercase opacity-40">
          <span>{t(aboutLabel.da, aboutLabel.en)}</span>
          <span>København</span>
        </div>
      </div>

      {/* Hero feature */}
      <section className="px-8 md:px-16 pt-12 grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-start">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6 } }}
            className="text-[13px] tracking-[0.2em] uppercase opacity-50"
          >
            {t('Portræt', 'Portrait')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.9, delay: 0.1 } }}
            className="mt-3 leading-[0.95]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 88px)' }}
          >
            Casandra
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.8, delay: 0.25 } }}
            className="mt-6 text-[18px] md:text-[21px] leading-relaxed max-w-md text-[var(--color-text)]/90"
          >
            {t(aboutIntro.da, aboutIntro.en)}
          </motion.p>

          {firstText >= 0 && (
            <div className="mt-8">
              <Block block={aboutBlocks[firstText]} t={t} dropcap />
            </div>
          )}
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.9, delay: 0.2 } }}
          className="md:sticky md:top-12"
        >
          <div className="border border-[var(--color-text)]/25 p-2 bg-[#FFFDF5]">
            <img src={ABOUT_PHOTO} alt="Casandra" className="w-full object-cover" style={{ height: 420 }} />
          </div>
          <figcaption className="mt-2 text-[11px] tracking-wide uppercase opacity-40 flex justify-between">
            <span>{t('Fig. 1', 'Fig. 1')}</span>
            <span>{t('Designer & generalist', 'Designer & generalist')}</span>
          </figcaption>
        </motion.figure>
      </section>

      {/* Article body */}
      <section className="px-8 md:px-16 mt-16">
        <div className="max-w-2xl mx-auto">
          {aboutBlocks.map((block, i) => (
            i === firstText ? null : (
              <div key={i}>
                {i === 2 && <VennFigure t={t} />}
                <Block block={block} t={t} />
              </div>
            )
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-8 md:px-16 mt-20">
        <div className="max-w-2xl mx-auto border-t border-[var(--color-text)]/20 pt-10 flex gap-3 flex-wrap">
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-[var(--color-burgundy)] text-[var(--color-base)] text-[13px] tracking-wide hover:opacity-80 transition-opacity">
            LinkedIn
          </a>
          <a href={`mailto:${EMAIL}`} className="px-5 py-2.5 border border-[var(--color-text)]/30 text-[13px] tracking-wide hover:border-[var(--color-text)]/60 transition-colors">
            {t('Send en mail', 'Send an email')}
          </a>
          <Link to="/cv" className="px-5 py-2.5 border border-[var(--color-text)]/30 text-[13px] tracking-wide hover:border-[var(--color-text)]/60 transition-colors">
            CV
          </Link>
        </div>
      </section>
    </main>
  )
}
