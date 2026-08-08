import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { projects } from '../../data/projects'
import { BackLink, NextProject } from '../../components/work/blocks'

const IMG = '/images/projects/blitz'
const EASE = [0.22, 1, 0.36, 1]
const TITLE_FONT = '"ITCGaramond", serif'

const OLIVE = '#345321'
const CREAM = '#F1EDDF'

const SCALES = [176, 120, 80, 40]
const FINAL_TILE = 8

function BlitzMark({ fill = OLIVE, style }) {
  return (
    <svg viewBox="92 53 578 804" fill="none" style={style} aria-hidden="true">
      <path
        d="M494.419 438.491C501.58 430.362 511.864 426.934 522.543 428.762C568.698 436.661 602.351 456.57 626.232 488.81C656.576 529.774 669.022 584.277 664.994 638.647C656.946 747.299 582.9 856.5 452.5 856.5H116C102.745 856.5 92 845.755 92 832.5V553C92 542.507 100.507 534 111.001 534C118.504 534 125.78 534 128 534H273.806C282.287 534 288.092 542.56 284.954 550.439L192.074 783.71C190.397 787.922 195.916 791.234 198.845 787.772L488.5 445.5C489.417 444.279 491.739 441.532 494.419 438.491Z"
        fill={fill}
      />
      <path
        d="M452.5 53.5C504.007 53.5 543.072 75.3581 569.304 108.157C595.496 140.907 608.841 184.488 609.188 227.984C609.534 271.48 596.884 315.074 570.855 347.838C549.402 374.842 518 399.5 479.325 400.5H341.678C333.479 400.5 327.694 392.46 330.3 384.687L412.083 140.67C413.131 137.542 409.098 135.26 406.957 137.77L110 487.5L102.571 496.238C98.9556 500.492 92 497.935 92 492.352V77.5C92 64.2452 102.745 53.5 116 53.5H452.5Z"
        fill={fill}
      />
    </svg>
  )
}

function Reveal({ children, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ y: 28, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ ease: EASE, duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StageHead({ number, label, note }) {
  return (
    <div>
      <p
        className="leading-none mb-2"
        style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 26, color: OLIVE }}
      >
        {number}
      </p>
      <p className="text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: OLIVE, opacity: 0.8 }}>
        {label}
      </p>
      {note && <p className="font-body text-[13px] leading-relaxed opacity-50">{note}</p>}
    </div>
  )
}

function StageBody({ stage }) {
  return (
    <div className="max-w-[1100px] mx-auto w-full grid md:grid-cols-[224px_1fr] gap-6 md:gap-12 items-center">
      <StageHead number={stage.num} label={stage.label} note={stage.note} />
      <div>{stage.content}</div>
    </div>
  )
}

