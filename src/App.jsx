import { Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Nav from './components/Nav'
import Grain from './components/Grain'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import WorkDetail from './pages/WorkDetail'
import About from './pages/About'
import CV from './pages/CV'

export default function App() {
  return (
    <LanguageProvider>
      <Grain />
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arbejde" element={<Navigate to="/" replace />} />
        <Route path="/arbejde/:slug" element={<WorkDetail />} />
        <Route path="/om" element={<About />} />
        <Route path="/cv" element={<CV />} />
      </Routes>
    </LanguageProvider>
  )
}
