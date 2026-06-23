import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { EMAIL, ABOUT_PHOTO, aboutLabel, aboutBlocks, renderEmphasised } from '../../data/aboutContent'

const ease = [0.22, 1, 0.36, 1]
const BURGUNDY = '#913C27'
const BLUE = '#5A86AB'
const GOLD = '#C9A24B'

const TRIO = [
  { src: '/images/portrait-design.png', label: { da: 'Design', en: 'Design' }, color: BLUE, rotate: -3, labelVenn: { x: 130, y: -290 }, nudgeX: 16 },
  { src: '/images/portrait-kommunikation.png', label: { da: 'Forretning', en: 'Business' }, color: BURGUNDY, rotate: 2, labelVenn: { x: 0, y: 80 } },
  { src: '/images/portrait-it.png', label: { da: 'Teknologi', en: 'Technology' }, color: GOLD, rotate: -2, labelVenn: { x: -130, y: -290 } },
]

// cirklerne sidder bag hvert portræt i hvile og glider ind til en venn-formation ved hover
const CIRCLES = [
  { color: 'rgba(90,134,171,0.55)', rest: { x: '-115%', y: '0%' }, venn: { x: '-40%', y: '-26%' }, delay: 0 },
  { color: 'rgba(145,60,39,0.5)', rest: { x: '0%', y: '0%' }, venn: { x: '0%', y: '34%' }, delay: 0.05 },
  { color: 'rgba(201,162,75,0.6)', rest: { x: '115%', y: '0%' }, venn: { x: '40%', y: '-26%' }, delay: 0.1 },
]

function Tape({ className, color = 'rgba(145,60,39,0.18)', rotate = 0, w = 90 }) {
  return (
    <span
      className={`absolute pointer-events-none ${className}`}
      style={{ width: w, height: 26, background: color, transform: `rotate(${rotate}deg)`, boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}
    />
  )
}

function Star({ className, color = BURGUNDY, size = 26 }) {
  return (
    <svg className={`absolute pointer-events-none ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 1c.3 5 1.7 7.5 6.5 8.8C13.7 11 12.3 13.6 12 18c-.3-4.4-1.7-7-6.5-8.2C10.3 8.5 11.7 6 12 1Z" fill={color} />
    </svg>
  )
}

function Arrow({ className, color = BLUE }) {
  return (
    <svg className={`absolute pointer-events-none ${className}`} width="64" height="48" viewBox="0 0 64 48" fill="none">
      <path d="M4 8c18-2 34 4 44 22" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M48 22l1 12M48 22l11-3" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function Squiggle({ color = BURGUNDY }) {
  return (
    <svg className="block mt-1" width="180" height="12" viewBox="0 0 180 12" fill="none" preserveAspectRatio="none">
      <path d="M2 7c20-8 40 8 60 0s40-8 60 0 40 6 56 1" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function Photo({ src, rotate, className = '', w = 220, h = 270, tapeColor }) {
  const position = className.includes('absolute') ? '' : 'relative'
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.04, rotate: 0, zIndex: 40, cursor: 'grabbing' }}
      initial={{ opacity: 0, scale: 0.92, rotate: 0 }}
      whileInView={{ opacity: 1, scale: 1, rotate, transition: { ease, duration: 0.7 } }}
      viewport={{ once: true }}
      className={`${position} bg-[#FFFDF5] p-3 pb-8 shadow-lg cursor-grab ${className}`}
      style={{ width: w }}
    >
      <Tape className="-top-3 left-1/2 -translate-x-1/2" color={tapeColor} rotate={-4} />
      <img src={src} alt="Casandra" className="w-full object-cover bg-[var(--color-base)]" style={{ height: h }} draggable={false} />
    </motion.div>
  )
}

function VennCircle({ color, rest, venn, delay, active }) {
  return (
    <motion.span
      className="absolute w-[34vmin] h-[34vmin] max-w-[240px] max-h-[240px] rounded-full mix-blend-multiply"
      style={{ background: color }}
      initial={false}
      animate={active ? { x: venn.x, y: venn.y, scale: 1.04, opacity: 1 } : { x: rest.x, y: rest.y, scale: 1, opacity: 0.62 }}
      transition={{ type: 'spring', stiffness: 80, damping: 15, delay: active ? delay : 0 }}
    />
  )
}

function Portrait({ src, label, color, rotate, delay, dimmed, labelVenn, onHover, onLeave, t, nudgeX = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0, transition: { ease, duration: 0.7, delay } }}
      viewport={{ once: true }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ cursor: 'default' }}
      className="relative flex flex-col items-center"
    >
      <motion.div animate={{ opacity: dimmed ? 0 : 1 }} transition={{ ease, duration: 0.4 }} className="flex flex-col items-center">
        <motion.img
          src={src}
          alt={t(label.da, label.en)}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay }}
          className="relative z-10 h-[40vmin] max-h-[360px] object-contain drop-shadow-xl"
          style={{ rotate: `${rotate}deg`, x: nudgeX }}
        />
      </motion.div>
      <motion.span
        animate={dimmed ? { x: labelVenn.x, y: labelVenn.y, scale: 1.05 } : { x: 0, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0 }}
        className="relative z-30 -mt-1 px-5 py-1.5 rounded-full bg-[#FFFDF5] shadow-md text-[14px] font-medium tracking-wide"
      >
        <span style={{ color }}>● </span>
        {t(label.da, label.en)}
      </motion.span>
    </motion.div>
  )
}

