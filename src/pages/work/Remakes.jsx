import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { BackLink } from '../../components/work/blocks'

const IMG = '/images/projects/remakes'
const EASE = [0.22, 1, 0.36, 1]
const TITLE_FONT = '"ITCGaramond", serif'

const WALL = '#E3E1D9'
const INK = '#2C3630'
const PEN = '#913C27'
const GREEN = '#3B7751'
const PAPER = '#FFFDF5'

function Tape({ rotate = -4, w = 92, style }) {
  return (
    <span
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{
        width: w,
        height: 26,
        background: 'rgba(203,197,175,0.72)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    />
  )
}

function PrintFrame({ src, alt, folded = false, className = '', shadow = '0 3px 10px rgba(0,0,0,0.20)' }) {
  const fold = 34
  return (
    <div className={`relative ${className}`} style={{ filter: shadow ? `drop-shadow(${shadow})` : undefined }}>
      <div
        style={{
          background: PAPER,
          padding: 10,
          clipPath: folded
            ? `polygon(0 0, calc(100% - ${fold}px) 0, 100% ${fold}px, 100% 100%, 0 100%)`
            : undefined,
        }}
      >
        <img src={src} alt={alt} className="block w-full h-auto object-contain" draggable={false} />
      </div>
      {folded && (
        <span
          aria-hidden="true"
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: fold,
            height: fold,
            background: `linear-gradient(225deg, ${PAPER} 0%, #E4E0D2 55%, #C7C2B2 100%)`,
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          }}
        />
      )}
    </div>
  )
}

function Lightbox({ shot, onClose }) {
  useEffect(() => {
    if (!shot) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [shot, onClose])

  return (
    <AnimatePresence>
      {shot && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          style={{ background: 'rgba(22,26,23,0.975)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.img
            src={shot.src}
            alt={shot.alt}
            className="max-w-full max-h-full object-contain"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ ease: EASE, duration: 0.35 }}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-6 text-[11px] tracking-[0.16em] uppercase"
            style={{ color: PAPER }}
          >
            Luk
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CaseHead({ number, label, story }) {
  return (
    <div className="max-w-[42ch]" style={{ hyphens: 'auto' }}>
      <p className="leading-none mb-3" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 26, color: PEN }}>
        {number}
      </p>
      <h2
        className="leading-[1.05] mb-4"
        style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(28px, 2.9vw, 40px)', color: GREEN }}
      >
        {label}
      </h2>
      <span className="block mb-5" style={{ width: 46, height: 2, background: PEN }} />
      <p className="font-body leading-relaxed" style={{ fontSize: 15, color: INK, opacity: 0.85 }}>
        {story}
      </p>
    </div>
  )
}

const STACK_POSE = [
  { x: 0, y: 0, rotate: -2 },
  { x: 30, y: 14, rotate: 3 },
  { x: 58, y: 28, rotate: 7 },
]

function PosterStack({ posters, hint, counter, onZoom, zoomLabel }) {
  const [order, setOrder] = useState(() => posters.map((_, i) => i))

  const cycle = () => setOrder((o) => [...o.slice(1), o[0]])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative h-[68%]" style={{ aspectRatio: '2380 / 3368', marginLeft: -22 }}>
        {posters.map((p, i) => {
          const pos = order.indexOf(i)
          const pose = STACK_POSE[pos] ?? STACK_POSE[STACK_POSE.length - 1]
          return (
            <motion.button
              key={p.src}
              type="button"
              onClick={cycle}
              aria-label={hint}
              className="absolute inset-0 block cursor-pointer"
              style={{ zIndex: posters.length - pos }}
              animate={{ x: pose.x, y: pose.y, rotate: pose.rotate }}
              transition={{ ease: EASE, duration: 0.55 }}
            >
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-full object-contain"
                style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.18)' }}
                draggable={false}
              />
            </motion.button>
          )
        })}
      </div>

      <div className="mt-12 flex items-center gap-4">
        <span className="text-[11px] tracking-[0.16em] uppercase" style={{ color: PEN }}>
          {counter(order[0] + 1, posters.length)}
        </span>
        <span className="font-body text-[12px]" style={{ color: INK, opacity: 0.55 }}>
          {hint}
        </span>
        <button
          type="button"
          onClick={() => onZoom(posters[order[0]])}
          className="font-body text-[12px] underline underline-offset-4"
          style={{ color: PEN }}
        >
          {zoomLabel}
        </button>
      </div>
    </div>
  )
}

const EXITS = {
  right: { rotate: 16, x: '88%', y: '-38%', origin: '100% 0%' },
  up: { rotate: -7, x: '-6%', y: '-124%', origin: '50% 0%' },
  far: { rotate: 25, x: '98%', y: '-28%', origin: '100% 0%' },
}

const EXIT_NARROW = { rotate: 13, x: '108%', y: '-4%', origin: '100% 50%' }

