import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { projects } from '../data/projects'

const EMAIL = 'casandralpedersen@gmail.com'

const PILL_NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E\")"

const SKILLS = [
  { da: 'UX Design', en: 'UX Design', pos: 'top-[4%] right-[50%]', rotate: -3, delay: 0 },
  { da: 'Konstruktiv', en: 'Constructive', pos: 'top-[4%] right-[20%]', rotate: 2, delay: 0.05 },
  { da: 'Grafisk design', en: 'Graphic design', pos: 'top-[26%] right-[13%]', rotate: 5, delay: 0.1 },
  { da: 'Vibe coding', en: 'Vibe coding', pos: 'top-[42%] right-[53%]', rotate: 3, delay: 0.15 },
  { da: 'Salg & kundeservice', en: 'Sales & customer service', pos: 'top-[42%] right-[13%]', rotate: -4, delay: 0.2 },
  { da: 'Nysgerrig', en: 'Curious', pos: 'top-[62%] right-[50%]', rotate: -5, delay: 0.25 },
  { da: 'Problemløsning', en: 'Problem-solving', pos: 'top-[62%] right-[14%]', rotate: 6, delay: 0.3 },
  { da: 'Omstillingsparat', en: 'Adaptable', pos: 'bottom-[8%] right-[32%]', rotate: 4, delay: 0.35 },
]

function SkillPill({ label, pos, rotate, delay }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7, y: 8, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0, rotate, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.4, delay } }}
      exit={{
        y: 820,
        x: rotate > 0 ? 26 : -26,
        rotate: rotate + (rotate > 0 ? 52 : -52),
        opacity: 0,
        transition: {
          delay: Math.abs(rotate) * 0.012,
          y: { duration: 0.9, ease: [0.4, 0, 1, 1] },
          x: { duration: 0.9, ease: 'easeIn' },
          rotate: { duration: 0.9, ease: 'easeIn' },
          opacity: { duration: 0.9, ease: [0.6, 0, 0.95, 1] },
        },
      }}
      className={`absolute z-30 overflow-hidden pointer-events-none px-4 py-1.5 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap shadow-sm ${pos}`}
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

const services = [
  {
    title: { da: 'Design', en: 'Design' },
    desc: { da: '', en: '' },
    aside: [
      { da: 'Brand', en: 'Brand' },
      { da: 'Digitalt', en: 'Digital' },
      { da: 'Fysisk', en: 'Physical' },
    ],
    children: [
      {
        title: { da: 'UX & brand identitet', en: 'UX & brand identity' },
        desc: { da: 'Brugercentreret tænkning, konceptudvikling og optimering af digitale og fysiske oplevelser - logo, farvepalette, typografi og brandretningslinjer, der hænger sammen - både for kunden ved kassen og brugeren bag skærmen.', en: 'User-centered thinking, concept development, and optimization of digital and physical experiences - logo, color palette, typography, and brand guidelines that work together - for both the customer at the counter and the user behind the screen.' },
      },
      {
        title: { da: 'Sociale medier', en: 'Social media' },
        desc: { da: 'Indhold, kampagner, grafik og fotografi til sociale medier - med fokus på hvad der skaber engagement hos rigtige mennesker.', en: 'Content, campaigns, graphics, and photography for social media - focused on what creates engagement with the right people.' },
      },
      {
        title: { da: 'Grafisk design', en: 'Graphic design' },
        desc: { da: 'Menuer, skilte, plakater og andet grafisk materiale, der skal fungere i den virkelige verden.', en: 'Menus, signs, posters, and other graphic materials that need to work in the real world.' },
      },
    ],
  },
  {
    title: { da: 'Strategi & forretning', en: 'Strategy & business' },
    desc: { da: 'Merkantil baggrund med forståelse for budgetter, drift og målgrupper. Erfaring med HR, rekruttering, vagtplaner og marketingplaner - og med at løfte blikket og se tingene fra et højere niveau end specialisten. Initiativer skal også kunne betale sig.', en: 'A commercial background with an understanding of budgets, operations, and target groups. Experience with HR, recruiting, scheduling, and marketing plans - and with stepping back to see things from a higher level than the specialist. Initiatives also need to make financial sense.' },
    aside: [
      { da: 'Budgetter', en: 'Budgets' },
      { da: 'Drift', en: 'Operations' },
      { da: 'Planer', en: 'Plans' },
    ],
  },
  {
    title: { da: 'Kommunikation', en: 'Communication' },
    desc: { da: 'Jeg har talt med rigtig mange mennesker - i telefonen, bag baren, i et escape room og på spansk. Det har lært mig at lytte, tilpasse mig og formidle klart - både i mødet med medarbejdere og i kundekontakt.', en: 'I have spoken with a lot of people - on the phone, behind a bar, in an escape room, and in Spanish. It has taught me to listen, adapt, and communicate clearly - both with colleagues and in customer-facing situations.' },
    aside: [
      { da: 'Medarbejdere', en: 'Teams' },
      { da: 'Kunder', en: 'Customers' },
      { da: 'Spansk', en: 'Spanish' },
    ],
  },
]

