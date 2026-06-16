import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { LINKEDIN, EMAIL, ABOUT_PHOTO, aboutLabel, aboutIntro, aboutBlocks, renderEmphasised, quoteFont } from '../../data/aboutContent'

const ease = [0.22, 1, 0.36, 1]
const BURGUNDY = '#913C27'
const BLUE = '#5A86AB'

const PILL_NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E\")"

const SKILLS = [
  { da: 'grafisk design', en: 'graphic design', pos: 'top-[10%] left-[46%]', rotate: -5, delay: 0 },
  { da: 'ux design', en: 'ux design', pos: 'top-[20%] right-[10%]', rotate: 4, delay: 0.05 },
  { da: 'branding', en: 'branding', pos: 'top-[47%] right-[5%]', rotate: -3, delay: 0.1 },
  { da: 'vibe coding', en: 'vibe coding', pos: 'bottom-[15%] right-[24%]', rotate: 5, delay: 0.15 },
  { da: 'art direction', en: 'art direction', pos: 'bottom-[19%] left-[44%]', rotate: -3, delay: 0.2 },
  { da: 'frontend', en: 'frontend', pos: 'top-[42%] left-[11%]', rotate: 4, delay: 0.25 },
]

function SkillPill({ label, pos, rotate, delay }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7, y: 8, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate, transition: { ease, duration: 0.4, delay } }}
      exit={{ opacity: 0, scale: 0.7, y: 6, transition: { ease, duration: 0.2 } }}
      className={`absolute z-30 overflow-hidden px-4 py-1.5 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap shadow-sm ${pos}`}
      style={{ background: '#FBF8EC', border: '1.5px solid var(--color-burgundy)', color: 'var(--color-burgundy)' }}
    >
      <span className="relative z-10">{label}</span>
      <span
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: PILL_NOISE, opacity: 0.14, mixBlendMode: 'multiply' }}
      />
    </motion.span>
  )
}

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

function Chip({ label, color, className, delay = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { ease, duration: 0.6, delay } }}
      className={`absolute px-4 py-1.5 rounded-full text-[13px] font-medium shadow-md ${className}`}
    >
      <span style={{ color }}>● </span>
      {label}
    </motion.span>
  )
}

function ThoughtBubble({ label, className }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 6 }}
        transition={{ ease, duration: 0.3 }}
        className="relative"
      >
        <span
          className="relative inline-flex items-center px-5 py-1.5 rounded-full shadow-md bg-[var(--color-burgundy)] text-[var(--color-base)] whitespace-nowrap"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 38px)' }}
        >
          {label}
        </span>
        <span className="absolute -bottom-3 left-9 w-4 h-4 rounded-full bg-[var(--color-burgundy)] shadow-sm" />
        <span className="absolute -bottom-7 left-5 w-2.5 h-2.5 rounded-full bg-[var(--color-burgundy)] shadow-sm" />
      </motion.div>
    </div>
  )
}

function Note({ block, t, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  const text = t(block.da, block.en)
  const rotate = index % 2 === 0 ? -1.4 : 1.6
  const align = index % 2 === 0 ? 'mr-auto md:ml-[10%]' : 'ml-auto md:mr-[10%]'

  if (block.type === 'quote') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0, transition: { ease, duration: 0.7 } } : {}}
        className="relative max-w-xl mx-auto text-center my-4"
      >
        <Star className="-top-6 -left-2" size={30} />
        <p className="leading-snug inline" style={{ fontFamily: quoteFont(text), fontWeight: 700, fontSize: 'clamp(22px, 3vw, 34px)', color: BURGUNDY }}>
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
        className="relative max-w-lg mx-auto my-4 bg-[var(--color-text)] text-[var(--color-base)] p-6 shadow-xl"
      >
        <Tape className="-top-3 right-6" color="rgba(247,242,213,0.3)" rotate={6} />
        <p className="leading-snug" style={{ fontFamily: quoteFont(text), fontWeight: 700, fontSize: 'clamp(19px, 2.4vw, 26px)' }}>
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
      className={`relative max-w-sm bg-[#FFFDF5] border border-[var(--color-burgundy)]/15 shadow-md p-5 ${align}`}
    >
      <Tape className={index % 2 === 0 ? '-top-3 left-5' : '-top-3 right-5'} rotate={index % 2 === 0 ? -5 : 5} w={70} />
      {block.noteTitle && (() => {
        const title = t(block.noteTitle.da, block.noteTitle.en)
        return (
          <p className="mb-2.5 leading-tight" style={{ fontFamily: quoteFont(title), fontSize: 'clamp(22px, 2.4vw, 28px)', color: 'var(--color-text)' }}>
            <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.45em', color: BURGUNDY, lineHeight: 1 }}>{title.charAt(0)}</span>
            {renderEmphasised(title.slice(1))}
          </p>
        )
      })()}
      <p className="text-[15px] leading-relaxed text-[var(--color-text)]/85">{text}</p>
    </motion.div>
  )
}