const NOTE_TITLE_FONT = '"ITCGaramond", serif'

const NOTE_POS = {
  0: 'mr-auto md:ml-[12%]',
  1: 'ml-auto md:mr-[10%]',
  3: 'ml-auto md:mr-[16%]',
  4: 'mr-auto md:ml-[16%] md:-mt-20',
  5: 'mr-auto md:ml-[4%]',
}

function Note({ block, t, index, paired = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  const text = t(block.da, block.en)
  const rotate = index % 2 === 0 ? -1.4 : 1.6
  const isWide = index >= 3
  const defaultAlign = index % 2 === 0
    ? `mr-auto ${isWide ? 'md:ml-[8%]' : 'md:ml-[22%]'}`
    : `ml-auto ${isWide ? 'md:mr-[8%]' : 'md:mr-[22%]'}`
  const align = paired ? '' : (NOTE_POS[index] ?? defaultAlign)

  if (block.type === 'quote') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0, transition: { ease, duration: 0.7 } } : {}}
        className="relative max-w-xl mx-auto text-center my-44"
      >
        <Star className="-top-6 -left-2" size={30} />
        <p className="leading-snug inline" style={{ fontFamily: NOTE_TITLE_FONT, fontWeight: 700, fontSize: 'clamp(22px, 3vw, 34px)', color: BURGUNDY }}>
          {renderEmphasised(text)}
        </p>
        <div className="flex justify-center"><Squiggle /></div>
      </motion.div>
    )
  }

  if (block.type === 'quote-emphasis') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20, rotate: 0 }}
        animate={inView ? { opacity: 1, y: 0, rotate: -1, transition: { ease, duration: 0.7 } } : {}}
        className={`relative max-w-sm bg-[var(--color-text)] text-[var(--color-base)] p-6 shadow-xl ${paired ? '' : 'max-w-lg mx-auto my-16'}`}
      >
        <Tape className="-top-3 right-6" color="rgba(247,242,213,0.3)" rotate={6} />
        <p className="leading-snug" style={{ fontFamily: NOTE_TITLE_FONT, fontWeight: 700, fontSize: 'clamp(22px, 2.4vw, 28px)' }}>
          {renderEmphasised(text, '#E89A7A')}
        </p>
      </motion.div>
    )
  }

  if (block.type === 'small') {
    return (
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0, transition: { ease, duration: 0.6 } } : {}}
        className="max-w-2xl mx-auto text-center text-[14px] tracking-wide uppercase opacity-50 mt-12"
      >
        {text}
      </motion.p>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, rotate: 0 }}
      animate={inView ? { opacity: 1, y: 0, rotate, transition: { ease, duration: 0.7 } } : {}}
      className={`relative ${index === 1 ? 'max-w-lg' : index === 5 ? 'max-w-xl' : 'max-w-sm'} bg-[#FFFDF5] border border-[var(--color-burgundy)]/15 shadow-md ${index === 5 ? 'p-6 pb-10' : 'p-5'} ${align}`}
    >
      <Tape className={index % 2 === 0 ? '-top-3 left-5' : '-top-3 right-5'} rotate={index % 2 === 0 ? -5 : 5} w={70} />
      {block.noteTitle && (() => {
        const title = t(block.noteTitle.da, block.noteTitle.en)
        return (
          <p className="mb-2.5 leading-tight" style={{ fontFamily: NOTE_TITLE_FONT, fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 700, color: 'var(--color-text)' }}>
            {renderEmphasised(title)}
          </p>
        )
      })()}
      <p className="text-[15px] leading-relaxed text-[var(--color-text)]/85">{renderEmphasised(text)}</p>
    </motion.div>
  )
}

