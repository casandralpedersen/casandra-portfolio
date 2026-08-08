export const LINKEDIN = 'https://www.linkedin.com/in/casandra-linde-pedersen'
export const CV_PDF_URL = '/cv/casandra-linde-pedersen-cv.pdf'
export const CV_PDF_NAME = 'Casandra Linde Pedersen - CV.pdf'
export const EASE = [0.22, 1, 0.36, 1]

export const skills = [
  {
    category: { da: 'Design', en: 'Design' },
    items: ['Grafisk design', 'Visuel identitet', 'Brand Identity', 'UX / Produktdesign'],
  },
  {
    category: { da: 'Software', en: 'Software' },
    items: ['Figma', 'Canva Pro', 'Claude', 'PowerPoint', 'iMovie'],
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

export const languages = [
  { da: 'Dansk', en: 'Danish', level: 'C2', pct: 1 },
  { da: 'Engelsk', en: 'English', level: 'C2', pct: 1 },
  { da: 'Spansk', en: 'Spanish', level: 'B1', pct: 0.55 },
]

export function EmailIcon(props) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  )
}

export function LinkedInIcon(props) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function DownloadIcon(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 21h16" />
    </svg>
  )
}
