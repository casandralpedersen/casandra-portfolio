import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { experience } from '../data/experience'

const LINKEDIN = 'https://www.linkedin.com/in/casandra-linde-pedersen'

const skills = [
  {
    category: { da: 'Design', en: 'Design' },
    items: ['Grafisk design', 'Visuel identitet', 'Brand Identity', 'UX / Produktdesign'],
  },
  {
    category: { da: 'Software', en: 'Software' },
    items: ['Figma', 'Canva Pro', 'Claude', 'Power Automate', 'PowerPoint', 'iMovie'],
  },
  {
    category: { da: 'Marketing', en: 'Marketing' },
    items: ['Social Media', 'Fotografi', 'Retouchering'],
  },
  {
    category: { da: 'Forretning', en: 'Business' },
    items: ['Projektledelse', 'HR', 'Økonomi', 'Salg', 'Kundeservice', 'Excel'],
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
        className="text-[54px] leading-none opacity-70"
        style={{ fontFamily: 'Montigny, cursive', color: 'var(--color-text)' }}
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
        <span className="shrink-0 text-[14px] opacity-50 w-24 pt-px" style={{ fontFamily: 'VSOP, serif' }}>
          {item.year}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] opacity-80 leading-snug transition-opacity group-hover:opacity-100">
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

  const work = experience.filter(e => e.type === 'work')
  const edu = experience.filter(e => e.type === 'edu')

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-10 pt-8 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.7 } }}
          className="mb-1"
        >
          <h1
            className="text-[72px] leading-[0.9] tracking-tight"
            style={{ fontFamily: 'VSOP, serif' }}
          >
            Casandra
            <br />
            Linde Pedersen
          </h1>
          <p className="mt-4 text-[15px] opacity-60 max-w-xs leading-snug">
            {t(
              'Grafisk designer med forretningsforståelse',
              'Graphic designer with a business mindset'
            )}
          </p>
        </motion.div>

        {/* Contact row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.6, delay: 0.15 } }}
          className="flex gap-4 items-center mt-6 mb-2"
        >
          <a
            href="mailto:casandralpedersen@gmail.com"
            className="flex items-center gap-1.5 text-[12px] opacity-50 hover:opacity-100 transition-opacity tracking-wide"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
            casandralpedersen@gmail.com
          </a>
          <span className="opacity-20">·</span>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12px] opacity-50 hover:opacity-100 transition-opacity tracking-wide"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
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
                <span className="text-[11px] w-24 shrink-0 tracking-wide uppercase font-semibold" style={{ color: 'var(--color-text)' }}>
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
                        opacity: 0.55,
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
          <div className="mt-3 space-y-3 max-w-xl">
            {[
              {
                language: t('Dansk', 'Danish'),
                level: 'C2',
              },
              {
                language: t('Engelsk', 'English'),
                level: 'C2',
              },
              {
                language: t('Spansk', 'Spanish'),
                level: 'B1',
              },
            ].map(item => (
              <div
                key={item.language}
                className="grid grid-cols-[minmax(120px,160px)_1fr] items-baseline gap-x-6 border-b border-[var(--color-text)]/8 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-[18px] opacity-72">{item.language}</span>
                <span className="text-[14px] opacity-48 tracking-wide">{item.level}</span>
              </div>
            ))}
          </div>
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
