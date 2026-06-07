import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const LINKEDIN = 'https://www.linkedin.com/in/casandra-linde-pedersen'
const EMAIL = 'casandralpedersen@gmail.com'

function NavItem({ to, children }) {
  return (
    <NavLink to={to} className={({ isActive }) =>
      `relative text-sm tracking-wide transition-opacity ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`
    }>
      {({ isActive }) => (
        <>
          {children}
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--color-text)]"
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Nav() {
  const { lang, toggleLang, t } = useLanguage()
  const [contactOpen, setContactOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  function scrollToWork(e) {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById('arbejde')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#arbejde')
      setTimeout(() => document.getElementById('arbejde')?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setContactOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 bg-[var(--color-base)]"
    >
      <NavLink
        to="/"
        className="font-display text-xl tracking-widest uppercase hover:opacity-70 transition-opacity"
      >
        Casandra
      </NavLink>

      <div className="flex items-center gap-7">
        <a
          href="#arbejde"
          onClick={scrollToWork}
          className="relative text-sm tracking-wide opacity-60 hover:opacity-100 transition-opacity"
        >
          {t('Arbejde', 'Work')}
        </a>
        <NavItem to="/om">{t('Om', 'About')}</NavItem>

        <div className="relative" ref={dropdownRef}>
          <motion.button
            onClick={() => setContactOpen(v => !v)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-1.5 bg-[var(--color-burgundy)] text-[var(--color-base)] text-sm tracking-wide rounded-sm"
          >
            {t('Kontakt', 'Contact')}
          </motion.button>

          <AnimatePresence>
            {contactOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 top-full mt-2 w-48 bg-[var(--color-base)] border border-[var(--color-text)]/10 shadow-sm rounded-sm overflow-hidden"
              >
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-[var(--color-text)]/5 transition-colors"
                >
                  <span className="opacity-40 text-xs">@</span>
                  {t('Send en mail', 'Send an email')}
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-[var(--color-text)]/5 transition-colors border-t border-[var(--color-text)]/10"
                >
                  <span className="opacity-40 text-xs">in</span>
                  LinkedIn
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={toggleLang}
          className="text-xs tracking-widest opacity-40 hover:opacity-80 transition-opacity"
        >
          {lang === 'da' ? 'EN' : 'DA'}
        </button>
      </div>
    </motion.nav>
  )
}
