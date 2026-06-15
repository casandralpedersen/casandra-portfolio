import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { EMAIL, ease } from './homeContent'

const projectSectionClasses = {
  editorial: 'mx-auto grid max-w-[1500px] border-t border-[var(--color-text)]/20 px-5 sm:px-8 lg:grid-cols-2 lg:px-12',
  scrapbook: 'mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2',
  lab: 'mx-auto grid max-w-6xl gap-px border border-[var(--color-text)]/15 bg-[var(--color-text)]/15 md:grid-cols-2',
  cinema: 'mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2',
}

const projectArticleClasses = {
  editorial: 'group border-b border-[var(--color-text)]/20 lg:odd:border-r',
  scrapbook: 'group rotate-[-1deg] bg-[#fffdf5] p-3 shadow-lg even:rotate-[1deg]',
  lab: 'group bg-[var(--color-base)]',
  cinema: 'group overflow-hidden bg-[var(--color-text)] text-[var(--color-base)]',
}

const projectLinkClasses = {
  editorial: 'grid min-h-[340px] grid-rows-[auto_1fr_auto] gap-8 overflow-hidden px-2 py-8 sm:min-h-[430px] sm:px-7 sm:py-10',
  scrapbook: 'grid min-h-[320px] grid-rows-[1fr_auto] gap-5',
  lab: 'grid min-h-[280px] grid-rows-[auto_1fr_auto] gap-6 p-6',
  cinema: 'grid min-h-[360px] grid-rows-[1fr_auto] gap-6 p-6',
}

const projectImageClasses = {
  editorial: 'h-full min-h-[170px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]',
  scrapbook: 'h-full min-h-[190px] w-full object-cover',
  lab: 'h-full min-h-[150px] w-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0',
  cinema: 'h-full min-h-[220px] w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100',
}

const projectMetaClasses = {
  editorial: 'flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.18em] opacity-55',
  scrapbook: 'flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.16em] opacity-55',
  lab: 'flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] opacity-55',
  cinema: 'flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] opacity-65',
}

const projectTitleClasses = {
  editorial: 'max-w-[12ch] text-[clamp(2.7rem,6vw,6.5rem)] leading-[0.86]',
  scrapbook: 'text-4xl leading-none',
  lab: 'text-4xl leading-none',
  cinema: 'text-[clamp(2.7rem,6vw,5.5rem)] leading-[0.9]',
}

const contactClasses = {
  editorial: 'mx-auto grid max-w-[1500px] gap-12 px-5 py-24 sm:px-8 md:grid-cols-[0.65fr_1.35fr] lg:px-12 lg:py-36',
  scrapbook: 'mx-auto my-20 max-w-5xl rotate-[1deg] bg-[#fffdf5] px-6 py-20 shadow-xl sm:px-12',
  lab: 'mx-auto grid max-w-6xl gap-10 border-x border-t border-[var(--color-text)]/20 px-6 py-20 md:grid-cols-2',
  cinema: 'bg-[var(--color-text)] px-6 py-28 text-[var(--color-base)] sm:px-12',
}

const contactTitleClasses = {
  editorial: 'max-w-[12ch] text-[clamp(3rem,7vw,7.5rem)] leading-[0.88]',
  scrapbook: 'max-w-[15ch] text-[clamp(3rem,7vw,6rem)] leading-[0.9]',
  lab: 'max-w-[14ch] text-[clamp(2.7rem,6vw,5.5rem)] leading-[0.92]',
  cinema: 'mx-auto max-w-[12ch] text-center text-[clamp(3rem,8vw,8rem)] leading-[0.86]',
}

const contactLinksClasses = {
  editorial: 'flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--color-text)]/20 pt-5 text-xs uppercase tracking-[0.16em]',
  scrapbook: 'mt-10 flex flex-wrap gap-6 text-sm underline decoration-1 underline-offset-4',
  lab: 'mt-10 flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.14em]',
  cinema: 'mx-auto mt-12 flex flex-wrap justify-center gap-8 text-xs uppercase tracking-[0.18em]',
}

export function SharedProjects({ t, variant }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="arbejde"
      data-shared-projects
      aria-labelledby={`${variant}-projects-title`}
      className="py-16 sm:py-24"
    >
      <header className="mx-auto flex max-w-[1500px] items-end justify-between gap-6 px-5 pb-8 sm:px-8 lg:px-12">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">{t('Udvalgt arbejde', 'Selected work')}</p>
          <h2
            id={`${variant}-projects-title`}
            className="mt-3 text-[clamp(3rem,7vw,7rem)] leading-[0.9]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('Projekter', 'Projects')}
          </h2>
        </div>
        <span className="hidden text-[10px] uppercase tracking-[0.18em] opacity-40 sm:block">
          {String(projects.length).padStart(2, '0')} {t('arbejder', 'works')}
        </span>
      </header>

      <div className={projectSectionClasses[variant]}>
        {projects.map((project, index) => (
          <motion.article
            key={project.slug}
            data-shared-project-card
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ ease, duration: shouldReduceMotion ? 0 : 0.65, delay: shouldReduceMotion ? 0 : index * 0.06 }}
            className={projectArticleClasses[variant]}
          >
            <Link to={`/arbejde/${project.slug}`} className={projectLinkClasses[variant]}>
              <div className={projectMetaClasses[variant]}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{project.year}</span>
              </div>

              <div className="overflow-hidden" style={{ backgroundColor: `${project.accent}22` }}>
                {project.cover && (
                  <img src={project.cover} alt="" className={projectImageClasses[variant]} />
                )}
              </div>

              <div className="flex items-end justify-between gap-6">
                <div>
                  <h3 className={projectTitleClasses[variant]} style={{ fontFamily: 'var(--font-display)' }}>
                    {t(project.title.da, project.title.en)}
                  </h3>
                  <p className="mt-3 max-w-sm text-xs leading-relaxed opacity-55">
                    {t(project.category.da, project.category.en)}
                  </p>
                </div>
                <span aria-hidden="true" className="text-2xl opacity-45 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function SharedContact({ t, variant }) {
  return (
    <section data-shared-contact className={contactClasses[variant]}>
      <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">{t('Næste kapitel', 'Next chapter')}</p>
      <div>
        <h2 className={contactTitleClasses[variant]} style={{ fontFamily: 'var(--font-display)' }}>
          {t('Nok om mig. Hvad arbejder du på?', 'Enough about me. What are you working on?')}
        </h2>
        <div className={contactLinksClasses[variant]}>
          <a href={`mailto:${EMAIL}`}>{t('Skriv til mig', 'Email me')} ↗</a>
          <Link to="/om">{t('Læs hele historien', 'Read the full story')} →</Link>
        </div>
      </div>
    </section>
  )
}
