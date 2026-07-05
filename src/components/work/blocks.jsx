import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

const EASE = [0.22, 1, 0.36, 1]
const TITLE_FONT = '"ITCGaramond", serif'

function Reveal({ children, delay = 0, className, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ y: 28, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ ease: EASE, duration: 0.7, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export function BackLink() {
  const { t } = useLanguage()
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase opacity-50 hover:opacity-90 transition-opacity"
    >
      <span>←</span> {t('Forsiden', 'Home')}
    </Link>
  )
}

function Tape({ color = 'rgba(145,60,39,0.16)', rotate = -4, w = 84 }) {
  return (
    <span
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: -11,
        width: w,
        height: 24,
        background: color,
        transform: `translateX(-50%) rotate(${rotate}deg)`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
      }}
    />
  )
}

export function DragLogo({ src, className = '', rotate = -5, tapeColor }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.05, rotate: 0, zIndex: 50, cursor: 'grabbing' }}
      initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ ease: EASE, duration: 0.7, delay: 0.35 }}
      className={`bg-[#FFFDF5] p-3 pb-4 shadow-lg cursor-grab ${className}`}
    >
      <Tape color={tapeColor} />
      <img src={src} alt="CompozeStudio" className="w-full object-contain pointer-events-none" draggable={false} />
    </motion.div>
  )
}

export function DetailHero({ project, coverSrc, coverFit = 'cover', coverBg, ratio = '16 / 9', showCover = true }) {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const src = showCover ? coverSrc ?? project.cover : null

  return (
    <header ref={ref} className="max-w-[1100px] mx-auto px-6 md:px-10 pt-24 md:pt-28 pb-12 md:pb-16">
      <motion.p
        initial={{ y: 16, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ ease: EASE, duration: 0.6 }}
        className="text-[11px] tracking-[0.16em] uppercase opacity-40 mb-4"
      >
        {t(project.category.da, project.category.en)} · {project.year}
      </motion.p>

      <motion.h1
        initial={{ y: 24, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ ease: EASE, duration: 0.7, delay: 0.08 }}
        className="leading-[0.95]"
        style={{
          fontFamily: TITLE_FONT,
          fontWeight: 700,
          fontSize: 'clamp(44px, 8vw, 104px)',
          color: project.accent,
        }}
      >
        {t(project.title.da, project.title.en)}
      </motion.h1>

      {src && (
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ ease: EASE, duration: 0.8, delay: 0.18 }}
          className="mt-10 md:mt-14 overflow-hidden"
          style={{ aspectRatio: ratio, backgroundColor: coverBg ?? project.accent + '22' }}
        >
          <img
            src={src}
            alt=""
            className={`w-full h-full ${coverFit === 'contain' ? 'object-contain' : 'object-cover'}`}
          />
        </motion.div>
      )}
    </header>
  )
}

