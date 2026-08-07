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
  const [menuOpen, setMenuOpen] = useState(false)
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
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="hover:opacity-70 transition-opacity"
        aria-label="Casandra"
      >
        <svg
          viewBox="148 68 297 259"
          className="h-9 w-auto"
          fill="currentColor"
          style={{ color: 'var(--color-text)' }}
          role="img"
          aria-label="Casandra"
        >
          <g transform="translate(0,400) scale(0.1,-0.1)">
            <path d="M2418 3275 c-354 -58 -649 -275 -797 -586 -176 -369 -131 -807 114 -1117 199 -251 555 -401 898 -377 l97 7 0 -144 c0 -79 -4 -160 -9 -181 -12 -52 -46 -86 -93 -93 -107 -18 3 -24 406 -24 l444 0 31 161 c17 89 30 164 27 166 -2 2 -18 -22 -36 -54 -48 -85 -87 -130 -152 -173 -91 -60 -258 -88 -360 -59 -64 17 -72 44 -72 262 l-1 188 82 33 c67 28 208 103 271 144 7 5 33 85 58 178 24 93 47 177 50 187 3 9 2 17 -3 17 -4 0 -18 -27 -31 -59 -28 -71 -118 -218 -170 -275 -73 -82 -214 -186 -251 -186 -8 0 -11 79 -11 283 1 402 11 457 90 483 19 6 36 16 38 23 5 14 -444 16 -452 2 -3 -5 14 -14 38 -20 54 -13 81 -45 95 -112 16 -71 15 -705 -1 -715 -25 -16 -215 -6 -292 15 -82 23 -188 73 -246 115 -385 287 -513 912 -286 1392 154 324 404 498 716 498 298 0 537 -169 632 -446 13 -38 26 -68 30 -68 8 0 -2 393 -11 402 -11 12 -299 99 -393 119 -124 26 -335 33 -450 14z" />
            <path d="M3537 2550 c-3 -19 -11 -68 -17 -108 -19 -131 -32 -143 -194 -164 l-91 -12 100 -14 c55 -7 113 -21 130 -30 34 -21 52 -70 62 -175 3 -37 9 -70 13 -72 4 -2 10 28 14 68 8 88 23 147 43 169 16 18 80 34 184 46 l64 8 -94 12 c-116 16 -158 32 -172 69 -6 15 -17 75 -23 133 -10 82 -14 97 -19 70z" />
            <path d="M3558 1870 c74 -33 73 -25 70 -559 -3 -523 -2 -513 -73 -527 -84 -15 -20 -24 185 -24 140 0 220 4 220 10 0 6 -11 10 -24 10 -43 0 -82 20 -101 53 -16 27 -20 58 -23 205 l-5 174 39 -6 c149 -22 254 -15 360 25 82 31 173 123 197 198 22 70 22 182 0 245 -36 98 -138 179 -261 205 -33 7 -163 11 -340 10 l-287 0 43 -19z m525 -32 c60 -26 121 -94 143 -161 20 -59 22 -191 5 -254 -20 -73 -69 -134 -135 -168 -54 -27 -68 -30 -155 -30 -53 0 -104 3 -114 8 -18 7 -19 23 -15 290 3 317 6 331 70 340 57 8 151 -4 201 -25z" />
          </g>
        </svg>
      </NavLink>

      <div className="hidden md:flex items-center gap-7">
        <a
          href="#arbejde"
          onClick={scrollToWork}
          className="relative text-sm tracking-wide opacity-60 hover:opacity-100 transition-opacity"
        >
          {t('Tidligere arbejde', 'Previous work')}
        </a>
        <NavItem to="/om">{t('Om mig', 'About me')}</NavItem>
        <NavItem to="/cv">{t('Se CV', 'See CV')}</NavItem>

        <div className="relative" ref={dropdownRef}>
          <motion.button
            onClick={() => setContactOpen(v => !v)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-1.5 bg-[var(--color-burgundy)] text-[var(--color-base)] text-sm tracking-wide rounded-sm"
          >
            {t('Kontakt mig', 'Contact me')}
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
          className="text-xs tracking-widest border border-current rounded-full px-2.5 py-1 opacity-40 hover:opacity-80 transition-opacity"
          style={{ color: 'var(--color-text)' }}
        >
          {lang === 'da' ? 'en' : 'dk'}
        </button>
      </div>

      <button
        onClick={() => setMenuOpen(v => !v)}
        className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
        aria-label={t('Menu', 'Menu')}
      >
        <span className="block w-6 h-[2px] bg-[var(--color-text)]" />
        <span className="block w-6 h-[2px] bg-[var(--color-text)]" />
        <span className="block w-6 h-[2px] bg-[var(--color-text)]" />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden absolute left-0 right-0 top-full bg-[var(--color-base)] border-t border-[var(--color-text)]/10 shadow-sm flex flex-col px-8 py-2"
          >
            <a
              href="#arbejde"
              onClick={(e) => { scrollToWork(e); setMenuOpen(false) }}
              className="py-3 text-sm tracking-wide border-b border-[var(--color-text)]/10"
            >
              {t('Tidligere arbejde', 'Previous work')}
            </a>
            <NavLink to="/om" onClick={() => setMenuOpen(false)} className="py-3 text-sm tracking-wide border-b border-[var(--color-text)]/10">
              {t('Om mig', 'About me')}
            </NavLink>
            <NavLink to="/cv" onClick={() => setMenuOpen(false)} className="py-3 text-sm tracking-wide border-b border-[var(--color-text)]/10">
              {t('Se CV', 'See CV')}
            </NavLink>
            <a href={`mailto:${EMAIL}`} className="py-3 text-sm tracking-wide border-b border-[var(--color-text)]/10">
              {t('Send en mail', 'Send an email')}
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="py-3 text-sm tracking-wide border-b border-[var(--color-text)]/10">
              LinkedIn
            </a>
            <button
              onClick={() => { toggleLang(); setMenuOpen(false) }}
              className="py-3 text-sm tracking-wide text-left opacity-60"
            >
              {lang === 'da' ? 'English' : 'Dansk'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
