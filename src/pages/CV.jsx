import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { experience } from '../data/experience'

const LINKEDIN = 'https://www.linkedin.com/in/casandra-linde-pedersen'

const skills = [
  {
    category: { da: 'Design', en: 'Design' },
    items: ['Grafisk design', 'Visuel identitet', 'Brand Identity', 'Typografi', 'UX / Produktdesign'],
  },
  {
    category: { da: 'Software', en: 'Software' },
    items: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Figma', 'Canva', 'Premiere Pro'],
  },
  {
    category: { da: 'Marketing', en: 'Marketing' },
    items: ['Social Media', 'Fotografi', 'Retouchering', 'SEO', 'Copywriting'],
  },
  {
    category: { da: 'Forretning', en: 'Business' },
    items: ['Projektledelse', 'HR', 'Økonomi', 'Salg', 'Kundeservice'],
  },
]

const ease = [0.22, 1, 0.36, 1]

function Section({ label, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.6, delay } }}
      className="grid grid-cols-[180px_1fr] gap-x-12 py-8 border-t border-[var(--color-text)]/10"
    >
      <span
        className="text-[52px] leading-none opacity-40"
        style={{ fontFamily: 'Montigny, cursive' }}
      >
        {label}
      </span>
      <div>{children}</div>
    </motion.div>
  )
}

function ExperienceRow({ item, t, open, onToggle }) {
  const hasDetails = !!item.details

  return (
    <div className="border-b border-[var(--color-text)]/06 last:border-0">
      <button
        onClick={() => hasDetails && onToggle()}
        className={`w-full flex gap-8 py-3 text-left group ${hasDetails ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <span className="shrink-0 text-[14px] opacity-30 w-24 pt-px" style={{ fontFamily: 'VSOP, serif' }}>
          {item.year}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] leading-snug transition-opacity group-hover:opacity-60">
            {t(item.title.da, item.title.en)}
          </p>
          {item.note && (
            <p className="text-[14px] opacity-45 mt-0.5">{t(item.note.da, item.note.en)}</p>
          )}
        </div>
        <span className="text-[14px] opacity-35 shrink-0 text-right pt-px">{item.place}</span>
        {hasDetails && (
          <span className="text-[13px] opacity-25 shrink-0 pt-px w-4">
            {open ? '−' : '+'}
          </span>
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.35 } }}
            exit={{ height: 0, opacity: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.22 } }}
            className="overflow-hidden"
          >
            <div className="ml-28 mb-5 pl-4 border-l border-[var(--color-burgundy)]/30">
              <p className="text-[15px] opacity-60 leading-relaxed">
                {t(item.details.da, item.details.en)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ExperienceList({ items, t }) {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <>
      {items.map((item, i) => (
        <ExperienceRow
          key={i}
          item={item}
          t={t}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </>
  )
}

export default function CV() {
  const { t } = useLanguage()
  const constraintsRef = useRef(null)

  const work = experience.filter(e => e.type === 'work')
  const edu = experience.filter(e => e.type === 'edu')

  return (
    <main
      ref={constraintsRef}
      className="min-h-screen bg-[var(--color-base)] relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-10 pt-16 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.7 } }}
          className="flex justify-between items-start mb-2"
        >
          <div>
            <h1
              className="text-[72px] leading-[0.9] tracking-tight"
              style={{ fontFamily: 'VSOP, serif' }}
            >
              Casandra
              <br />
              Linde Pedersen
            </h1>
            <p className="mt-5 text-[15px] opacity-60 max-w-xs leading-snug">
              {t(
                'Grafisk designer med forretningsforståelse',
                'Graphic designer with a business mindset'
              )}
            </p>
          </div>

          {/* Draggable polaroid */}
          <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.04, rotate: 2 }}
            initial={{ opacity: 0, rotate: -3, x: 20 }}
            animate={{ opacity: 1, rotate: -3, x: 0, transition: { ease, duration: 0.8, delay: 0.2 } }}
            className="shrink-0 bg-white p-3 pb-8 shadow-md cursor-grab active:cursor-grabbing select-none print:hidden"
            style={{ width: 160 }}
          >
            <img
              src="/images/mefinalpic.png"
              alt="Casandra"
              className="w-full object-cover object-top"
              style={{ height: 180 }}
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* Contact row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.6, delay: 0.15 } }}
          className="flex gap-4 items-center mt-8 mb-2"
        >
          <a
            href="mailto:casandralpedersen@gmail.com"
            className="text-[12px] opacity-50 hover:opacity-100 transition-opacity tracking-wide"
          >
            casandralpedersen@gmail.com
          </a>
          <span className="opacity-20">·</span>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] opacity-50 hover:opacity-100 transition-opacity tracking-wide"
          >
            linkedin.com/in/casandra-linde-pedersen
          </a>
          <span className="opacity-20 ml-auto" />
          <button
            onClick={() => window.print()}
            className="ml-auto px-4 py-2 border border-[var(--color-text)]/20 text-[12px] tracking-wide hover:border-[var(--color-text)]/50 transition-colors print:hidden"
          >
            {t('Download PDF', 'Download PDF')}
          </button>
        </motion.div>

        {/* Sections */}
        <Section label={t('Erfaring', 'Experience')} delay={0.25}>
          <ExperienceList items={work} t={t} />
        </Section>

        <Section label={t('Uddannelse', 'Education')} delay={0.35}>
          <ExperienceList items={edu} t={t} />
        </Section>

        <Section label={t('Kompetencer', 'Skills')} delay={0.45}>
          <div className="space-y-4">
            {skills.map((group, i) => (
              <div key={i} className="flex gap-3 items-baseline">
                <span className="text-[11px] opacity-35 w-24 shrink-0 tracking-wide uppercase">
                  {t(group.category.da, group.category.en)}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map(skill => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] tracking-wide"
                      style={{
                        background: 'var(--color-burgundy)10',
                        color: 'var(--color-text)',
                        border: '1px solid var(--color-text)22',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section label={t('Sprog', 'Languages')} delay={0.5}>
          <p className="text-[14px] opacity-70 tracking-wide">
            Dansk&nbsp;&nbsp;·&nbsp;&nbsp;Engelsk&nbsp;&nbsp;·&nbsp;&nbsp;Spansk
          </p>
        </Section>

      </div>

      <style>{`
        @media print {
          body { background: white; }
          nav { display: none !important; }
        }
      `}</style>
    </main>
  )
}