const fadeUp = (delay) => ({
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7, delay } },
})

const DRIVEN_BY_WORDS = {
  da: ['målbar forandring', 'bevidste designvalg', 'tal fra en A/B-test', 'smil', 'hyldeblomstdrik', 'nysgerrighed & proaktivitet'],
  en: ['measurable change', 'intentional design decisions', 'seeing stats from an A/B test', 'smiles', 'elderflower drink', 'curiosity & proactivity'],
}

function RotatingWord({ words }) {
  const [index, setIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200)
    return () => clearInterval(id)
  }, [shouldReduceMotion, words])

  return (
    <span className="relative inline-grid">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function getContrastTextColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? 'var(--color-text)' : 'var(--color-base)'
}

const placeholderProjects = [
  { number: '05', accent: 'var(--color-burgundy)' },
  { number: '06', accent: 'var(--color-blue)' },
]

function WorkGrid({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-3">
      {projects.map((project, index) => {
        const textColor = getContrastTextColor(project.accent)

        return (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6, delay: index * 0.06 } } : {}}
          >
            <Link
              to={`/arbejde/${project.slug}`}
              className="group relative block h-[300px] md:h-[300px] overflow-hidden"
              style={{ backgroundColor: project.accent }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              <span
                className="absolute top-5 right-5 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: textColor }}
              >
                →
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                {index === 1 ? (
                  <>
                    <h3
                      className="leading-tight break-words"
                      style={{ fontFamily: 'VSOP, serif', fontSize: 'clamp(16px, 2.4vw, 28px)', color: textColor }}
                    >
                      {t(project.title.da, project.title.en)}
                    </h3>
                    <div
                      className="h-px mt-2 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                      style={{ backgroundColor: textColor }}
                    />
                  </>
                ) : index === 2 ? (
                  <h3
                    className="leading-tight break-words flex items-baseline gap-2"
                    style={{ fontFamily: 'VSOP, serif', fontSize: 'clamp(16px, 2.4vw, 28px)', color: textColor }}
                  >
                    {t(project.title.da, project.title.en)}
                    <span className="text-base opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
                      ✦
                    </span>
                  </h3>
                ) : index === 3 ? (
                  <motion.h3
                    className="leading-tight break-words"
                    style={{ fontFamily: 'VSOP, serif', fontSize: 'clamp(16px, 2.4vw, 28px)', color: textColor }}
                    whileHover={{ rotate: [0, -6, 6, -4, 0], transition: { duration: 0.5, ease: 'easeInOut' } }}
                  >
                    {t(project.title.da, project.title.en)}
                  </motion.h3>
                ) : (
                  <h3
                    className="leading-tight break-words transition-transform duration-300 ease-out origin-bottom-left group-hover:-rotate-3"
                    style={{ fontFamily: 'VSOP, serif', fontSize: 'clamp(16px, 2.4vw, 28px)', color: textColor }}
                  >
                    {t(project.title.da, project.title.en)}
                  </h3>
                )}
                <p
                  className="text-[11px] tracking-[0.1em] uppercase mt-1.5"
                  style={{ color: textColor, opacity: 0.6 }}
                >
                  {t(project.category.da, project.category.en)}
                </p>
              </div>
            </Link>
          </motion.div>
        )
      })}

      {placeholderProjects.map((placeholder, index) => (
        <motion.div
          key={placeholder.number}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6, delay: (projects.length + index) * 0.06 } } : {}}
          className="group relative h-[300px] md:h-[300px] overflow-hidden"
          style={{ backgroundColor: placeholder.accent }}
        >
          {index === 0 && (
            <div
              className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/15 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out pointer-events-none"
            />
          )}
          <div className="absolute bottom-0 left-0 p-4 md:p-6">
            <motion.h3
              className="leading-tight"
              style={{ fontFamily: 'VSOP, serif', fontSize: 'clamp(16px, 2.4vw, 28px)', color: 'var(--color-base)', opacity: 0.6 }}
              whileHover={
                index === 1
                  ? { y: [0, -4, 0], transition: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } }
                  : {}
              }
            >
              {t('Kommer snart', 'Coming soon')}
            </motion.h3>
            <p
              className="flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase mt-1.5"
              style={{ color: 'var(--color-base)', opacity: 0.4 }}
            >
              {t(`Projekt ${placeholder.number}`, `Project ${placeholder.number}`)}
              {index === 1 && (
                <motion.span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-base)' }}
                  initial={{ opacity: 0.4, scale: 1 }}
                  whileHover={{
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.4, 1],
                    transition: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' },
                  }}
                />
              )}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function Services({ t }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.72', 'end 0.18'],
  })
  const pathLength = useTransform(scrollYProgress, [0, 0.38, 0.72, 1], [0, 0.34, 0.72, 1])
  const items = [
    { number: '01', title: services[0].children[0].title, desc: services[0].children[0].desc },
    { number: '02', title: services[1].title, desc: services[1].desc },
    {
      number: '03',
      title: { da: 'AI & automatisering', en: 'AI & automation' },
      desc: {
        da: 'Jeg bruger AI som dagligt arbejdsredskab — fra vibecoding med GitHub og Vercel til automatisering af hverdag, studie og arbejde. Jeg tror på at det vil ændre måden vi arbejder på, og jeg vil være med fra start.',
        en: 'I use AI as a daily work tool — from vibe coding with GitHub and Vercel to automating everyday life, studies, and work. I believe it will change the way we work, and I want to be part of it from the start.',
      },
    },
    { number: '04', title: services[2].title, desc: services[2].desc },
    { number: '05', title: services[0].children[1].title, desc: services[0].children[1].desc },
    { number: '06', title: services[0].children[2].title, desc: services[0].children[2].desc },
  ]

  return (
    <section ref={ref} className="relative px-6 md:px-10 py-20 overflow-hidden">
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
        className="mb-16 text-center md:mb-20"
      >
        <p className="text-[11px] tracking-[0.18em] uppercase opacity-45 mb-4">
          {t('Hvad kan jeg', 'What can I do')}
        </p>
        <h2
          className="leading-none uppercase"
          style={{ fontFamily: 'VSOP, serif', fontSize: 'clamp(32px, 4.5vw, 64px)', color: 'var(--color-burgundy)' }}
        >
          {t('Det hele kogt ned', 'Everything boiled down')}
        </h2>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-24 hidden md:block">
        <svg
          viewBox="0 0 1200 2000"
          preserveAspectRatio="none"
          className="w-full h-[2000px]"
        >
          <motion.path
            d="M 440 118 C 560 148, 760 150, 860 280 S 740 520, 500 650 S 360 820, 560 900 S 900 1040, 820 1160 S 520 1340, 250 1505 S 560 1660, 860 1820"
            fill="none"
            stroke="var(--color-burgundy)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
      </div>

      <div className="relative space-y-8 md:space-y-16">
        {items.map((item, index) => {
          const alignRight = index % 2 === 1

          return (
            <motion.div
              key={item.number}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6, delay: index * 0.05 }}
              className={`flex ${alignRight ? 'md:justify-end' : 'md:justify-start'} justify-start`}
            >
              <div
                className={`w-full md:w-[44%] border border-[var(--color-text)]/10 bg-[var(--color-base)]/65 backdrop-blur-[1px] px-6 py-6 ${
                  alignRight ? 'md:rotate-[1.2deg] md:mr-14' : 'md:-rotate-[1.2deg] md:ml-14'
                }`}
              >
                <p className="text-[11px] opacity-25 mb-3">{item.number}</p>
                <h3 style={{ fontFamily: 'VSOP, serif', fontSize: 'clamp(22px, 2.8vw, 44px)' }}>
                  {t(item.title.da, item.title.en)}
                </h3>
                {item.desc.da ? (
                  <p className="text-[14px] opacity-55 mt-2 max-w-[50ch]">
                    {t(item.desc.da, item.desc.en)}
                  </p>
                ) : null}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function Contact({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="px-10 py-32 flex flex-col items-start" style={{ backgroundColor: 'var(--color-blue)' }}>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7 } } : {}}
        className="text-[11px] tracking-[0.16em] uppercase mb-8"
        style={{ color: 'var(--color-base)', opacity: 0.6 }}
      >
        {t('Kontakt', 'Contact')}
      </motion.p>

      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.8, delay: 0.1 } } : {}}
        className="leading-[1.05] max-w-2xl"
        style={{ fontFamily: 'VSOP, serif', fontSize: 'clamp(30px, 4.8vw, 64px)', color: 'var(--color-base)' }}
      >
        {t('Nok om mig. Hvad arbejder du på?', 'Enough about me. What are you working on?')}
      </motion.h2>

      <motion.a
        href={`mailto:${EMAIL}`}
        initial={{ y: 16, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6, delay: 0.4 } } : {}}
        className="mt-10 px-8 py-4 text-[14px] tracking-wide hover:opacity-85 transition-opacity"
        style={{ backgroundColor: 'var(--color-burgundy)', color: 'var(--color-base)' }}
      >
        {t('Skriv til mig', 'Email me')}
      </motion.a>
    </section>
  )
}

