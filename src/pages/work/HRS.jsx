import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { projects } from '../../data/projects'
import { BackLink, NextProject } from '../../components/work/blocks'

const IMG = '/images/projects/hrs'
const EASE = [0.22, 1, 0.36, 1]
const TITLE_FONT = '"ITCGaramond", serif'

const BLUE = '#1A1FA8'
const BLUE_DEEP = '#12137A'
const PAPER = '#E8EAF6'
const MINT = '#6BC4A6'
const ROSE = '#E8B0C0'

const TEAL = '#00B8B2'
const TEAL_DEEP = '#007A76'
const NIGHT = '#122524'
const YELLOW = '#FFD300'

function Lightbox({ shot, onClose, label }) {
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
          style={{ background: 'rgba(10,12,48,0.975)' }}
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
            {label}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Hero({ t }) {
  const meta = [
    { label: t('Rolle', 'Role'), value: t('Studentermedhjælper, projektansat', 'Student assistant, project contract') },
    { label: t('Periode', 'Period'), value: t('apr - sep 2026', 'Apr - Sep 2026') },
    { label: t('Fokus', 'Focus'), value: t('Web · grafik · koordinering', 'Web · graphics · coordination') },
    { label: t('Værktøjer', 'Tools'), value: t('Bricksite · Figma · PowerPoint · Excel', 'Bricksite · Figma · PowerPoint · Excel') },
  ]

  return (
    <section className="relative overflow-hidden" style={{ background: BLUE, color: PAPER }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{ width: 620, height: 620, right: '-14%', top: '-22%', background: `radial-gradient(circle, ${BLUE_DEEP} 0%, rgba(18,19,122,0) 68%)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full hidden md:block"
        style={{ width: 150, height: 150, right: '7%', bottom: '-46px', background: MINT, opacity: 0.75 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full hidden md:block"
        style={{ width: 118, height: 118, right: '14%', bottom: '-30px', background: ROSE, opacity: 0.7 }}
      />

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-20 pb-20 md:pb-28">
        <BackLink />

        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: EASE, duration: 0.6, delay: 0.1 }}
          className="mt-16 text-[11px] tracking-[0.22em] uppercase"
          style={{ color: MINT }}
        >
          Hovedstadens Rekrutteringsservice
        </motion.p>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: EASE, duration: 0.7, delay: 0.16 }}
          className="mt-4 leading-[1.02] max-w-[16ch]"
          style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(38px, 6.4vw, 84px)' }}
        >
          {t('Kommunikation til folk der skal videre', 'Communication for people moving on')}
        </motion.h1>

        <motion.p
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: EASE, duration: 0.7, delay: 0.24 }}
          className="mt-7 max-w-[52ch] text-[16px] md:text-[19px] leading-relaxed"
          style={{ opacity: 0.82 }}
        >
          {t(
            'Hovedstadens Rekrutteringsservice hjælper virksomheder med at finde medarbejdere, og folk videre i job. Jeg blev ansat i en projektstilling i forbindelse med omstruktureringen i Novo Nordisk.',
            'Hovedstadens Rekrutteringsservice helps companies find employees, and helps people move on into work. I was hired on a project contract in connection with the restructuring at Novo Nordisk.',
          )}
        </motion.p>

        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: EASE, duration: 0.7, delay: 0.32 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 max-w-3xl"
        >
          {meta.map((m) => (
            <div key={m.label}>
              <p className="text-[10px] tracking-[0.18em] uppercase mb-1.5" style={{ color: MINT }}>
                {m.label}
              </p>
              <p className="text-[13px] md:text-[14px] leading-tight">{m.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Reveal({ children, className = '', style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ y: 24, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1, transition: { ease: EASE, duration: 0.7 } } : {}}
    >
      {children}
    </motion.div>
  )
}

function Context({ t }) {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32" style={{ background: PAPER, color: BLUE_DEEP }}>
      <Reveal className="max-w-[1100px] mx-auto grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 md:gap-20">
        <div>
          <span className="block mb-5" style={{ width: 46, height: 2, background: ROSE }} />
          <h2 className="leading-[1.05]" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(28px, 3.4vw, 46px)' }}>
            {t('Hvad jeg laver', 'What I do')}
          </h2>
        </div>
        <div className="space-y-5 text-[16px] md:text-[18px] leading-relaxed" style={{ opacity: 0.85 }}>
          <p>
            {t(
              'Jeg opdaterer og optimerer hjemmesiden i Bricksite, og designer brochurer, plakater og præsentationer i Figma og PowerPoint, inklusive teksterne til dem.',
              'I update and optimise the website in Bricksite, and design brochures, posters and presentations in Figma and PowerPoint, including the copy for them.',
            )}
          </p>
          <p>
            {t(
              'Derudover står jeg for dokumentation og registrering i Excel, og koordinerer jobmatch-events, workshops og netværksgrupper, herunder program og oplægsholdere. Undervejs har jeg været referent og sparringspartner.',
              'On top of that I handle documentation and registration in Excel, and coordinate job-match events, workshops and network groups, including programme and speakers. Along the way I have been the minute-taker and a sounding board.',
            )}
          </p>
        </div>
      </Reveal>
    </section>
  )
}

function EventCase({ t, onZoom, shot }) {
  const points = [
    t(
      'Tilmeldingen lå som hyperlink i mailen invitationen blev sendt med. Så invitationens opgave er ikke at forklare hvordan man tilmelder sig, men hvorfor man skulle møde op.',
      'Signing up was a hyperlink in the email the invitation was sent with. So the invitation is not there to explain how to sign up, but why you should show up.',
    ),
    t(
      'De største pluspunkter står øverst: CV-tjek, gratis portrætfoto, oplæg og netværk.',
      'The biggest upsides sit at the top: CV check, free portrait photo, talks and networking.',
    ),
    t(
      'Til sidst gentages tilmeldingen. Én handling, én deadline, ingen konkurrerende knapper.',
      'The sign-up is repeated at the end. One action, one deadline, no competing buttons.',
    ),
  ]

  return (
    <section className="px-6 md:px-10 py-24 md:py-32" style={{ background: BLUE, color: PAPER }}>
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <Reveal>
          <p className="leading-none mb-3" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 26, color: MINT }}>
            01
          </p>
          <h2 className="leading-[1.05] mb-5" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(28px, 3.4vw, 46px)' }}>
            {t('Brancheskifte-eventet', 'The career-change event')}
          </h2>
          <p className="text-[16px] md:text-[18px] leading-relaxed mb-8" style={{ opacity: 0.82 }}>
            {t(
              'En invitation til folk der skal videre fra Novo. Målgruppen kender deres eget fag, men ikke hvad erfaringen hedder i en anden branche. Så invitationen skulle svare på to ting med det samme: hvad får jeg ud af at møde op, og hvornår er det.',
              'An invitation for people moving on from Novo. They know their own field, but not what their experience is called in another industry. So the invitation had to answer two things immediately: what do I get out of showing up, and when is it.',
            )}
          </p>
          <ul className="space-y-4">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] md:text-[16px] leading-relaxed" style={{ opacity: 0.8 }}>
                <span className="mt-[9px] shrink-0 rounded-full" style={{ width: 7, height: 7, background: ROSE }} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <button
            type="button"
            onClick={() => onZoom(shot)}
            className="group block w-full cursor-zoom-in"
            aria-label={t('Se invitationen stort', 'View the invitation large')}
          >
            <motion.div
              className="block w-full"
              style={{ background: PAPER, padding: 12, boxShadow: '0 24px 60px rgba(6,8,60,0.45)' }}
              whileHover={{ y: -6 }}
              transition={{ ease: EASE, duration: 0.4 }}
            >
              <img src={shot.src} alt={shot.alt} className="block w-full h-auto" />
            </motion.div>
            <span className="block mt-4 text-left text-[11px] tracking-[0.16em] uppercase" style={{ color: MINT }}>
              {t('Klik for at se stort', 'Click to view large')}
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  )
}

function FormatScene({ t, reduce, onZoom, wide, tall }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const tallX = useTransform(scrollYProgress, [0.1, 0.58], ['150%', '0%'])
  const tallScale = useTransform(scrollYProgress, [0.1, 0.58], [1.24, 1])
  const wideY = useTransform(scrollYProgress, [0.46, 0.76], ['30%', '0%'])
  const wideOpacity = useTransform(scrollYProgress, [0.46, 0.68], [0, 1])
  const labelOpacity = useTransform(scrollYProgress, [0.62, 0.8], [0, 1])

  return (
    <section ref={ref} className="relative hidden md:block" style={{ height: '220vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="w-full max-w-[1180px] mx-auto px-10 flex items-end justify-center gap-10">
          <motion.button
            type="button"
            onClick={() => onZoom(tall)}
            className="relative w-[30%] cursor-zoom-in"
            style={reduce ? {} : { x: tallX, scale: tallScale }}
          >
            <img src={tall.src} alt={tall.alt} className="block w-full h-auto" style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }} />
            <motion.span
              className="block mt-4 text-left text-[11px] tracking-[0.16em] uppercase"
              style={{ color: YELLOW, opacity: reduce ? 1 : labelOpacity }}
            >
              {t('Stående · mobilvisning og print', 'Portrait · mobile view and print')}
            </motion.span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => onZoom(wide)}
            className="relative w-[56%] cursor-zoom-in"
            style={reduce ? {} : { y: wideY, opacity: wideOpacity }}
          >
            <img src={wide.src} alt={wide.alt} className="block w-full h-auto" style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }} />
            <motion.span
              className="block mt-4 text-left text-[11px] tracking-[0.16em] uppercase"
              style={{ color: YELLOW, opacity: reduce ? 1 : labelOpacity }}
            >
              {t('Liggende · hjemmeside i computerformat', 'Landscape · website on desktop')}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

function FormatStack({ t, onZoom, wide, tall }) {
  return (
    <div className="md:hidden px-6 pt-12 pb-4 space-y-10">
      {[
        { shot: tall, label: t('Stående · mobilvisning og print', 'Portrait · mobile view and print') },
        { shot: wide, label: t('Liggende · hjemmeside i computerformat', 'Landscape · website on desktop') },
      ].map(({ shot, label }) => (
        <button key={shot.src} type="button" onClick={() => onZoom(shot)} className="block w-full cursor-zoom-in">
          <img src={shot.src} alt={shot.alt} className="block w-full h-auto" style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.35)' }} />
          <span className="block mt-3 text-left text-[11px] tracking-[0.16em] uppercase" style={{ color: YELLOW }}>
            {label}
          </span>
        </button>
      ))}
    </div>
  )
}

function GreenSMCase({ t, reduce, onZoom, wide, tall }) {
  return (
    <section style={{ background: `linear-gradient(180deg, ${TEAL_DEEP} 0%, ${NIGHT} 100%)`, color: '#EAF7F6' }}>
      <div className="px-6 md:px-10 pt-24 md:pt-32">
        <Reveal className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <p className="leading-none mb-3" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 26, color: YELLOW }}>
              02
            </p>
            <h2 className="leading-[1.05]" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(28px, 3.4vw, 46px)' }}>
              {t('GreenSM', 'GreenSM')}
            </h2>
            <span className="block mt-5" style={{ width: 46, height: 2, background: TEAL }} />
          </div>
          <div className="space-y-5 text-[16px] md:text-[18px] leading-relaxed" style={{ opacity: 0.85 }}>
            <p>
              {t(
                'Rekruttering af taxachauffører, hvor det samme budskab skulle leve på to forskellige flader: en liggende til hjemmesiden i computerformat, og en stående til mobilvisning, opslag og print.',
                'Recruiting taxi drivers, where the same message had to live on two different surfaces: a landscape one for the website on desktop, and a portrait one for mobile, posters and print.',
              )}
            </p>
            <p>
              {t(
                'Informationen er den samme, men rækkefølgen skifter. Man skimmer en skærm og går forbi et opslag, så det der skal huskes - info-mødet hver onsdag - står forrest begge steder.',
                'The information is the same, but the order changes. You skim a screen and walk past a poster, so the thing to remember - the info meeting every Wednesday - sits up front in both.',
              )}
            </p>
          </div>
        </Reveal>
      </div>

      <FormatScene t={t} reduce={reduce} onZoom={onZoom} wide={wide} tall={tall} />
      <FormatStack t={t} onZoom={onZoom} wide={wide} tall={tall} />

      <div className="pb-24 md:pb-32" />
    </section>
  )
}

function Daily({ t }) {
  const items = [
    {
      title: t('Web', 'Web'),
      body: t('Bricksite · opdatering og optimering', 'Bricksite · updates and optimisation'),
    },
    {
      title: t('Grafik', 'Graphics'),
      body: t('Figma · PowerPoint · brochurer, plakater, oplæg', 'Figma · PowerPoint · brochures, posters, decks'),
    },
    {
      title: t('Events', 'Events'),
      body: t('Jobmatch · workshops · netværksgrupper', 'Job matching · workshops · network groups'),
    },
    {
      title: t('Administration', 'Administration'),
      body: t('Excel · dokumentation · registrering · referat', 'Excel · documentation · registration · minutes'),
    },
  ]

  return (
    <section className="px-6 md:px-10 py-24 md:py-32" style={{ background: PAPER, color: BLUE_DEEP }}>
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <p className="text-[11px] tracking-[0.22em] uppercase mb-6" style={{ color: BLUE, opacity: 0.6 }}>
            {t('Til dagligt', 'Day to day')}
          </p>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-10 md:gap-8">
          {items.map((item) => (
            <Reveal key={item.title}>
              <span className="block mb-4" style={{ width: 34, height: 2, background: ROSE }} />
              <h3 className="mb-3 leading-tight" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 22 }}>
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed" style={{ opacity: 0.78 }}>
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HRS() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const [zoom, setZoom] = useState(null)
  const next = projects.find((p) => p.slug === 'o-bar')

  const event = {
    src: `${IMG}/hrs-brancheskifte-event.png`,
    alt: t('Invitation til brancheskifte-event', 'Invitation for the career-change event'),
  }
  const wide = {
    src: `${IMG}/hrs-greensm-liggende.png`,
    alt: t('Liggende annonce: bliv taxachauffør hos GreenSM', 'Landscape ad: become a taxi driver at GreenSM'),
  }
  const tall = {
    src: `${IMG}/hrs-greensm-staaende.png`,
    alt: t('Stående opslag: bliv taxachauffør hos GreenSM', 'Portrait poster: become a taxi driver at GreenSM'),
  }

  return (
    <main className="min-h-screen">
      <Hero t={t} />
      <Context t={t} />
      <EventCase t={t} onZoom={setZoom} shot={event} />
      <GreenSMCase t={t} reduce={reduce} onZoom={setZoom} wide={wide} tall={tall} />
      <Daily t={t} />
      <NextProject project={next} />
      <Lightbox shot={zoom} onClose={() => setZoom(null)} label={t('Luk', 'Close')} />
    </main>
  )
}
