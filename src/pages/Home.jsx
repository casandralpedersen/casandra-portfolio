import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { projects } from '../data/projects'

const NAME_LETTERS = ['C', 'a', 's', 'a', 'n', 'd', 'r', 'a']

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.5 } },
}

const letterVariants = {
  hidden: { y: 50, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.65 } },
}

const services = [
  {
    title: { da: 'Visuel identitet & grafisk design', en: 'Visual identity & graphic design' },
    desc: { da: 'Logo, farvepalet, typografi og retningslinjer der hænger sammen', en: 'Logo, color palette, typography and guidelines that hold together' },
  },
  {
    title: { da: 'E-handel & branding', en: 'E-commerce & branding' },
    desc: { da: 'Webshops, produktfoto og mærkevareopbygning der konverterer', en: 'Webshops, product photography and brand building that converts' },
  },
  {
    title: { da: 'Fotografi', en: 'Photography' },
    desc: { da: 'Portræt-, produkt- og stemningsfotografi', en: 'Portrait, product and mood photography' },
  },
  {
    title: { da: 'Strategi & drift', en: 'Strategy & operations' },
    desc: { da: 'Marketing og forretningsforståelse der løfter designet', en: 'Marketing and business insight that elevates the design' },
  },
]

const fadeUp = (delay) => ({
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7, delay } },
})

function ProjectRow({ project, index, t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLarge = index === 0 || index === 2

  return (
    <motion.div
      ref={ref}
      initial={{ y: 32, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7, delay: index * 0.06 } } : {}}
    >
      <Link
        to={`/arbejde/${project.slug}`}
        className="group block border-t border-[var(--color-text)]/10 py-8 relative overflow-hidden"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
          className="absolute inset-0 origin-left pointer-events-none"
          style={{ backgroundColor: project.accent + '0D' }}
        />
        <div className="relative flex items-center justify-between gap-8">
          <div className="flex items-baseline gap-6">
            <span className="text-[11px] opacity-25 w-6 shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h2
                className="leading-tight"
                style={{
                  fontFamily: 'VSOP, serif',
                  fontSize: isLarge ? 'clamp(36px, 5vw, 72px)' : 'clamp(24px, 3.2vw, 52px)',
                }}
              >
                {t(project.title.da, project.title.en)}
              </h2>
              <p className="text-[11px] tracking-[0.1em] uppercase opacity-40 mt-1">
                {t(project.category.da, project.category.en)} · {project.year}
              </p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
            className="shrink-0 overflow-hidden"
            style={{
              width: isLarge ? 280 : 180,
              height: isLarge ? 180 : 120,
              backgroundColor: project.accent + '33',
            }}
          >
            {project.cover && (
              <img src={project.cover} alt="" className="w-full h-full object-cover" />
            )}
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

function ServiceRow({ service, index, t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 24, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6, delay: index * 0.06 } } : {}}
      className="border-t border-[var(--color-text)]/10 py-7 flex items-baseline gap-6"
    >
      <span className="text-[11px] opacity-25 w-6 shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <h3 style={{ fontFamily: 'VSOP, serif', fontSize: 'clamp(22px, 2.6vw, 36px)' }}>
          {t(service.title.da, service.title.en)}
        </h3>
        <p className="text-[14px] opacity-50 mt-1">
          {t(service.desc.da, service.desc.en)}
        </p>
      </div>
    </motion.div>
  )
}

function Services({ t }) {
  return (
    <section className="px-10 py-20">
      <p className="text-[11px] tracking-[0.16em] uppercase opacity-50 mb-16">
        {t('Det her laver jeg', 'What I do')}
      </p>
      {services.map((service, i) => (
        <ServiceRow key={i} service={service} index={i} t={t} />
      ))}
      <div className="border-t border-[var(--color-text)]/10" />
    </section>
  )
}

