import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Nav from './components/Nav'
import Home from './pages/Home'
import Work from './pages/Work'
import WorkDetail from './pages/WorkDetail'
import About from './pages/About'
import CV from './pages/CV'

export default function App() {
  return (
    <LanguageProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arbejde" element={<Work />} />
        <Route path="/arbejde/:slug" element={<WorkDetail />} />
        <Route path="/om" element={<About />} />
        <Route path="/cv" element={<CV />} />
      </Routes>
    </LanguageProvider>
  )
}
