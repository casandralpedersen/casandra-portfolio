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
          viewBox="74 35 449 408"
          className="h-9 w-auto"
          fill="currentColor"
          style={{ color: 'var(--color-text)' }}
          role="img"
          aria-label="Casandra"
        >
          <g transform="translate(0,488) scale(0.1,-0.1)">
            <path d="M2148 4479 c-696 -90 -1227 -617 -1344 -1334 -22 -135 -22 -399 0 -520 62 -344 200 -617 426 -844 205 -207 466 -346 775 -412 127 -27 450 -37 618 -19 62 6 153 16 202 21 50 5 147 10 218 10 l127 0 0 54 c0 29 7 86 15 126 9 40 14 74 12 75 -2 2 -19 -8 -38 -22 -93 -70 -290 -146 -464 -180 -111 -21 -349 -24 -455 -5 -445 79 -831 409 -1005 859 -77 200 -115 400 -115 614 0 279 59 553 170 784 190 394 505 645 905 719 124 23 377 16 486 -13 252 -68 430 -186 580 -385 59 -79 135 -216 158 -289 27 -81 32 -37 26 215 -4 138 -8 258 -11 265 -6 21 -256 136 -393 182 -154 51 -263 77 -400 95 -115 16 -386 18 -493 4z" />
            <path d="M4676 3625 c-20 -226 -55 -340 -119 -390 -45 -33 -128 -60 -238 -75 -46 -7 -102 -16 -124 -20 l-40 -8 45 -1 c25 -1 87 -8 137 -16 255 -41 299 -98 336 -425 l13 -115 8 80 c11 125 35 251 55 297 25 59 74 104 140 129 51 19 193 44 286 51 27 2 -1 9 -86 20 -317 44 -352 88 -397 488 l-8 75 -8 -90z" />
            <path d="M2121 3531 c-16 -10 -7 -16 40 -25 43 -8 95 -59 109 -107 6 -21 10 -354 10 -879 0 -795 -2 -847 -19 -885 -22 -50 -39 -64 -104 -86 l-52 -18 298 0 c163 -1 297 1 297 3 0 3 -24 12 -54 20 -65 19 -90 47 -105 117 -7 33 -11 321 -11 863 0 882 0 884 55 936 13 12 45 28 70 35 25 6 47 15 48 21 3 12 -563 17 -582 5z" />
            <path d="M3104 2402 c3 -5 25 -14 49 -20 46 -12 90 -51 106 -95 8 -19 11 -289 11 -833 0 -873 2 -848 -55 -892 -15 -12 -45 -27 -66 -32 -87 -24 -34 -30 246 -30 174 0 285 4 285 10 0 5 -15 12 -34 15 -49 10 -92 39 -113 77 -17 31 -18 87 -21 887 -2 806 -2 855 15 873 17 19 29 20 213 16 215 -5 265 -16 354 -77 219 -151 251 -558 59 -771 -94 -105 -166 -131 -387 -139 -130 -5 -170 -9 -174 -20 -4 -11 33 -12 214 -8 186 4 230 8 292 26 245 72 382 218 413 438 25 177 -42 348 -176 450 -69 53 -121 78 -220 106 -65 19 -106 21 -543 24 -294 3 -472 1 -468 -5z" />
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