function PeelCase({ number, label, story, before, beforeAlt, exit = 'right', children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [wide, setWide] = useState(true)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const away = wide ? EXITS[exit] : EXIT_NARROW

  const rotate = useTransform(scrollYProgress, [0.18, 0.62], [0, away.rotate])
  const x = useTransform(scrollYProgress, [0.18, 0.62], ['0%', away.x])
  const y = useTransform(scrollYProgress, [0.18, 0.62], ['0%', away.y])
  const scale = useTransform(scrollYProgress, [0.18, 0.4, 0.62], [1, 1.05, 1.02])
  const shadow = useTransform(
    scrollYProgress,
    [0.18, 0.62],
    ['drop-shadow(0 3px 8px rgba(0,0,0,0.18))', 'drop-shadow(0 34px 46px rgba(0,0,0,0.34))'],
  )
  const tapeOpacity = useTransform(scrollYProgress, [0.18, 0.3], [1, 0])
  const afterOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const afterScale = useTransform(scrollYProgress, [0.2, 0.62], [0.94, 1])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setWide(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  if (reduce) {
    return (
      <section className="max-w-[1180px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-[minmax(0,360px)_1fr] gap-10 md:gap-16 items-start">
        <CaseHead number={number} label={label} story={story} />
        <div className="grid gap-8">
          <PrintFrame src={before} alt={beforeAlt} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }} />
          <div className="relative w-full" style={{ aspectRatio: '4 / 3', maxHeight: '72vh' }}>
            <div className="absolute inset-0 flex items-center justify-center">{children}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative" style={{ height: wide ? '260vh' : '200vh' }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-[1180px] mx-auto w-full px-6 md:px-10 grid md:grid-cols-[minmax(0,360px)_1fr] gap-8 md:gap-16 items-center">
          <CaseHead number={number} label={label} story={story} />

          <div className="relative w-full" style={{ aspectRatio: '4 / 3', maxHeight: '68vh' }}>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: afterOpacity, scale: afterScale }}
            >
              {children}
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ rotate, x, y, scale, transformOrigin: away.origin }}
            >
              <motion.div className="relative" style={{ width: '86%', filter: shadow }}>
                <motion.span style={{ opacity: tapeOpacity }}>
                  <Tape rotate={-5} style={{ left: '50%', top: -13, marginLeft: -46, zIndex: 2 }} />
                </motion.span>
                <PrintFrame src={before} alt={beforeAlt} shadow={null} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Hero({ t }) {
  const shots = [
    {
      src: `${IMG}/before-nvg.jpg`,
      alt: t('Menuskærmen før', 'The menu screen before'),
      rotate: -6,
      top: '2%',
      left: '0%',
      w: '58%',
      folded: false,
    },
    {
      src: `${IMG}/before-itu.jpg`,
      alt: t('Tallerkenvejledningen før', 'The plate guide before'),
      rotate: 5,
      top: '30%',
      left: '42%',
      w: '52%',
      folded: false,
    },
    {
      src: `${IMG}/before-service.jpg`,
      alt: t('Opvasksedlen før', 'The dishes notice before'),
      rotate: -3,
      top: '60%',
      left: '10%',
      w: '48%',
      folded: true,
    },
  ]

  return (
    <header className="max-w-[1180px] mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-24 md:pb-36">
      <div className="grid md:grid-cols-2 gap-14 md:gap-16 items-center">
        <div>
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: EASE, duration: 0.7 }}
            className="leading-[0.95]"
            style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(52px, 9vw, 112px)', color: GREEN }}
          >
            Remakes
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: EASE, duration: 0.7, delay: 0.12 }}
            className="font-body leading-relaxed mt-6 max-w-[46ch]"
            style={{ fontSize: 'clamp(16px, 1.5vw, 19px)', color: INK }}
          >
            {t(
              'Godt indhold fortjener godt design. Jeg kan ikke tåle spildt potentiale. Når et godt budskab drukner i dårligt design, klør det i fingrene. Her er et par ting jeg ikke kunne lade være med at redesigne.',
              'Good content deserves good design. I can’t stand wasted potential. When a good message drowns in bad design, my fingers itch. Here are a few things I couldn’t help but redesign.',
            )}
          </motion.p>
        </div>

        <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
          {shots.map((s, i) => (
            <motion.div
              key={s.src}
              initial={{ opacity: 0, y: 18, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: s.rotate }}
              transition={{ ease: EASE, duration: 0.8, delay: 0.2 + i * 0.12 }}
              className="absolute"
              style={{ top: s.top, left: s.left, width: s.w }}
            >
              <Tape rotate={s.rotate * -2} style={{ left: '50%', top: -12, marginLeft: -46 }} />
              <PrintFrame src={s.src} alt={s.alt} folded={s.folded} style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.14)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  )
}