export function TextBlock({ label, number, title, children, accent, align = 'left', width = 'narrow' }) {
  const maxW = width === 'wide' ? 'max-w-[900px]' : 'max-w-[640px]'
  const place = align === 'center' ? 'mx-auto text-center' : align === 'right' ? 'ml-auto' : ''

  return (
    <Reveal className="px-6 md:px-10 py-10 md:py-16">
      <div className="max-w-[1100px] mx-auto">
        <div className={`${maxW} ${place}`}>
          {(label || number) && (
            <>
              <span
                className={`block h-[2px] w-20 mb-4 ${align === 'center' ? 'mx-auto' : ''}`}
                style={{ backgroundColor: accent }}
              />
              <p
                className="text-[11px] tracking-[0.18em] uppercase mb-4"
                style={{ color: accent, opacity: 0.85 }}
              >
                {number && <span className="font-semibold">{number}</span>}
                {number && label && ' · '}
                {label}
              </p>
            </>
          )}
          {title && (
            <h2
              className="mb-5 leading-[1.05]"
              style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(26px, 3.4vw, 42px)' }}
            >
              {title}
            </h2>
          )}
          <div
            className="font-body leading-relaxed opacity-80"
            style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}
          >
            {children}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function MetaList({ items, accent }) {
  return (
    <Reveal className="px-6 md:px-10 py-8 md:py-12">
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 border-t pt-10"
        style={{ borderColor: 'var(--color-text)' + '1A' }}
      >
        {items.map((it, i) => (
          <div key={i}>
            <p className="text-[10px] tracking-[0.18em] uppercase mb-2" style={{ color: accent, opacity: 0.8 }}>
              {it.label}
            </p>
            <p className="font-body text-[14px] leading-snug opacity-80 whitespace-pre-line">{it.value}</p>
          </div>
        ))}
      </div>
    </Reveal>
  )
}

function Placeholder({ accent, ratio, label }) {
  return (
    <div
      className="w-full flex items-center justify-center text-[11px] tracking-[0.16em] uppercase"
      style={{ aspectRatio: ratio, backgroundColor: accent + '1F', color: accent }}
    >
      {label || 'billede'}
    </div>
  )
}

export function ImageFull({ src, alt = '', caption, accent, ratio = '16 / 9' }) {
  return (
    <Reveal className="px-6 md:px-10 py-6 md:py-10">
      <figure className="max-w-[1100px] mx-auto">
        <div className="overflow-hidden" style={{ aspectRatio: ratio }}>
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          ) : (
            <Placeholder accent={accent} ratio={ratio} />
          )}
        </div>
        {caption && (
          <figcaption className="font-body text-[12px] opacity-40 mt-3">{caption}</figcaption>
        )}
      </figure>
    </Reveal>
  )
}

