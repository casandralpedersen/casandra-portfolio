import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { BackLink } from '../../components/work/blocks'

const IMG = '/images/projects/o-bar'
const EASE = [0.22, 1, 0.36, 1]
const TITLE_FONT = '"ITCGaramond", serif'

const NIGHT_TOP = '#16261c'
const NIGHT_BOT = '#22392b'
const AMBER = '#f2c476'
const CREAM = '#F2EEDD'
const OLIVE = '#5b6236'

function StringLights({ reduce }) {
  const n = 13
  const H = 130
  const bulbY = (t) => 24 * ((1 - t) ** 2 + t ** 2) + 232 * t * (1 - t)
  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: H }} aria-hidden="true">
      <svg viewBox="0 0 100 130" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <path d="M0 24 Q 50 116 100 24" fill="none" stroke="rgba(242,196,118,0.4)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {Array.from({ length: n }).map((_, i) => {
        const t = 0.04 + (i / (n - 1)) * 0.92
        return (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center"
            style={{ left: `${t * 100}%`, top: bulbY(t), transform: 'translateX(-50%)' }}
            animate={reduce ? {} : { opacity: [0.6, 1, 0.72, 1] }}
            transition={reduce ? {} : { duration: 2.6 + (i % 4) * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
          >
            <span style={{ width: 1, height: 7, background: 'rgba(242,196,118,0.55)' }} />
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: '9999px',
                background: AMBER,
                boxShadow: `0 0 8px 1px rgba(242,196,118,0.9), 0 0 18px 4px rgba(242,196,118,0.35)`,
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

function Hero({ t, reduce }) {
  const meta = [
    { label: t('Rolle', 'Role'), value: t('COO & operationel partner', 'COO & operational partner') },
    { label: t('Periode', 'Period'), value: t('apr 2024 – okt 2025', 'Apr 2024 – Oct 2025') },
    { label: t('Sted', 'Location'), value: t('Byrum ved Royal Arena', 'Urban space by Royal Arena') },
    { label: t('Fokus', 'Focus'), value: t('Drift · forretning · brand', 'Operations · business · brand') },
  ]
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: `radial-gradient(120% 90% at 50% 8%, ${NIGHT_BOT} 0%, ${NIGHT_TOP} 70%)`, color: CREAM }}
    >
      <StringLights reduce={reduce} />
      <div
        className="pointer-events-none absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 620, height: 620, maxWidth: '90vw', background: `radial-gradient(circle, rgba(242,196,118,0.16) 0%, rgba(242,196,118,0) 62%)` }}
      />

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col items-center text-center">
        <div className="mb-2">
          <BackLink />
        </div>

        <motion.img
          src={`${IMG}/o-bar-logo.svg`}
          alt="Ø Bar"
          draggable={false}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={reduce ? { opacity: 1, scale: 1 } : { opacity: [0, 1, 0.4, 1], scale: 1 }}
          transition={{ duration: reduce ? 0.6 : 1.1, ease: EASE, times: reduce ? undefined : [0, 0.5, 0.62, 1] }}
          className="w-[280px] md:w-[440px] mt-10"
          style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 22px rgba(242,196,118,0.6)) drop-shadow(0 0 44px rgba(242,196,118,0.3))' }}
        />

        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: EASE, duration: 0.7, delay: 0.5 }}
          className="mt-10 max-w-xl text-[clamp(17px,2vw,22px)] leading-snug"
          style={{ color: CREAM, opacity: 0.85 }}
        >
          {t(
            'Fra tom asfaltplads til fungerende forretning. Mødested og bar foran Royal Arena.',
            'From an empty asphalt lot to a working business. A meeting place and bar in front of Royal Arena.',
          )}
        </motion.p>

        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: EASE, duration: 0.7, delay: 0.65 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 w-full max-w-3xl"
        >
          {meta.map((m) => (
            <div key={m.label} className="text-left">
              <p className="text-[10px] tracking-[0.18em] uppercase mb-1.5" style={{ color: AMBER, opacity: 0.9 }}>
                {m.label}
              </p>
              <p className="text-[13px] md:text-[14px] leading-tight" style={{ color: CREAM }}>
                {m.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function useStages(t) {
  return [
    {
      img: 'o-bar-start.jpg',
      pos: 'top',
      num: '01',
      label: t('Opstart', 'Start'),
      title: t('Fra tom asfaltplads', 'From an empty lot'),
      text: t('Vi startede fra ingenting - en tom plads uden strøm, vand eller faciliteter.', 'We started from nothing - an empty lot with no power, water or facilities.'),
    },
    {
      img: 'o-bar-build.jpg',
      num: '02',
      label: t('Byggeriet', 'The build'),
      title: t('Baren rejste sig', 'The bar rose'),
      text: t('To 40-fods containere, palle-siddepladser i pyramideform og lyskæder over det hele - med et samarbejde med Royal Unibrew på plads bag baren.', 'Two 40-foot containers, pallet seating in pyramid form and string lights throughout - with a Royal Unibrew partnership in place behind the bar.'),
    },
    {
      img: 'o-bar-open.jpg',
      num: '03',
      label: t('Åbning', 'Opening'),
      title: t('Så spillede baren op', 'Then the bar came alive'),
      text: t('Musik, fadøl og stemning - baren kørte, når der var event i arenaen.', 'Music, draft beer and atmosphere - the bar ran whenever the arena had an event.'),
    },
    {
      img: 'o-bar-event.jpg',
      num: '04',
      label: t('Eventdag', 'Event day'),
      title: t('Fyldt på eventdage', 'Packed on event days'),
      text: t('Åben når Royal Arena havde event - op til 2.000 gæster på en dag.', 'Open when Royal Arena had an event - up to 2,000 guests in a day.'),
    },
  ]
}

function Caption({ stage, style }) {
  return (
    <motion.div style={style} className="absolute left-0 right-0 top-[22%] px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: AMBER }}>
          {stage.num} · {stage.label}
        </p>
        <h3 className="mb-2 leading-[1]" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(30px, 5vw, 60px)', color: CREAM }}>
          {stage.title}
        </h3>
        <p className="max-w-md text-[15px] md:text-[17px] leading-snug" style={{ color: CREAM, opacity: 0.82 }}>
          {stage.text}
        </p>
      </div>
    </motion.div>
  )
}

function AssembleScene({ t, reduce }) {
  const ref = useRef(null)
  const stages = useStages(t)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const o0 = useTransform(scrollYProgress, [0, 0.22, 0.28], [1, 1, 0])
  const o1 = useTransform(scrollYProgress, [0.22, 0.28, 0.47, 0.53], [0, 1, 1, 0])
  const o2 = useTransform(scrollYProgress, [0.47, 0.53, 0.72, 0.78], [0, 1, 1, 0])
  const o3 = useTransform(scrollYProgress, [0.72, 0.78, 1], [0, 1, 1])
  const opacities = [o0, o1, o2, o3]
  const zoom = useTransform(scrollYProgress, [0, 1], [1.06, 1.14])
  const dotY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  if (reduce) {
    return (
      <section className="bg-[#16261c]">
        {stages.map((s) => (
          <figure key={s.num} className="relative">
            <img src={`${IMG}/${s.img}`} alt={s.title} className="w-full h-[70vh] object-cover" style={{ objectPosition: s.pos || 'center' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,20,14,0.85) 0%, rgba(11,20,14,0) 55%)' }} />
            <Caption stage={s} style={{ opacity: 1 }} />
          </figure>
        ))}
      </section>
    )
  }

  return (
    <section ref={ref} style={{ height: '360vh' }} className="relative bg-[#16261c]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {stages.map((s, i) => (
          <motion.div key={s.num} className="absolute inset-0" style={{ opacity: opacities[i] }}>
            <motion.img src={`${IMG}/${s.img}`} alt={s.title} className="w-full h-full object-cover" style={{ scale: zoom, objectPosition: s.pos || 'center' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(11,20,14,0.92) 0%, rgba(11,20,14,0.55) 34%, rgba(11,20,14,0) 64%)' }} />
          </motion.div>
        ))}

        {stages.map((s, i) => (
          <Caption key={s.num} stage={s} style={{ opacity: opacities[i] }} />
        ))}

        <div className="absolute right-5 md:right-9 top-[22%] bottom-[22%] w-[2px]" style={{ background: 'rgba(242,238,221,0.3)' }}>
          {stages.map((s, i) => (
            <span
              key={s.num}
              className="absolute -left-[3px] w-2 h-2 rounded-full"
              style={{ top: `${(i / (stages.length - 1)) * 100}%`, transform: 'translateY(-50%)', background: 'rgba(242,238,221,0.4)' }}
            />
          ))}
          <motion.span
            className="absolute rounded-full"
            style={{ top: dotY, left: -7, transform: 'translateY(-50%)', width: 16, height: 16, background: AMBER, boxShadow: '0 0 12px 3px rgba(242,196,118,0.65)' }}
          />
        </div>
      </div>
    </section>
  )
}

function CountUp({ to, inView, reduce, format }) {
  const mv = useMotionValue(0)
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduce) { setV(to); return }
    const controls = animate(mv, to, { duration: 1.5, ease: EASE, onUpdate: (x) => setV(x) })
    return () => controls.stop()
  }, [inView, to, reduce]) // eslint-disable-line react-hooks/exhaustive-deps
  return <>{format ? format(Math.round(v)) : Math.round(v)}</>
}