function Outro({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="max-w-[1180px] mx-auto px-6 md:px-10 py-28 md:py-40 text-center">
      <motion.p
        initial={{ y: 24, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ ease: EASE, duration: 0.7 }}
        className="mx-auto max-w-[18ch] leading-[1.05]"
        style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(30px, 4.4vw, 60px)', color: GREEN }}
      >
        {t('Godt indhold fortjener godt design.', 'Good content deserves good design.')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ ease: EASE, duration: 0.7, delay: 0.15 }}
        className="mt-10"
      >
        <Link to="/#arbejde" className="inline-block text-[11px] tracking-[0.16em] uppercase" style={{ color: PEN }}>
          {t('Se de andre projekter', 'See the other projects')} →
        </Link>
      </motion.div>
    </section>
  )
}

export default function Remakes() {
  const { t } = useLanguage()
  const [zoom, setZoom] = useState(null)

  const nvgAfter = { src: `${IMG}/after-nvg.png`, alt: t('Menukortet efter redesignet', 'The menu after the redesign') }
  const serviceAfter = {
    src: `${IMG}/after-service.png`,
    alt: t('Opvaskplakaten efter redesignet', 'The dishes poster after the redesign'),
  }

  return (
    <main className="min-h-screen" style={{ background: WALL, color: INK }}>
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 pt-20">
        <BackLink />
      </div>

      <Hero t={t} />

      <PeelCase
        number="01"
        label={t('Menuskærmen', 'The menu screen')}
        story={t(
          'Under et GSK-kursus i matematik prøvede jeg at bestille frokost, og jeg kunne simpelthen ikke finde rundt på menukortet. Tekst og billeder manglede hierarki og opdeling. Så jeg redesignede det tilbage i maj 2025. Så hvem ved, måske har de fikset det siden.',
          'During a GSK course in mathematics I tried to order lunch, and I simply couldn’t navigate the menu board. Text and images lacked hierarchy and structure. So I redesigned it back in May 2025. Who knows, maybe they’ve fixed it since.',
        )}
        before={`${IMG}/before-nvg.jpg`}
        beforeAlt={t('Menuskærmen i kantinen før redesignet', 'The canteen menu screen before the redesign')}
        exit="right"
      >
        <button
          type="button"
          onClick={() => setZoom(nvgAfter)}
          className="w-full h-full flex items-center justify-center cursor-zoom-in"
        >
          <img
            src={nvgAfter.src}
            alt={nvgAfter.alt}
            className="max-w-full max-h-full object-contain"
            style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.16)' }}
          />
        </button>
      </PeelCase>

      <PeelCase
        number="02"
        label={t('Tallerkenvejledningen', 'The plate guide')}
        story={t(
          'Som studerende på ITU gjorde det mig lidt ondt, at kantinens skiltning ikke afspejlede at vi har over 200 designstuderende i huset. Så her er mine bud på en makeover af "tallerkenvejledningen".',
          'As a student at ITU it hurt a little that the canteen’s signage didn’t reflect that we have over 200 design students in the building. So here is my take on a makeover of the "plate guide".',
        )}
        before={`${IMG}/before-itu.jpg`}
        beforeAlt={t(
          'Tallerkenvejledningen tapet på døren før redesignet',
          'The plate guide taped to the door before the redesign',
        )}
        exit="up"
      >
        <PosterStack
          posters={[
            {
              src: `${IMG}/after-itu-1.png`,
              alt: t('Plakat: vælg den lille tallerken og spar 4,50 kr.', 'Poster: choose the small-rim plate and save 4.50 dkk'),
            },
            { src: `${IMG}/after-itu-2.png`, alt: t('Plakat: spar 4,50 kr.', 'Poster: save 4.50 dkk') },
            { src: `${IMG}/after-itu-3.png`, alt: t('Plakat: tag den lille tallerken', 'Poster: take the small plate') },
          ]}
          hint={t('Klik for at bladre', 'Click to browse')}
          counter={(n, total) => `${n} / ${total}`}
          onZoom={setZoom}
          zoomLabel={t('Se stor', 'View large')}
        />
      </PeelCase>

      <PeelCase
        number="03"
        label={t('Kommunens opvask', 'The council’s dishes')}
        story={t(
          'Denne hang på mit arbejde, og det gjorde mig så trist - det var et så godt budskab, men det druknede i for meget tekst, dårlig kommunikation og uoverskuelighed.',
          'This was hanging at my workplace, and it made me so sad - it was such a good message, but it drowned in too much text, poor communication and lack of clarity.',
        )}
        before={`${IMG}/before-service.jpg`}
        beforeAlt={t(
          'Den laminerede opvaskseddel før redesignet',
          'The laminated dishes notice before the redesign',
        )}
        exit="far"
      >
        <button
          type="button"
          onClick={() => setZoom(serviceAfter)}
          className="w-full h-full flex items-center justify-center cursor-zoom-in"
        >
          <img
            src={serviceAfter.src}
            alt={serviceAfter.alt}
            className="max-w-full max-h-full object-contain"
            style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.16)' }}
          />
        </button>
      </PeelCase>

      <Outro t={t} />

      <Lightbox shot={zoom} onClose={() => setZoom(null)} />
    </main>
  )
}
