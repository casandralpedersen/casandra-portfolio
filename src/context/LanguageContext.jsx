import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'da')

  function toggleLang() {
    const next = lang === 'da' ? 'en' : 'da'
    localStorage.setItem('lang', next)
    setLang(next)
  }

  function t(da, en) {
    return lang === 'da' ? da : en
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
