import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { projects } from '../data/projects'

const fadeUp = {
  hidden: { y: 32, opacity: 0 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7, delay: i * 0.08 },
  }),
}

export default function Work() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen px-10 py-10">
      <motion.h1
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7 } }}
        className="text-[11px] tracking-[0.16em] uppercase opacity-50 mb-8"
      >
        {t('Arbejde', 'Work')}
      </motion.h1>

      <div className="flex flex-col gap-0">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} t={t} />
        ))}
      </div>
    </main>
  )
}

function ProjectRow({ project, index, t }) {
  const isLarge = index === 0 || index === 2

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="show"
    >
      <Link
        to={`/arbejde/${project.slug}`}
        className="group block border-t border-[var(--color-text)]/10 py-4 relative overflow-hidden"
      >
        {/* Hover baggrund */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
          className="absolute inset-0 origin-left pointer-events-none"
          style={{ backgroundColor: project.accent + '0D' }}
        />

        <div className="relative flex items-end justify-between gap-8">
          {/* Venstre: nummer + titel */}
          <div className="flex items-baseline gap-6">
            <span className="text-[11px] opacity-25 w-6 shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h2
                className="leading-tight transition-opacity group-hover:opacity-100 opacity-90"
                style={{
                  fontFamily: 'VSOP, serif',
                  fontSize: isLarge ? 'clamp(28px, 3.5vw, 52px)' : 'clamp(20px, 2.5vw, 38px)',
                }}
              >
                {t(project.title.da, project.title.en)}
              </h2>
              <p className="text-[11px] tracking-[0.1em] uppercase opacity-40 mt-1">
                {t(project.category.da, project.category.en)} · {project.year}
              </p>
            </div>
          </div>

          {/* Højre: cover eller farveblok */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
            className="shrink-0 overflow-hidden"
            style={{
              width: isLarge ? 180 : 120,
              height: isLarge ? 110 : 75,
              backgroundColor: project.accent + '33',
            }}
          >
            {project.cover && (
              <img
                src={project.cover}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </div>

        {/* Pil */}
        <motion.span
          initial={{ x: -4, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-sm opacity-0 group-hover:opacity-60 pr-2"
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  )
}
