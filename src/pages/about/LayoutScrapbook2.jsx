import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { LINKEDIN, EMAIL, ABOUT_PHOTO, aboutLabel, aboutIntro, aboutBlocks, renderEmphasised, quoteFont } from '../../data/aboutContent'

const ease = [0.22, 1, 0.36, 1]
const BURGUNDY = '#913C27'
const BLUE = '#5A86AB'
const GOLD = '#C9A24B'

const TRIO = [
  { src: '/images/portrait-design.png', label: { da: 'Design', en: 'Design' }, color: BLUE, rotate: -3, labelVenn: { x: 130, y: -30 } },
  { src: '/images/portrait-kommunikation.png', label: { da: 'Forretning', en: 'Business' }, color: BURGUNDY, rotate: 2, labelVenn: { x: 0, y: -40 } },
  { src: '/images/portrait-it.png', label: { da: 'Teknologi', en: 'Technology' }, color: GOLD, rotate: -2, labelVenn: { x: -130, y: -30 } },
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

function Portrait({ src, label, color, rotate, delay, dimmed, labelVenn, onHover, onLeave, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0, transition: { ease, duration: 0.7, delay } }}
      viewport={{ once: true }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative flex flex-col items-center cursor-pointer"
    >
      <motion.div animate={{ opacity: dimmed ? 0 : 1 }} transition={{ ease, duration: 0.4 }} className="flex flex-col items-center">
        <motion.img
          src={src}
          alt={t(label.da, label.en)}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay }}
          className="relative z-10 h-[40vmin] max-h-[360px] object-contain drop-shadow-xl"
          style={{ rotate: `${rotate}deg` }}
        />
      </motion.div>
      <motion.span
        animate={dimmed ? { x: labelVenn.x, y: labelVenn.y, scale: 1.05 } : { x: 0, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15, delay: dimmed ? delay : 0 }}
        className="relative z-30 -mt-1 px-5 py-1.5 rounded-full bg-[#FFFDF5] shadow-md text-[14px] font-medium tracking-wide"
      >
        <span style={{ color }}>● </span>
        {t(label.da, label.en)}
      </motion.span>
    </motion.div>
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

export default function LayoutScrapbook2() {
  const { t } = useLanguage()
  const [venn, setVenn] = useState(false)

  return (
    <main className="min-h-screen bg-[var(--color-base)] overflow-hidden pb-32">
      {/* Trio hero */}
      <section className="texture relative px-8 md:px-16 pt-24 pb-16 min-h-[88vh] flex flex-col justify-center">
        <div className="text-center mb-12">
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
            className="mt-2 leading-[1.05]"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(38px, 6vw, 76px)', color: BURGUNDY }}
          >
            {t('Jeg arbejder i krydsfeltet', 'I work at the intersection')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.7, delay: 0.2 } }}
            className="mt-4 max-w-xl mx-auto text-[16px] md:text-[18px] leading-relaxed text-[var(--color-text)]/80"
          >
            {t('Kommunikation, design og IT - tre felter jeg ser som tre sider af det samme, altid med målgruppen i centrum.', 'Communication, design and IT - three fields I see as three sides of the same thing, always with the audience at the centre.')}
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
              {t('Målgruppe', 'Audience')}
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

      {/* Hero collage */}
      <section className="texture relative px-8 md:px-16 pt-16 pb-12 min-h-[520px]">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0, transition: { ease, duration: 0.6 } }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.16em] uppercase opacity-50"
        >
          {t(aboutLabel.da, aboutLabel.en)}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { ease, duration: 0.8, delay: 0.1 } }}
          viewport={{ once: true }}
          className="mt-2 leading-[1.05] max-w-2xl"
          style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(38px, 6vw, 76px)', color: BURGUNDY }}
        >
          <em>Hi</em>, jeg er Casandra
        </motion.h2>

        <div className="relative mt-6 md:flex md:items-start md:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0, transition: { ease, duration: 0.7, delay: 0.2 } }}
            viewport={{ once: true }}
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
