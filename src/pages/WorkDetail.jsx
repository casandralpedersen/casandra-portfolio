import { useParams } from 'react-router-dom'

export default function WorkDetail() {
  const { slug } = useParams()
  return <main className="min-h-screen bg-[var(--color-base)]"><p className="p-8 font-body">Projekt: {slug} — under opbygning</p></main>
}