function AboutTeaser({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="px-10 py-24 flex items-center gap-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.8 } } : {}}
        className="flex-1 max-w-md relative overflow-hidden"
        style={{ height: 420 }}
      >
        <img
          src="/images/sitwavemepic.png"
          alt="Casandra"
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--color-base) 0%, transparent 30%)' }}
        />
      </motion.div>

      <div className="flex-1 max-w-md">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7 } } : {}}
          className="text-[11px] tracking-[0.16em] uppercase opacity-50 mb-6"
        >
          {t('Om mig', 'About me')}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7, delay: 0.1 } } : {}}
          className="space-y-4 text-[15px] leading-relaxed opacity-75"
        >
          <p>
            {t(
              'Jeg kom til design via forretning, ikke omvendt. Baggrunden spænder fra grafisk design og fotografi til UX og erfaring som COO.',
              'I came to design through business, not the other way around. My background spans graphic design, photography, UX, and experience as COO.'
            )}
          </p>
          <p>
            {t(
              'Det giver et blik for hvad der faktisk virker - ikke kun hvad der ser godt ud.',
              'It gives me an eye for what actually works - not just what looks good.'
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
            {t('Læs hele historien →', 'Read the full story →')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  const { t } = useLanguage()
  const constraintsRef = useRef(null)

  return (
    <main className="bg-[var(--color-base)] overflow-x-hidden">

      {/* Hero */}
      <section
        ref={constraintsRef}
        className="texture relative min-h-screen overflow-hidden px-10 pt-0 pb-24 flex flex-col justify-end"
      >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 1.0, delay: 0.05 } }}
          className="absolute top-0 right-0 w-[55%] h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <img
            src="/images/mefinalpic.png"
            alt="Casandra"
            className="w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--color-base) 0%, transparent 20%)' }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--color-base))' }}
          />
        </motion.div>

        <div className="relative z-10 flex flex-col">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex items-baseline"
            aria-label="Casandra"
          >
            {NAME_LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className="block"
                style={{
                  fontFamily: i === 0 ? 'Montigny, cursive' : 'VSOP, serif',
                  fontSize: i === 0 ? '15vw' : '8.5vw',
                  lineHeight: 0.9,
                  color: 'var(--color-burgundy)',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp(0.9)}
            initial="hidden"
            animate="show"
            className="mt-5 text-[11px] tracking-[0.14em] uppercase opacity-55 whitespace-nowrap"
          >
            {t('Grafisk designer med forretningsforståelse', 'Graphic designer with business insight')}
          </motion.p>

          <motion.p
            variants={fadeUp(1.05)}
            initial="hidden"
            animate="show"
            className="mt-3 text-[15px] leading-relaxed opacity-75 max-w-sm"
          >
            {t(
              'Jeg kom til design via forretning, ikke omvendt. Det kan mærkes i arbejdet.',
              'I came to design through business, not the other way around. You can feel it in the work.'
            )}
          </motion.p>
        </div>

        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.05}
          dragTransition={{ power: 0.1, timeConstant: 600, modifyTarget: t => t }}
          whileDrag={{ scale: 1.04, cursor: 'grabbing' }}
          initial={{ opacity: 0, rotate: 4, y: 10 }}
          animate={{ opacity: 1, rotate: 3, y: 0, transition: { delay: 1.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="absolute z-10 cursor-grab select-none"
          style={{ top: '18%', left: '56%' }}
        >
          <div className="px-5 py-4 border border-[var(--color-burgundy)] bg-[var(--color-base)]" style={{ width: 160 }}>
            <p className="text-[10px] tracking-[0.12em] uppercase opacity-40 mb-1">
              {t('ITU København', 'ITU Copenhagen')}
            </p>
            <p style={{ fontFamily: 'VSOP, serif', fontSize: 25, lineHeight: 1.1, color: 'var(--color-blue)' }}>B-DDIT</p>
            <p className="text-[10px] opacity-40 mt-2">{t('Design & Digital IT', 'Design & Digital IT')}</p>
          </div>
        </motion.div>
      </section>

      {/* Om mig-teaser */}
      <AboutTeaser t={t} />

      {/* Det her laver jeg */}
      <Services t={t} />

      {/* Projekter */}
      <section id="arbejde" className="px-10 py-20">
        <p className="text-[11px] tracking-[0.16em] uppercase opacity-50 mb-16">
          {t('Arbejde', 'Work')}
        </p>
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} t={t} />
        ))}
        <div className="border-t border-[var(--color-text)]/10" />
      </section>

    </main>
  )
}