function BusinessSection({ t, reduce }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const kr = (n) => n.toLocaleString('da-DK')
  const H = 240
  const maxV = 120000
  const hOf = (v) => Math.sqrt(v) / Math.sqrt(maxV)
  const groups = [
    { label: t('Laveste 25%', 'Lowest 25%'), a: 7000, b: 15000 },
    { label: t('Gennemsnitsdag', 'Average day'), a: 18000, b: 32000 },
    { label: t('Rekorddag', 'Record day'), a: 65000, b: 120000 },
  ]
  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 md:px-10 py-16 md:py-24"
      style={{ background: `radial-gradient(120% 100% at 80% 20%, ${NIGHT_BOT} 0%, ${NIGHT_TOP} 75%)`, color: CREAM }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="max-w-2xl">
          <span className="block h-[2px] w-16 mb-5" style={{ background: AMBER }} />
          <p className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: AMBER }}>
            {t('Modellen', 'The model')}
          </p>
          <h2 className="mb-6 leading-[1.02]" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(30px, 4.4vw, 56px)', color: CREAM }}>
            {t('Åben når arenaen var åben', 'Open when the arena was open')}
          </h2>
          <p className="text-[15px] md:text-[17px] leading-relaxed mb-4" style={{ color: CREAM, opacity: 0.82 }}>
            {t(
              'Ø Bar åbnede kun på dage med event i Royal Arena - hvor op til 17.000 gæster strømmede forbi.',
              'Ø Bar only opened on days with an event at Royal Arena - where up to 17,000 guests streamed past.',
            )}
          </p>
          <p className="text-[15px] md:text-[17px] leading-relaxed" style={{ color: CREAM, opacity: 0.82 }}>
            {t(
              'Fra 2024 til 2025 blev omsætningen pr. dag næsten fordoblet på tværs af alle dage.',
              'From 2024 to 2025 revenue per day nearly doubled across every kind of day.',
            )}
          </p>
          <div className="mt-10 flex flex-wrap gap-x-12 md:gap-x-16 gap-y-6">
            {[
              { n: '~500', l: t('gæster på en gennemsnitsdag', 'guests on an average day') },
              { n: '~2.000', l: t('på en rekorddag', 'on a record day') },
              { n: '17.000', l: t('arenaens kapacitet', 'the arena’s capacity') },
            ].map((s) => (
              <div key={s.l}>
                <p className="leading-none" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(28px, 3.4vw, 44px)', color: AMBER }}>{s.n}</p>
                <p className="mt-2 text-[13px] max-w-[150px]" style={{ color: CREAM, opacity: 0.8 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 md:mt-10">
          <div className="flex items-center gap-6 justify-end mb-8 text-[12px] tracking-wide" style={{ color: CREAM }}>
            <span className="flex items-center gap-2"><span className="rounded-sm" style={{ width: 12, height: 12, background: 'rgba(242,196,118,0.4)' }} />2024</span>
            <span className="flex items-center gap-2"><span className="rounded-sm" style={{ width: 12, height: 12, background: AMBER }} />2025</span>
          </div>

          <div className="flex items-end justify-between gap-8 md:gap-16" style={{ height: H + 70 }}>
            {groups.map((g, gi) => {
              const bars = [{ v: g.a, dim: true }, { v: g.b, dim: false }]
              return (
                <div key={g.label} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="relative w-full flex items-end justify-center gap-3 md:gap-5" style={{ height: H }}>
                    {bars.map((bar, bi) => (
                      <div key={bi} className="relative flex-1 max-w-[84px] h-full flex items-end justify-center">
                        <p className="absolute whitespace-nowrap" style={{ bottom: hOf(bar.v) * H + 8 }}>
                          <span className="block text-[clamp(12px,1.5vw,18px)] font-semibold" style={{ color: bar.dim ? 'rgba(242,238,221,0.7)' : CREAM }}>
                            <CountUp to={bar.v} inView={inView} reduce={reduce} format={kr} />
                          </span>
                        </p>
                        <motion.div
                          className="w-full rounded-t-sm"
                          style={{ height: hOf(bar.v) * H, originY: 1, background: bar.dim ? 'rgba(242,196,118,0.4)' : `linear-gradient(to top, ${AMBER}, #ffe3ad)`, boxShadow: bar.dim ? 'none' : '0 0 22px rgba(242,196,118,0.25)' }}
                          initial={{ scaleY: 0 }}
                          animate={inView ? { scaleY: 1 } : {}}
                          transition={{ duration: 0.9, ease: EASE, delay: 0.15 + gi * 0.16 + bi * 0.08 }}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-[13px] md:text-[14px] text-center" style={{ color: CREAM }}>{g.label}</p>
                </div>
              )
            })}
          </div>
          <p className="mt-8 text-[11px] tracking-wide text-right" style={{ color: AMBER, opacity: 0.8 }}>
            {t('Omsætning pr. dag i kr', 'Revenue per day in DKK')}
          </p>
        </div>
      </div>
    </section>
  )
}

function CompetencyGrid({ t }) {
  const items = [
    {
      title: t('HR & personale', 'HR & people'),
      text: t('Team leder for bartenderne: ansættelseskontrakter, oplæring samt vagt- og sygemeldingsprocedurer.', 'Team lead for the bartenders: employment contracts, onboarding and shift and sick-leave procedures.'),
      skills: t('HR · Rekruttering · Oplæring · Vagtplanlægning', 'HR · Recruitment · Onboarding · Scheduling'),
    },
    {
      title: t('Marketing', 'Marketing'),
      text: t('Udvikling og eksekvering af markedsføringskampagner samt løbende SoMe-indhold.', 'Development and execution of marketing campaigns plus ongoing social media content.'),
      skills: t('Marketing · Kampagner · SoMe · Content', 'Marketing · Campaigns · Social · Content'),
    },
    {
      title: t('Visuel identitet & grafisk design', 'Visual identity & graphic design'),
      text: t('Opbyggede Ø Bars visuelle identitet fra bunden: logo, skiltning og menukort, med løbende vedligeholdelse og design af menu- og prisskilte.', 'Built Ø Bar’s visual identity from scratch: logo, signage and menus, with ongoing upkeep and design of menu and price signs.'),
      skills: t('Visuel identitet · Branding · Menu- og prisskilte · Figma', 'Visual identity · Branding · Menu and price signs · Figma'),
    },
  ]
  return (
    <section className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto">
        <span className="block h-[2px] w-16 mb-5" style={{ background: OLIVE }} />
        <p className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: OLIVE }}>
          {t('Hvad jeg stod for', 'What I owned')}
        </p>
        <h2 className="mb-12 leading-[1.02] max-w-3xl" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--color-text)' }}>
          {t('Konkret ansvar', 'Concrete ownership')}
        </h2>

        <div className="grid md:grid-cols-3 gap-x-10 gap-y-11">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ ease: EASE, duration: 0.6, delay: i * 0.08 }}
              className="border-t pt-5"
              style={{ borderColor: 'rgba(41,92,125,0.18)' }}
            >
              <p className="text-[11px] tracking-[0.14em] uppercase mb-2.5" style={{ color: OLIVE }}>
                {it.skills}
              </p>
              <h3 className="mb-2.5 leading-tight" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(21px, 2.4vw, 30px)', color: 'var(--color-text)' }}>
                {it.title}
              </h3>
              <p className="text-[15px] md:text-[16px] leading-relaxed opacity-80">
                {it.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SoMeSection({ t }) {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <span className="block h-[2px] w-16 mb-5" style={{ background: OLIVE }} />
          <p className="text-[11px] tracking-[0.22em] uppercase mb-6" style={{ color: OLIVE }}>
            {t('Marketing', 'Marketing')}
          </p>
          <h2 className="mb-6 leading-[1.05]" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--color-text)' }}>
            {t('Synlige online', 'Visible online')}
          </h2>
          <p className="text-[16px] md:text-[18px] leading-relaxed opacity-80 mb-5">
            {t(
              'Vi byggede kendskab og trafik på sociale medier med en blanding af betalte annoncer og organisk indhold.',
              'We built awareness and traffic on social media with a mix of paid ads and organic content.',
            )}
          </p>
          <p className="text-[16px] md:text-[18px] leading-relaxed opacity-80 mb-7">
            {t(
              'Målet var ét gennemgående visuelt udtryk på tværs af feed, skilte og annoncer, så brandet var til at genkende, uanset hvor og hvornår gæsten mødte det. Som hurtigt eksekverende startup var udtrykket i konstant udvikling, og læringskurven var stejl.',
              'The goal was one consistent visual language across feed, signage and ads, so the brand was recognisable wherever and whenever a guest met it. As a fast-moving startup it kept evolving, and the learning curve was steep.',
            )}
          </p>
        </div>

        <div>
          <motion.img
            src={`${IMG}/o-bar-some-grid.jpg`}
            alt={t('Ø Bar Instagram-feed', 'Ø Bar Instagram feed')}
            className="w-full shadow-lg"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ ease: EASE, duration: 0.7 }}
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {['o-bar-some2.png', 'o-bar-hours.png'].map((src) => (
              <img key={src} src={`${IMG}/${src}`} alt="Ø Bar SoMe" className="w-full shadow-md" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function OBar() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  return (
    <main className="pb-24">
      <Hero t={t} reduce={reduce} />

      <section className="px-6 md:px-10 py-28 md:py-44">
        <div className="max-w-[1100px] mx-auto">
          <span className="block h-[2px] w-16 mb-5" style={{ background: OLIVE }} />
          <p className="text-[11px] tracking-[0.22em] uppercase mb-7" style={{ color: OLIVE }}>
            {t('Konteksten', 'The context')}
          </p>
          <h2 className="mb-10 leading-[1.02] max-w-3xl" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(32px, 5vw, 64px)', color: 'var(--color-text)' }}>
            {t('Et mødested der ikke fandtes endnu', 'A meeting place that didn’t exist yet')}
          </h2>
          <div className="max-w-2xl space-y-6 text-[16px] md:text-[19px] leading-relaxed opacity-80">
            <p>
              {t(
                'Ø Bar var et midlertidigt byrum på en plads overfor Royal Arena, skabt i samarbejde med By & Havn. Idéen var enkel: arenaens gæster havde intet naturligt sted at mødes for mad og drikke i nærheden.',
                'Ø Bar was a temporary urban space on a lot opposite Royal Arena, created together with By & Havn. The idea was simple: the arena’s guests had no natural place nearby to meet for food and drinks.',
              )}
            </p>
            <p>
              {t(
                'Jeg var med fra idéen opstod til vi var oppe og køre, og så det vokse måned for måned.',
                'I was there from the moment the idea came up until we were up and running, and watched it grow month by month.',
              )}
            </p>
          </div>
        </div>
      </section>

      <AssembleScene t={t} reduce={reduce} />

      <CompetencyGrid t={t} />

      <SoMeSection t={t} />

      <BusinessSection t={t} reduce={reduce} />
    </main>
  )
}
