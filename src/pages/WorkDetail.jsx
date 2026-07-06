import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { projects } from '../data/projects'
import EtsyComposeStudio from './work/EtsyComposeStudio'
import OBar from './work/OBar'

const pages = {
  'etsy-composestudio': EtsyComposeStudio,
  'o-bar': OBar,
}

export default function WorkDetail() {
  const { slug } = useParams()
  const { t } = useLanguage()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-body opacity-60">{t('Projektet findes ikke.', 'This project doesn’t exist.')}</p>
        <Link to="/" className="text-[11px] tracking-[0.16em] uppercase opacity-50 hover:opacity-90">
          ← {t('Forsiden', 'Home')}
        </Link>
      </main>
    )
  }

  const Page = pages[slug]
  if (Page) return <Page project={project} />

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p
        style={{ fontFamily: '"ITCGaramond", serif', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 56px)', color: project.accent }}
      >
        {t(project.title.da, project.title.en)}
      </p>
      <p className="font-body opacity-50">{t('Under opbygning', 'Under construction')}</p>
      <Link to="/" className="text-[11px] tracking-[0.16em] uppercase opacity-50 hover:opacity-90 mt-2">
        ← {t('Forsiden', 'Home')}
      </Link>
    </main>
  )
}