export default function LayoutScrapbook() {
  const { t } = useLanguage()
  const [photoHover, setPhotoHover] = useState(false)

  return (
    <main className="min-h-screen bg-[var(--color-base)] overflow-hidden pb-32">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="handdrawn-red" x="-15%" y="-15%" width="130%" height="130%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="thick" />
          <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="thick" in2="noise" scale="14" result="wobbly" />
          <feFlood floodColor="#913C27" result="red" />
          <feComposite in="red" in2="wobbly" operator="in" result="stroke" />
          <feMerge>
            <feMergeNode in="stroke" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      {/* Venn hero */}
      <section className="texture relative h-[88vh] min-h-[600px] flex items-center justify-center">
        {/* venn circles */}
        <motion.div
          className="absolute w-[42vmin] h-[42vmin] rounded-full"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-full h-full rounded-full -translate-x-[28%] mix-blend-multiply" style={{ background: 'rgba(145,60,39,0.16)' }} />
        </motion.div>
        <motion.div
          className="absolute w-[42vmin] h-[42vmin] rounded-full"
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <div className="w-full h-full rounded-full translate-x-[28%] mix-blend-multiply" style={{ background: 'rgba(90,134,171,0.18)' }} />
        </motion.div>
        <motion.div
          className="absolute w-[42vmin] h-[42vmin] rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        >
          <div className="w-full h-full rounded-full translate-y-[30%] mix-blend-multiply" style={{ background: 'rgba(201,162,75,0.22)' }} />
        </motion.div>

        {/* photo */}
        <div style={{ transform: 'translateX(14%)' }} className="relative z-10 drop-shadow-2xl">
          <motion.img
            src={ABOUT_PHOTO}
            alt="Casandra"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1, transition: { ease, duration: 1 } }}
            onMouseEnter={() => setPhotoHover(true)}
            onMouseLeave={() => setPhotoHover(false)}
            className="h-[58vmin] max-h-[520px] object-contain"
            style={{ filter: 'url(#handdrawn-red)' }}
          />
        </div>

        {/* floating chips */}
        <Chip label={t('Kommunikation', 'Communication')} color="#913C27" className="top-[24%] left-[24%] bg-[#FFFDF5]" delay={0.3} />
        <Chip label={t('Design', 'Design')} color="#5A86AB" className="top-[36%] right-[20%] bg-[#FFFDF5]" delay={0.45} />
        <Chip label={t('Teknologi', 'Technology')} color="#C9A24B" className="bottom-[28%] left-[26%] bg-[#FFFDF5]" delay={0.6} />
        <AnimatePresence>
          {photoHover && (
            <ThoughtBubble key="malgruppen" label={t('Målgruppe', 'Audience')} className="top-[58%] left-[64%] -translate-x-1/2 -translate-y-1/2 z-30" />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {photoHover &&
            SKILLS.map((s) => (
              <SkillPill key={s.en} label={t(s.da, s.en)} pos={s.pos} rotate={s.rotate} delay={s.delay} />
            ))}
        </AnimatePresence>

        {/* name + label */}
        <div className="absolute top-10 left-8 md:left-16 z-20">
          <p className="text-[11px] tracking-[0.2em] uppercase opacity-50">{t(aboutLabel.da, aboutLabel.en)}</p>
        </div>
      </section>

      {/* Hero collage */}
      <section className="texture relative px-8 md:px-16 pt-16 pb-12 min-h-[520px]">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.6 } }}
          className="text-[11px] tracking-[0.16em] uppercase opacity-50"
        >
          {t(aboutLabel.da, aboutLabel.en)}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.8, delay: 0.1 } }}
          className="mt-2 leading-[1.05] max-w-2xl"
          style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(38px, 6vw, 76px)', color: BURGUNDY }}
        >
          <em>Hi</em>, jeg er Casandra
        </motion.h1>

        <div className="relative mt-6 md:flex md:items-start md:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.7, delay: 0.2 } }}
            className="relative max-w-sm text-[17px] md:text-[19px] leading-relaxed bg-[#FFFDF5] p-5 shadow-md -rotate-1 z-10"
          >
            <Tape className="-top-3 left-8" rotate={-6} />
            <span className="relative">
              <span className="relative z-10">{t(aboutIntro.da, aboutIntro.en)}</span>
            </span>
            <Arrow className="-right-12 -bottom-8 hidden md:block" />
          </motion.p>

          <div className="relative hidden md:block flex-1 h-[360px]">
            <Photo src={ABOUT_PHOTO} rotate={4} className="absolute left-8 top-0 z-20" w={230} h={280} />
            <Photo src="/images/sitwavemepic.png" rotate={-6} className="absolute right-0 top-24 z-10" w={200} h={250} tapeColor="rgba(90,134,171,0.25)" />
            <Star className="right-44 top-2" color={BLUE} size={34} />
            <Star className="-right-4 -bottom-2" size={22} />
          </div>
        </div>

        {/* mobile photo */}
        <div className="md:hidden mt-8 flex justify-center">
          <Photo src={ABOUT_PHOTO} rotate={3} w={220} h={270} />
        </div>
      </section>

      {/* Notes flow */}
      <section className="px-8 md:px-16 mt-6 space-y-12 relative">
        <Star className="left-10 top-20 hidden md:block" color={BLUE} size={20} />
        {aboutBlocks.map((block, i) => (
          <Note key={i} block={block} t={t} index={i} />
        ))}
      </section>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0, transition: { ease, duration: 0.6 } }}
        viewport={{ once: true }}
        className="px-8 md:px-16 mt-16 flex gap-3 flex-wrap"
      >
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-[var(--color-burgundy)] text-[var(--color-base)] text-[13px] tracking-wide hover:opacity-80 transition-opacity shadow-md -rotate-1">
          LinkedIn
        </a>
        <a href={`mailto:${EMAIL}`} className="px-5 py-2.5 bg-[#FFFDF5] border border-[var(--color-text)]/20 text-[13px] tracking-wide hover:border-[var(--color-text)]/50 transition-colors shadow-sm rotate-1">
          {t('Send en mail', 'Send an email')}
        </a>
        <Link to="/cv" className="px-5 py-2.5 bg-[#FFFDF5] border border-[var(--color-text)]/20 text-[13px] tracking-wide hover:border-[var(--color-text)]/50 transition-colors shadow-sm">
          CV
        </Link>
      </motion.div>
    </main>
  )
}
