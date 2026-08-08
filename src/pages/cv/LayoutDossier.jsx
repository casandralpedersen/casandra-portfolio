import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { experience } from '../../data/experience'
import { LINKEDIN, CV_PDF_URL, CV_PDF_NAME, EASE as ease, skills, languages, EmailIcon, LinkedInIcon, DownloadIcon } from './shared.jsx'

function TimelineRow({ item, t, open, onToggle, isLast }) {
  const hasDetails = !!item.details

  return (
    <div className="relative grid grid-cols-[68px_1fr] gap-x-5">
      <div className="relative flex flex-col items-center">
        <span
          className="mt-[7px] w-[7px] h-[7px] rounded-full shrink-0 z-10"
          style={{ background: 'var(--color-burgundy)' }}
        />
        {!isLast && <span className="flex-1 w-px mt-1" style={{ background: 'rgba(41,92,125,0.15)' }} />}
      </div>

      <button
        onClick={() => hasDetails && onToggle()}
        className={`w-full flex items-start gap-4 text-left pb-7 pr-2 -mx-2 px-2 rounded-md transition-colors ${hasDetails ? 'cursor-pointer hover:bg-[var(--color-text)]/[0.04]' : 'cursor-default'} group`}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[0.12em] uppercase opacity-45 mb-1">{item.year}</p>
          <p className="text-[15px] font-medium leading-snug transition-opacity" style={{ color: 'var(--color-text)' }}>
            {t(item.title.da, item.title.en)}
          </p>
          <p className="text-[13px] opacity-55 mt-0.5">{item.place}</p>
          {item.note && <p className="text-[12px] opacity-40 mt-0.5">{t(item.note.da, item.note.en)}</p>}

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1, transition: { ease, duration: 0.32 } }}
                exit={{ height: 0, opacity: 0, transition: { ease, duration: 0.2 } }}
                className="overflow-hidden"
              >
                <p className="text-[13px] opacity-60 leading-relaxed mt-3 max-w-lg">
                  {t(item.details.da, item.details.en)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {hasDetails && (
          <span className="text-[13px] opacity-30 shrink-0 pt-0.5 group-hover:opacity-70 transition-opacity">
            {open ? '−' : '+'}
          </span>
        )}
      </button>
    </div>
  )
}

function Timeline({ items, t }) {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <div>
      {items.map((item, i) => (
        <TimelineRow
          key={i}
          item={item}
          t={t}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          isLast={i === items.length - 1}
        />
      ))}
    </div>
  )
}

function SideHeading({ children }) {
  return (
    <p className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
      {children}
    </p>
  )
}

function MainHeading({ children }) {
  return (
    <h2 className="text-[13px] tracking-[0.18em] uppercase font-semibold mb-6 pb-3 border-b" style={{ color: 'var(--color-text)', borderColor: 'rgba(41,92,125,0.15)' }}>
      {children}
    </h2>
  )
}

export default function LayoutDossier() {
  const { t } = useLanguage()

  const work = experience.filter(e => e.type === 'work')
  const edu = experience.filter(e => e.type === 'edu')

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-10 pb-24 grid md:grid-cols-[240px_1fr] gap-x-14 gap-y-10">

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.6 } }}
          className="md:sticky md:top-24 md:self-start"
        >
          <h1 className="text-[30px] leading-[1.05]" style={{ fontFamily: 'VSOP, serif', color: 'var(--color-text)' }}>
            Casandra Linde Pedersen
          </h1>
          <p className="mt-3 text-[13px] opacity-60 leading-snug">
            {t('Grafisk designer med forretningsforståelse', 'Graphic designer with a business mindset')}
          </p>

          <a
            href={CV_PDF_URL}
            download={CV_PDF_NAME}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase transition-opacity hover:opacity-90 print:hidden"
            style={{ background: 'var(--color-burgundy)', color: 'var(--color-base)' }}
          >
            <DownloadIcon />
            {t('Download PDF', 'Download PDF')}
          </a>

          <div className="mt-6 flex flex-col gap-2.5">
            <a href="mailto:casandralpedersen@gmail.com" className="flex items-center gap-2 text-[12px] opacity-55 hover:opacity-100 transition-opacity">
              <EmailIcon /> casandralpedersen@gmail.com
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[12px] opacity-55 hover:opacity-100 transition-opacity">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>

          <div className="mt-8 pt-8 border-t" style={{ borderColor: 'rgba(41,92,125,0.15)' }}>
            <SideHeading>{t('Kompetencer', 'Skills')}</SideHeading>
            <div className="space-y-3.5">
              {skills.map((group, i) => (
                <div key={i}>
                  <p className="text-[10px] tracking-[0.1em] uppercase opacity-45 mb-1">{t(group.category.da, group.category.en)}</p>
                  <p className="text-[13px] leading-snug opacity-75">{group.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t" style={{ borderColor: 'rgba(41,92,125,0.15)' }}>
            <SideHeading>{t('Sprog', 'Languages')}</SideHeading>
            <div className="space-y-3">
              {languages.map((item) => (
                <div key={item.da}>
                  <div className="flex justify-between text-[12px] mb-1">
                    <span className="opacity-75">{t(item.da, item.en)}</span>
                    <span className="opacity-45">{item.level}</span>
                  </div>
                  <div className="h-[3px] w-full rounded-full" style={{ background: 'rgba(41,92,125,0.12)' }}>
                    <div className="h-full rounded-full" style={{ width: `${item.pct * 100}%`, background: 'var(--color-burgundy)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>

        <div className="min-w-0">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.6, delay: 0.1 } }}
            className="mb-12"
          >
            <MainHeading>{t('Erfaring', 'Experience')}</MainHeading>
            <Timeline items={work} t={t} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { ease, duration: 0.6, delay: 0.18 } }}
          >
            <MainHeading>{t('Uddannelse', 'Education')}</MainHeading>
            <Timeline items={edu} t={t} />
          </motion.section>
        </div>
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