function AboutTeaser({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="px-10 py-24 flex flex-col md:flex-row items-center gap-10 md:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.8 } } : {}}
        className="flex-1 max-w-md relative"
        style={{ height: 420 }}
      >
        <img
          src="/images/sitwavemepic.png"
          alt="Casandra"
          className="w-full h-full object-contain object-bottom"
        />
      </motion.div>

      <div className="flex-1 max-w-md">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7 } } : {}}
          className="text-[11px] tracking-[0.16em] uppercase opacity-50 mb-6"
        >
          {t('Jeg arbejder med design, IT og forretning', 'I work with design, IT and business')}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7, delay: 0.1 } } : {}}
          className="space-y-4 text-[15px] leading-relaxed opacity-75"
        >
          <p>
            {t(
              'Jeg har et arbejdsliv drevet af nysgerrighed og indre motivation, og det har fået mig i mange spændende retninger. Alt fra drift, rekruttering og marketing som COO, til at bygge visuel identitet fra bunden og arbejde med IT-support og kundeservice.',
              "I have a working life driven by curiosity and inner motivation, and it's taken me in many interesting directions. Everything from operations, recruitment and marketing as a COO, to building a visual identity from scratch and working in IT support and customer service."
            )}
          </p>
          <p>
            {t(
              'Det giver et blik for hvad der faktisk virker, både for virksomheden og kunden.',
              'It gives me an eye for what actually works - for the business and the customer alike.'
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6, delay: 0.25 } } : {}}
        >
          <Link
            to="/om"
            className="inline-block mt-7 text-[13px] tracking-wide border-b border-[var(--color-text)]/30 pb-0.5 hover:border-[var(--color-text)] transition-colors"
          >
            {t('Mød din kommende generalist - hvordan jeg arbejder og hvorfor →', 'Meet your next generalist - how I work and why →')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  const { t } = useLanguage()
  const [showSkills, setShowSkills] = useState(false)
  const alphaRef = useRef(null)

  useEffect(() => {
    const img = new Image()
    img.src = '/images/mefinalpic.png'
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.naturalWidth
      c.height = img.naturalHeight
      const ctx = c.getContext('2d', { willReadFrequently: true })
      ctx.drawImage(img, 0, 0)
      alphaRef.current = { data: ctx.getImageData(0, 0, c.width, c.height).data, w: c.width, h: c.height }
    }
  }, [])

  function handleFigureMove(e) {
    const a = alphaRef.current
    if (!a) return
    const el = e.currentTarget
    const W = el.clientWidth
    const H = el.clientHeight
    const scale = Math.min(W / a.w, H / a.h)
    const left = (W - a.w * scale) / 2
    const top = H - a.h * scale
    const px = Math.floor((e.nativeEvent.offsetX - left) / scale)
    const py = Math.floor((e.nativeEvent.offsetY - top) / scale)
    if (px < 0 || py < 0 || px >= a.w || py >= a.h) {
      setShowSkills(false)
      return
    }
    setShowSkills(a.data[(py * a.w + px) * 4 + 3] > 30)
  }

  return (
    <main>

      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="handdrawn-red-home" x="-15%" y="-15%" width="130%" height="130%">
          <feComponentTransfer in="SourceGraphic" result="fig">
            <feFuncA type="linear" slope="6" intercept="-2.6" />
          </feComponentTransfer>
          <feMorphology in="fig" operator="dilate" radius="4" result="thick" />
          <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="thick" in2="noise" scale="14" result="wobbly" />
          <feFlood floodColor="#913C27" result="red" />
          <feComposite in="red" in2="wobbly" operator="in" result="stroke" />
          <feMerge>
            <feMergeNode in="stroke" />
            <feMergeNode in="fig" />
          </feMerge>
        </filter>
      </svg>

      {/* Hero */}
      <section className="relative min-h-[88vh] overflow-hidden px-10 pt-6 pb-16 flex flex-col justify-start">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 1.0, delay: 0.05 } }}
          onMouseLeave={() => setShowSkills(false)}
          className="absolute top-0 right-0 w-[76%] h-full"
          style={{ zIndex: 0 }}
        >
          <img
            src="/images/mefinalpic.png"
            alt="Casandra"
            onMouseMove={handleFigureMove}
            className="w-full h-full object-contain object-bottom"
            style={{ transform: 'translateX(8%) scale(1.12)', transformOrigin: 'bottom center', mixBlendMode: 'multiply' }}
          />

          <AnimatePresence>
            {showSkills &&
              SKILLS.map((s) => (
                <SkillPill key={s.en} label={t(s.da, s.en)} pos={s.pos} rotate={s.rotate} delay={s.delay} />
              ))}
          </AnimatePresence>
        </motion.div>

        <div className="relative z-10 flex flex-col mt-24 md:mt-32 pointer-events-none">
          <motion.p
            variants={fadeUp(0.9)}
            initial="hidden"
            animate="show"
            className="text-[clamp(1.5rem,3vw,2.75rem)] leading-snug max-w-2xl"
          >
            <span style={{ color: 'var(--color-burgundy)', fontFamily: 'Montigny, cursive', fontSize: '1.45em', lineHeight: 0 }}>Hi</span>
            <span style={{ color: 'var(--color-burgundy)' }}>,</span>
            <span className="opacity-75">
              {t(' jeg er Casandra, UX-designer i København med en baggrund i business og marketing, drevet af ', " I'm Casandra, a Copenhagen-based UX designer with a background in business and marketing, driven by ")}
              <RotatingWord words={t(DRIVEN_BY_WORDS.da, DRIVEN_BY_WORDS.en)} />.
            </span>
          </motion.p>
        </div>

      </section>

      {/* Om mig-teaser */}
      <AboutTeaser t={t} />

      {/* Det her laver jeg */}
      <Services t={t} />

      {/* Projekter */}
      <section id="arbejde" className="px-10 py-12">
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="text-[11px] tracking-[0.18em] uppercase opacity-45 mb-4">
            {t('Ting jeg har lavet med hænderne', 'Things I made with my hands')}
          </p>
          <h2
            className="leading-none uppercase"
            style={{ fontFamily: 'VSOP, serif', fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'var(--color-burgundy)' }}
          >
            {t('Mine fingeraftryk', 'My fingerprints')}
          </h2>
        </motion.div>
        <WorkGrid t={t} />
      </section>

      {/* Kontakt */}
      <Contact t={t} />

    </main>
  )
}