export default function LayoutScrapbook2() {
  const { t } = useLanguage()
  const [venn, setVenn] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden pb-32">
      {/* Trio hero */}
      <section className="texture relative px-8 md:px-16 pt-10 pb-8 min-h-[88vh] flex flex-col justify-center">
        <div className="text-center mb-8">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.6 } }}
            className="text-[11px] tracking-[0.2em] uppercase opacity-50"
          >
            {t(aboutLabel.da, aboutLabel.en)}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.8, delay: 0.1 } }}
            className="mt-4 mb-4 leading-[1.05] text-center"
            style={{ fontFamily: NOTE_TITLE_FONT, fontWeight: 700, fontSize: 'clamp(38px, 6vw, 76px)', color: BURGUNDY }}
          >
            {t('Jeg arbejder i krydsfeltet', 'I work at the intersection')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.7, delay: 0.2 } }}
            className="mt-4 max-w-xl mx-auto text-[16px] md:text-[18px] leading-relaxed text-[var(--color-text)]/80"
          >
            {t('Kommunikation, design og IT - altid med jeres målgruppen i centrum.', 'Communication, design and IT - always with your audience at the centre.')}
          </motion.p>
        </div>

        <div className="relative flex flex-col md:flex-row items-center md:items-end justify-center gap-10 md:gap-12 lg:gap-20">
          {/* venn circle layer */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            {CIRCLES.map((c, i) => (
              <VennCircle key={i} {...c} active={venn} />
            ))}
            <motion.span
              animate={{ opacity: venn ? 1 : 0 }}
              transition={{ ease, duration: 0.4, delay: venn ? 0.25 : 0 }}
              className="absolute z-10 px-4 py-1 rounded-full bg-[var(--color-burgundy)] text-[var(--color-base)] shadow-md whitespace-nowrap"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 1.8vw, 22px)' }}
            >
              {t('jeres målgruppe', 'your audience')}
            </motion.span>
          </div>

          {TRIO.map((p, i) => (
            <Portrait
              key={p.label.en}
              {...p}
              delay={i * 0.15}
              dimmed={venn}
              onHover={() => setVenn(true)}
              onLeave={() => setVenn(false)}
              t={t}
            />
          ))}
        </div>
      </section>

      {/* Hero collage + Notes */}
      <section className="texture relative px-8 md:px-16 pt-44 pb-0">
        <div className="relative md:pl-[6%]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { ease, duration: 0.8, delay: 0.1 } }}
            viewport={{ once: true }}
            className="leading-[1.05] md:whitespace-nowrap"
            style={{ fontFamily: NOTE_TITLE_FONT, fontWeight: 700, fontSize: 'clamp(32px, 4.6vw, 64px)', color: BURGUNDY }}
          >
            {t('Hvad du får med på holdet', 'What you bring to the team')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0, transition: { ease, duration: 0.7, delay: 0.2 } }}
            viewport={{ once: true }}
            className="mt-3 text-[15px] md:text-[17px] italic text-[var(--color-text)]/55"
          >
            {t('Lidt om din nysgerrige generalist', 'A little about your curious generalist')}
          </motion.p>

          {/* Photos — absolute right */}
          <div className="hidden md:block absolute right-0 top-0 w-[42%] h-[320px] pointer-events-none">
            <Photo src="/images/sitwavemepic.png" rotate={-3} className="absolute right-24 top-0 z-20 pointer-events-auto" w={210} h={260} tapeColor="rgba(90,134,171,0.25)" />
            <Star className="left-4 top-4" color={BLUE} size={30} />
          </div>

          {/* mobile photo */}
          <div className="md:hidden mt-6 flex justify-center">
            <Photo src={ABOUT_PHOTO} rotate={3} w={220} h={270} />
          </div>
        </div>
      </section>

      {/* Notes flow */}
      <section className="px-8 md:px-16 mt-24 space-y-8 relative">
        <Star className="left-10 top-20 hidden md:block" color={BLUE} size={20} />
        {aboutBlocks.map((block, i) => {
          if (i === 8) return null
          if (i === 7) {
            return (
              <div key={i} className="flex flex-col md:flex-row md:items-start md:justify-center gap-5 md:gap-20 md:mt-20">
                <Note block={aboutBlocks[7]} t={t} index={7} paired />
                <Note block={aboutBlocks[8]} t={t} index={8} paired />
              </div>
            )
          }
          if (i === 5) {
            return (
              <div key={i} className="flex flex-col md:flex-row items-start gap-8 md:gap-24 md:ml-[10%] md:mt-16">
                <Note block={block} t={t} index={i} paired />
                <div className="hidden md:block flex-shrink-0 self-center mt-6">
                  <Photo src={ABOUT_PHOTO} rotate={-4} w={195} h={245} tapeColor="rgba(145,60,39,0.18)" />
                </div>
              </div>
            )
          }
          return <Note key={i} block={block} t={t} index={i} />
        })}
      </section>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0, transition: { ease, duration: 0.6 } }}
        viewport={{ once: true }}
        className="mt-24 flex flex-col items-center"
      >
        <span className="block w-16 h-px bg-[var(--color-burgundy)]/40 mb-6" />
        <p className="text-[11px] tracking-[0.2em] uppercase opacity-50 mb-6">
          {t('Lad os tale sammen', "Let's talk")}
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link to="/arbejde" style={{ color: 'var(--color-base)' }} className="px-6 py-2.5 rounded-full bg-[var(--color-burgundy)] text-[13px] tracking-wide hover:opacity-85 transition-opacity shadow-sm">
            {t('Tjek mit arbejde ud', 'See my work')}
          </Link>
          <Link to="/cv" className="px-6 py-2.5 rounded-full border border-[var(--color-burgundy)]/40 text-[var(--color-burgundy)] text-[13px] tracking-wide hover:bg-[var(--color-burgundy)]/5 transition-colors">
            {t('Se mit CV', 'See my CV')}
          </Link>
          <a href={`mailto:${EMAIL}`} className="px-6 py-2.5 rounded-full border border-[var(--color-burgundy)]/40 text-[var(--color-burgundy)] text-[13px] tracking-wide hover:bg-[var(--color-burgundy)]/5 transition-colors">
            {t('Kontakt mig', 'Contact me')}
          </a>
        </div>
      </motion.div>
    </main>
  )
}