export function ImageDuo({ left, right, accent, ratio = '4 / 5', frameColor, maxW = 1100 }) {
  const frame = frameColor ? { border: `4px solid ${frameColor}` } : null
  return (
    <Reveal className="px-6 md:px-10 py-6 md:py-10">
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        style={{ maxWidth: maxW }}
      >
        {[left, right].map((img, i) => (
          <figure key={i}>
            <div className="overflow-hidden" style={{ aspectRatio: ratio, ...frame }}>
              {img?.src ? (
                <img src={img.src} alt={img.alt || ''} className="w-full h-full object-cover" />
              ) : (
                <Placeholder accent={accent} ratio={ratio} />
              )}
            </div>
            {img?.caption && (
              <figcaption className="font-body text-[12px] opacity-40 mt-3">{img.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </Reveal>
  )
}

export function ImageGrid({ items, accent, cols = 3, ratio = '2 / 3' }) {
  const colClass = cols === 2 ? 'md:grid-cols-2' : cols === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'
  return (
    <Reveal className="px-6 md:px-10 py-6 md:py-10">
      <div className={`max-w-[1100px] mx-auto grid grid-cols-2 ${colClass} gap-4 md:gap-6`}>
        {items.map((img, i) => (
          <figure key={i}>
            <div className="overflow-hidden" style={{ aspectRatio: ratio }}>
              {img?.src ? (
                <img src={img.src} alt={img.alt || ''} className="w-full h-full object-cover" />
              ) : (
                <Placeholder accent={accent} ratio={ratio} />
              )}
            </div>
            {img?.caption && (
              <figcaption className="font-body text-[12px] opacity-40 mt-2">{img.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </Reveal>
  )
}

export function TiltPair({ items, accent, ratio = '2 / 3', w = 330 }) {
  const rots = [-4, 4]
  return (
    <Reveal className="px-6 md:px-10 py-8 md:py-14">
      <div className="max-w-[1100px] mx-auto flex flex-wrap justify-center gap-10 md:gap-16">
        {items.map((img, i) => (
          <motion.figure
            key={i}
            whileHover={{ rotate: 0, scale: 1.04, zIndex: 20 }}
            transition={{ ease: EASE, duration: 0.4 }}
            className="shadow-md"
            style={{ width: w, rotate: rots[i % 2] }}
          >
            <div className="overflow-hidden" style={{ aspectRatio: ratio }}>
              {img?.src ? (
                <img src={img.src} alt={img.alt || ''} className="w-full h-full object-cover" />
              ) : (
                <Placeholder accent={accent} ratio={ratio} />
              )}
            </div>
          </motion.figure>
        ))}
      </div>
    </Reveal>
  )
}

export function Feature({ image, accent, label, number, title, children, reverse = false, ratio = '2 / 3' }) {
  return (
    <Reveal className="px-6 md:px-10 py-10 md:py-16">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className={reverse ? 'md:order-2' : ''}>
          <div className="overflow-hidden mx-auto w-full shadow-md" style={{ aspectRatio: ratio, maxWidth: 360 }}>
            {image?.src ? (
              <img src={image.src} alt={image.alt || ''} className="w-full h-full object-cover" />
            ) : (
              <Placeholder accent={accent} ratio={ratio} />
            )}
          </div>
        </div>
        <div className={reverse ? 'md:order-1' : ''}>
          {(label || number) && (
            <>
              <span className="block h-[2px] w-20 mb-4" style={{ backgroundColor: accent }} />
              <p className="text-[11px] tracking-[0.18em] uppercase mb-4" style={{ color: accent, opacity: 0.85 }}>
                {number && <span className="font-semibold">{number}</span>}
                {number && label && ' · '}
                {label}
              </p>
            </>
          )}
          {title && (
            <h2
              className="mb-5 leading-[1.05]"
              style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(26px, 3.4vw, 42px)' }}
            >
              {title}
            </h2>
          )}
          <div className="font-body leading-relaxed opacity-80" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}>
            {children}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function Marquee({ items, accent, w = 240, ratio = '2 / 3', speed = 30 }) {
  const loop = [...items, ...items]
  return (
    <Reveal className="py-8 md:py-14 overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: speed, repeat: Infinity }}
      >
        {loop.map((img, i) => (
          <figure key={i} className="shrink-0 mr-6 shadow-md" style={{ width: w }}>
            <div className="overflow-hidden" style={{ aspectRatio: ratio }}>
              {img?.src ? (
                <img src={img.src} alt={img.alt || ''} className="w-full h-full object-cover" />
              ) : (
                <Placeholder accent={accent} ratio={ratio} />
              )}
            </div>
          </figure>
        ))}
      </motion.div>
    </Reveal>
  )
}

export function PullQuote({ children, accent, attribution }) {
  return (
    <Reveal className="px-6 md:px-10 py-16 md:py-24">
      <figure className="max-w-[900px] mx-auto text-center">
        <blockquote
          className="leading-[1.15]"
          style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(28px, 4.6vw, 56px)', color: accent }}
        >
          {children}
        </blockquote>
        {attribution && (
          <figcaption className="font-body text-[12px] tracking-[0.12em] uppercase opacity-40 mt-6">
            {attribution}
          </figcaption>
        )}
      </figure>
    </Reveal>
  )
}

export function NextProject({ project }) {
  const { t } = useLanguage()
  if (!project) return null

  return (
    <Reveal className="px-6 md:px-10 pt-20 md:pt-28 pb-32 mt-10" style={{ backgroundColor: '#EAE0C0' }}>
      <Link
        to={`/arbejde/${project.slug}`}
        className="group block max-w-[1100px] mx-auto"
      >
        <p className="text-[11px] tracking-[0.18em] uppercase opacity-40 mb-3">
          {t('Næste projekt', 'Next project')}
        </p>
        <div className="flex items-end justify-between gap-8">
          <h2
            className="leading-[0.95] transition-colors"
            style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(32px, 5.5vw, 72px)' }}
          >
            {t(project.title.da, project.title.en)}
          </h2>
          <motion.span
            initial={{ x: -6 }}
            whileHover={{ x: 0 }}
            className="text-2xl opacity-30 group-hover:opacity-80 transition-opacity pb-3"
            style={{ color: project.accent }}
          >
            →
          </motion.span>
        </div>
      </Link>
    </Reveal>
  )
}