function Rail({ progress, count }) {
  const dotY = useTransform(progress, [0, 1], ['0%', '100%'])
  return (
    <div
      className="hidden md:block absolute right-6 lg:right-10 top-[30%] bottom-[30%] w-px"
      style={{ background: 'rgba(52,83,33,0.2)' }}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${(i / (count - 1)) * 100}%`,
            left: -2,
            transform: 'translateY(-50%)',
            width: 5,
            height: 5,
            background: 'rgba(52,83,33,0.3)',
          }}
        />
      ))}
      <motion.span
        className="absolute rounded-full"
        style={{
          top: dotY,
          left: -4.5,
          transform: 'translateY(-50%)',
          width: 10,
          height: 10,
          background: OLIVE,
        }}
      />
    </div>
  )
}

function StageStack({ stages, reduce }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const o0 = useTransform(scrollYProgress, [0, 0.2, 0.26], [1, 1, 0])
  const o1 = useTransform(scrollYProgress, [0.2, 0.26, 0.46, 0.52], [0, 1, 1, 0])
  const o2 = useTransform(scrollYProgress, [0.46, 0.52, 0.72, 0.78], [0, 1, 1, 0])
  const o3 = useTransform(scrollYProgress, [0.72, 0.78, 1], [0, 1, 1])
  const opacities = [o0, o1, o2, o3]

  if (reduce) {
    return (
      <>
        {stages.map((stage) => (
          <Reveal key={stage.num} className="px-6 md:px-10 py-12 md:py-16">
            <StageBody stage={stage} />
          </Reveal>
        ))}
      </>
    )
  }

  return (
    <section ref={ref} className="relative" style={{ height: '420vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.num}
            className="absolute inset-0 flex items-center px-6 md:px-10 pt-16"
            style={{ opacity: opacities[i] }}
          >
            <StageBody stage={stage} />
          </motion.div>
        ))}
        <Rail progress={scrollYProgress} count={stages.length} />
      </div>
    </section>
  )
}

function Hero({ t, reduce }) {
  const [note, setNote] = useState(false)

  return (
    <header className="max-w-[1100px] mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-6">
      <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center">
        <div>
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: EASE, duration: 0.6 }}
            className="text-[11px] tracking-[0.18em] uppercase mb-4"
            style={{ color: OLIVE, opacity: 0.7 }}
          >
            {t('App-ikon', 'App icon')} · 2025
          </motion.p>

          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: EASE, duration: 0.7, delay: 0.08 }}
            className="leading-[0.95]"
            style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(52px, 9vw, 112px)', color: OLIVE }}
          >
            Blitz
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: EASE, duration: 0.7, delay: 0.18 }}
            className="font-body leading-relaxed opacity-80 mt-6 max-w-[48ch]"
            style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}
          >
            {t(
              'Blitz samler restaurantens booking, bordstyring og gæstedata ét sted, i stedet for tre systemer der ikke taler sammen. Ikonet er det ene felt, hele den idé skal kunne stå i.',
              'Blitz brings a restaurant’s bookings, table management and guest history into one place, instead of three systems that don’t talk to each other. The icon is the single tile that whole idea has to fit into.',
            )}
          </motion.p>

        </div>

        <motion.div
          drag
          dragMomentum={false}
          onHoverStart={() => setNote(true)}
          onHoverEnd={() => setNote(false)}
          onTap={() => setNote((n) => !n)}
          whileDrag={{ scale: 1.04, rotate: 0, cursor: 'grabbing' }}
          initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: -4 }}
          transition={{ type: 'spring', stiffness: 240, damping: 13, mass: 0.7 }}
          className="justify-self-center md:justify-self-end cursor-grab select-none"
          style={{
            width: 'clamp(184px, 26vw, 296px)',
            aspectRatio: '1',
            borderRadius: '22.5%',
            backgroundColor: OLIVE,
            boxShadow: '0 18px 40px -18px rgba(52,83,33,0.55)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <BlitzMark fill={CREAM} style={{ gridArea: '1 / 1', height: '62%', pointerEvents: 'none' }} />

          <AnimatePresence>
            {note && (
              <motion.div
                key="note"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, rotate: -9, scale: 0.92 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotate: -4, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, rotate: -9, scale: 0.94 }}
                transition={{ ease: EASE, duration: 0.34 }}
                className="relative font-body pointer-events-none"
                style={{
                  gridArea: '1 / 1',
                  width: '80%',
                  backgroundColor: '#FFFDF5',
                  color: OLIVE,
                  padding: '22px 18px 24px',
                  boxShadow: '0 16px 34px -10px rgba(0,0,0,0.4)',
                }}
              >
                <span
                  className="absolute"
                  style={{
                    left: '50%',
                    top: -11,
                    width: 74,
                    height: 22,
                    background: 'rgba(52,83,33,0.15)',
                    transform: 'translateX(-50%) rotate(-4deg)',
                  }}
                />
                <p style={{ fontSize: 13, lineHeight: 1.55 }}>
                  <span className="font-semibold">Fun fact:</span>{' '}
                  {t(
                    'Blitz fik sit navn efter efternavnet på manden der opfandt all inclusive.',
                    'Blitz is named after the surname of the man who invented the all-inclusive holiday.',
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  )
}

function DraftGrid() {
  return (
    <ul className="grid grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-8 md:gap-y-8 list-none p-0 m-0">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
        <li key={n} className="flex items-center justify-center">
          <img
            src={`${IMG}/draft-${String(n).padStart(2, '0')}.png`}
            alt=""
            className="w-auto"
            style={{ height: 'min(13vh, 132px)' }}
          />
        </li>
      ))}
    </ul>
  )
}

function VariantRow() {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 list-none p-0 m-0">
      {[1, 2, 3, 4].map((n) => (
        <li key={n} className="flex flex-col items-center">
          <img
            src={`${IMG}/variant-0${n}.png`}
            alt=""
            className="w-auto"
            style={{ height: 'min(21vh, 180px)' }}
          />
          <span className="text-[11px] tracking-[0.18em] mt-5 font-semibold" style={{ color: OLIVE, opacity: 0.5 }}>
            {String(n).padStart(2, '0')}
          </span>
        </li>
      ))}
    </ul>
  )
}

function ColorwayGrid() {
  const rest = Array.from({ length: 11 }, (_, i) => i + 1).filter((n) => n !== FINAL_TILE)

  return (
    <ul className="grid grid-cols-5 md:grid-cols-7 gap-4 md:gap-5 list-none p-0 m-0">
      <li className="col-span-2 row-span-2">
        <img
          src={`${IMG}/tile-${String(FINAL_TILE).padStart(2, '0')}.png`}
          alt=""
          className="w-full h-auto block"
        />
      </li>

      {rest.map((n) => (
        <li key={n}>
          <img src={`${IMG}/tile-${String(n).padStart(2, '0')}.png`} alt="" className="w-full h-auto block" />
        </li>
      ))}
    </ul>
  )
}

function ScaleRow() {
  return (
    <div className="flex flex-wrap items-end gap-x-5 gap-y-8 md:gap-x-7">
      {SCALES.map((size) => (
        <figure key={size} className="m-0">
          <div
            style={{
              width: size,
              height: size,
              borderRadius: '22.5%',
              backgroundColor: OLIVE,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <BlitzMark fill={CREAM} style={{ height: '62%' }} />
          </div>
          <figcaption className="text-[10px] tracking-[0.14em] uppercase mt-3" style={{ color: OLIVE, opacity: 0.5 }}>
            {size} px
          </figcaption>
        </figure>
      ))}

      <span className="hidden md:block self-stretch w-px" style={{ backgroundColor: OLIVE, opacity: 0.15 }} />

      {[
        { size: 120, label: 'logo' },
        { size: 32, label: 'favicon' },
      ].map(({ size, label }) => (
        <figure key={label} className="m-0">
          <div style={{ height: size, display: 'grid', placeItems: 'center' }}>
            <BlitzMark fill={OLIVE} style={{ height: '100%' }} />
          </div>
          <figcaption className="text-[10px] tracking-[0.14em] uppercase mt-3" style={{ color: OLIVE, opacity: 0.5 }}>
            {label}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function Blitz() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const next = projects.find((p) => p.slug === 'o-bar')

  const stages = [
    {
      num: '01',
      label: t('Udkast', 'Drafts'),
      note: t(
        'Blitz retter sig mod restaurationsbranchen, så jeg legede med klokker, tallerkener og - på grund af alt det administrative - et bogmærke. Men sammen med ejerne vendte vi hele tiden tilbage til lynet.',
        'Blitz is aimed at the restaurant industry, so I played with bells, plates and - because of all the admin - a bookmark. But together with the owners, we kept coming back to the bolt.',
      ),
      content: <DraftGrid />,
    },
    {
      num: '02',
      label: t('Retning', 'Direction'),
      note: null,
      content: <VariantRow />,
    },
    {
      num: '03',
      label: t('App-ikon', 'App icon'),
      note: t(
        'Det endelige app-ikon til venstre, og de ti varianter det blev valgt fra.',
        'The final app icon on the left, and the ten variants it was chosen from.',
      ),
      content: <ColorwayGrid />,
    },
    {
      num: '04',
      label: t('Størrelse', 'Scale'),
      note: t(
        'Samme mærke fra 176 til 40 px.',
        'The same mark from 176 down to 40 px.',
      ),
      content: <ScaleRow />,
    },
  ]

  return (
    <main className="min-h-screen">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-20">
        <BackLink />
      </div>

      <Hero t={t} reduce={reduce} />

      <StageStack stages={stages} reduce={reduce} />

      <NextProject project={next} />
    </main>
  )
}
