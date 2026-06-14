# Forside-modes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Byg fire nye komplette forside-modes og behold den nuværende forside som `Original`, med en fast switcher der gemmer valget og starter hver mode i toppen.

**Architecture:** `src/pages/Home.jsx` bliver en lille controller, der vælger mellem fem selvstændige mode-komponenter. Den eksisterende forside flyttes intakt til `HomeOriginal.jsx`; de fire nye modes bruger fælles, fokuserede sektioner til projekter og kontakt, men ejer selv deres hero, kompetencefortælling og animationer.

**Tech Stack:** React 18, React Router 6, Framer Motion 11, Tailwind CSS v4, Playwright.

---

## Filstruktur

- Create: `src/pages/home/HomeModeSwitcher.jsx` - fast, responsiv mode-switcher.
- Create: `src/pages/home/homeContent.js` - fælles labels, kompetenceområder og mode-definitioner.
- Create: `src/pages/home/HomeShared.jsx` - fælles projektlinks og kontaktsektioner med variant-props.
- Create: `src/pages/home/HomeOriginal.jsx` - den eksisterende `Home.jsx` flyttet intakt.
- Create: `src/pages/home/HomeEditorial.jsx` - editorial-mode.
- Create: `src/pages/home/HomeScrapbook.jsx` - scrapbook-mode.
- Create: `src/pages/home/HomeLab.jsx` - lab-mode.
- Create: `src/pages/home/HomeCinema.jsx` - cinema-mode.
- Modify: `src/pages/Home.jsx` - controller, persistence og scroll-reset.
- Create: `tests/home-modes.spec.js` - adfærd og smoke tests for alle modes.

### Task 1: Home-controller og mode-switcher

**Files:**
- Create: `src/pages/home/HomeModeSwitcher.jsx`
- Create: `src/pages/home/homeContent.js`
- Modify: `src/pages/Home.jsx`
- Test: `tests/home-modes.spec.js`

- [ ] **Step 1: Skriv den fejlende persistence-test**

```js
import { test, expect } from '@playwright/test'

const modes = ['Original', 'Editorial', 'Scrapbook', 'Lab', 'Cinema']

test('home modes switch, persist and reset scroll', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })

  for (const mode of modes) {
    await page.evaluate(() => window.scrollTo(0, 1000))
    await page.getByRole('button', { name: mode }).click()
    await expect(page.locator('main')).toHaveAttribute('data-home-mode', mode.toLowerCase())
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  }

  await page.reload({ waitUntil: 'networkidle' })
  await expect(page.locator('main')).toHaveAttribute('data-home-mode', 'cinema')
  await expect(page.evaluate(() => localStorage.getItem('home-layout'))).resolves.toBe('cinema')
})
```

- [ ] **Step 2: Kør testen og bekræft korrekt fejl**

Run: `npx playwright test tests/home-modes.spec.js --grep "switch, persist"`

Expected: FAIL fordi knapperne `Original`, `Editorial`, `Scrapbook`, `Lab`, `Cinema` ikke findes.

- [ ] **Step 3: Opret mode-definitioner**

```js
// src/pages/home/homeContent.js
export const HOME_MODES = [
  { id: 'original', label: 'Original' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'scrapbook', label: 'Scrapbook' },
  { id: 'lab', label: 'Lab' },
  { id: 'cinema', label: 'Cinema' },
]

export const HOME_PILLARS = [
  { da: 'Design', en: 'Design', color: '#913C27' },
  { da: 'Forretning', en: 'Business', color: '#5A86AB' },
  { da: 'Teknologi', en: 'Technology', color: '#C9A24B' },
]

export const EMAIL = 'casandralpedersen@gmail.com'
export const ease = [0.22, 1, 0.36, 1]
```

- [ ] **Step 4: Opret switcheren**

```jsx
// src/pages/home/HomeModeSwitcher.jsx
import { HOME_MODES } from './homeContent'

export default function HomeModeSwitcher({ mode, onSelect }) {
  return (
    <div
      aria-label="Forside-layout"
      className="fixed bottom-4 right-4 z-[70] flex max-w-[calc(100vw-2rem)] gap-1 overflow-x-auto rounded-full border border-[var(--color-text)]/15 bg-[var(--color-base)] px-1.5 py-1.5 shadow-md"
    >
      {HOME_MODES.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] tracking-wide ${
            mode === item.id
              ? 'bg-[var(--color-burgundy)] text-[var(--color-base)]'
              : 'opacity-50 hover:opacity-100'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Gør `Home.jsx` til controller med midlertidige mode-markører**

```jsx
import { useEffect, useState } from 'react'
import HomeModeSwitcher from './home/HomeModeSwitcher'
import { HOME_MODES } from './home/homeContent'

export default function Home() {
  const [mode, setMode] = useState(() => localStorage.getItem('home-layout') || 'original')
  const validMode = HOME_MODES.some((item) => item.id === mode) ? mode : 'original'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [validMode])

  function selectMode(nextMode) {
    localStorage.setItem('home-layout', nextMode)
    setMode(nextMode)
  }

  return (
    <>
      <main data-home-mode={validMode} className="min-h-screen bg-[var(--color-base)]" />
      <HomeModeSwitcher mode={validMode} onSelect={selectMode} />
    </>
  )
}
```

- [ ] **Step 6: Kør testen og bekræft grøn**

Run: `npx playwright test tests/home-modes.spec.js --grep "switch, persist"`

Expected: PASS.

- [ ] **Step 7: Commit controlleren**

```bash
git add src/pages/Home.jsx src/pages/home/HomeModeSwitcher.jsx src/pages/home/homeContent.js tests/home-modes.spec.js
git commit -m "Tilføj forside mode-switcher"
```

### Task 2: Bevar den eksisterende forside som Original

**Files:**
- Create: `src/pages/home/HomeOriginal.jsx`
- Modify: `src/pages/Home.jsx`
- Test: `tests/home-modes.spec.js`

- [ ] **Step 1: Skriv den fejlende Original-test**

```js
test('original mode preserves the current home sections', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('home-layout', 'original'))
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })

  await expect(page.getByLabel('Casandra')).toBeVisible()
  await expect(page.getByText('Det hele kogt ned')).toBeVisible()
  await expect(page.getByText('Mine fingeraftryk')).toBeVisible()
  await expect(page.getByText('Nok om mig. Hvad arbejder du på?')).toBeVisible()
})
```

- [ ] **Step 2: Kør testen og bekræft korrekt fejl**

Run: `npx playwright test tests/home-modes.spec.js --grep "preserves"`

Expected: FAIL fordi den midlertidige controller ikke renderer originalen.

- [ ] **Step 3: Flyt den eksisterende komponent intakt**

Kopier hele den tidligere `src/pages/Home.jsx` til `src/pages/home/HomeOriginal.jsx`, og ret kun relative imports:

```jsx
import { useLanguage } from '../../context/LanguageContext'
import { projects } from '../../data/projects'
```

Behold dens default export:

```jsx
export default function HomeOriginal() {
  const { t } = useLanguage()
  const constraintsRef = useRef(null)
  // eksisterende JSX uændret
}
```

- [ ] **Step 4: Render Original fra controlleren**

```jsx
import HomeOriginal from './home/HomeOriginal'

const ACTIVE_MODES = {
  original: HomeOriginal,
}

const ActiveMode = ACTIVE_MODES[validMode] ?? HomeOriginal

return (
  <>
    <div data-home-mode={validMode}>
      <ActiveMode />
    </div>
    <HomeModeSwitcher mode={validMode} onSelect={selectMode} />
  </>
)
```

- [ ] **Step 5: Kør test og build**

Run: `npx playwright test tests/home-modes.spec.js --grep "preserves"`

Expected: PASS.

Run: `npm run build`

Expected: Build gennemføres uden fejl.

- [ ] **Step 6: Commit Original-mode**

```bash
git add src/pages/Home.jsx src/pages/home/HomeOriginal.jsx tests/home-modes.spec.js
git commit -m "Bevar eksisterende forside som original mode"
```

### Task 3: Fælles projekt- og kontaktsektioner

**Files:**
- Create: `src/pages/home/HomeShared.jsx`
- Test: `tests/home-modes.spec.js`

- [ ] **Step 1: Skriv den fejlende fælles link-test**

```js
test('every designed mode exposes project, about and contact links', async ({ page }) => {
  for (const mode of ['editorial', 'scrapbook', 'lab', 'cinema']) {
    await page.addInitScript((value) => localStorage.setItem('home-layout', value), mode)
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })

    await expect(page.locator('a[href="/om"]').first()).toBeVisible()
    await expect(page.locator('a[href="/arbejde/o-bar"]').first()).toBeVisible()
    await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible()
  }
})
```

- [ ] **Step 2: Kør testen og bekræft korrekt fejl**

Run: `npx playwright test tests/home-modes.spec.js --grep "exposes project"`

Expected: FAIL fordi de designede modes endnu ikke renderer indhold.

- [ ] **Step 3: Opret variant-baserede fælles sektioner**

```jsx
// src/pages/home/HomeShared.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../../data/projects'
import { EMAIL, ease } from './homeContent'

export function SharedProjects({ t, variant }) {
  return (
    <section id="arbejde" className={`home-projects home-projects-${variant}`}>
      {projects.map((project, index) => (
        <motion.article
          key={project.slug}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ease, duration: 0.65, delay: index * 0.06 }}
        >
          <Link to={`/arbejde/${project.slug}`}>
            <span>{project.year}</span>
            <h3>{t(project.title.da, project.title.en)}</h3>
            <p>{t(project.category.da, project.category.en)}</p>
          </Link>
        </motion.article>
      ))}
    </section>
  )
}

export function SharedContact({ t, variant }) {
  return (
    <section className={`home-contact home-contact-${variant}`}>
      <p>{t('Kontakt', 'Contact')}</p>
      <h2>{t('Nok om mig. Hvad arbejder du på?', 'Enough about me. What are you working on?')}</h2>
      <a href={`mailto:${EMAIL}`}>{t('Skriv til mig', 'Email me')}</a>
      <Link to="/om">{t('Læs hele historien', 'Read the full story')}</Link>
    </section>
  )
}
```

- [ ] **Step 4: Tilføj variant-CSS i komponenten via faste Tailwind-klasser**

Implementér hver variant med eksplicitte class maps i `HomeShared.jsx`:

```js
const projectClasses = {
  editorial: 'grid border-t border-[var(--color-text)]/20 md:grid-cols-2',
  scrapbook: 'mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2',
  lab: 'grid gap-px border border-[var(--color-text)]/15 bg-[var(--color-text)]/15 md:grid-cols-2',
  cinema: 'grid gap-6 px-6 md:grid-cols-2',
}
```

Brug tilsvarende class maps for article, link og contact, så variants forbliver tydelige uden dynamiske Tailwind-fragmenter.

- [ ] **Step 5: Commit fælles sektioner**

```bash
git add src/pages/home/HomeShared.jsx tests/home-modes.spec.js
git commit -m "Tilføj fælles sektioner til forside-modes"
```

### Task 4: Editorial-mode

**Files:**
- Create: `src/pages/home/HomeEditorial.jsx`
- Modify: `src/pages/Home.jsx`
- Test: `tests/home-modes.spec.js`

- [ ] **Step 1: Skriv den fejlende Editorial-test**

```js
test('editorial mode renders its typographic story', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('home-layout', 'editorial'))
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })

  await expect(page.getByRole('heading', { name: 'Design med forretningsinstinkt' })).toBeVisible()
  await expect(page.locator('[data-editorial-feature]')).toHaveCount(3)
  await expect(page.locator('a[href="/arbejde/o-bar"]')).toBeVisible()
})
```

- [ ] **Step 2: Kør testen og bekræft korrekt fejl**

Run: `npx playwright test tests/home-modes.spec.js --grep "editorial mode"`

Expected: FAIL fordi `HomeEditorial` ikke findes.

- [ ] **Step 3: Opret Editorial med asymmetrisk hero og tre features**

```jsx
// src/pages/home/HomeEditorial.jsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { HOME_PILLARS, ease } from './homeContent'
import { SharedProjects, SharedContact } from './HomeShared'

export default function HomeEditorial() {
  const { t } = useLanguage()
  const { scrollYProgress } = useScroll()
  const portraitY = useTransform(scrollYProgress, [0, 0.5], [0, 70])

  return (
    <main className="overflow-hidden bg-[var(--color-base)]">
      <section className="texture grid min-h-[88vh] px-6 py-16 md:grid-cols-[1.3fr_.7fr] md:px-10">
        <div className="flex flex-col justify-between border-y border-[var(--color-text)]/15 py-8">
          <p className="text-[11px] uppercase tracking-[0.2em] opacity-50">Casandra Pedersen - Portfolio</p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease, duration: 0.9 }}
            className="max-w-[8ch] uppercase leading-[0.86]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(58px, 10vw, 150px)', color: 'var(--color-burgundy)' }}
          >
            {t('Design med forretningsinstinkt', 'Design with business instinct')}
          </motion.h1>
        </div>
        <motion.div style={{ y: portraitY }} className="relative min-h-[420px] border-b border-[var(--color-text)]/15 md:border-l md:border-t">
          <img src="/images/mefinalpic.png" alt="Casandra" className="absolute inset-0 h-full w-full object-contain object-bottom" />
        </motion.div>
      </section>

      <section className="grid px-6 py-24 md:grid-cols-3 md:px-10">
        {HOME_PILLARS.map((pillar, index) => (
          <motion.article
            data-editorial-feature
            key={pillar.da}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease, duration: 0.65, delay: index * 0.08 }}
            className="border-t border-[var(--color-text)]/15 py-8 md:px-6"
          >
            <span className="text-[11px] opacity-40">0{index + 1}</span>
            <h2 className="mt-8 text-4xl" style={{ fontFamily: 'var(--font-display)', color: pillar.color }}>{t(pillar.da, pillar.en)}</h2>
          </motion.article>
        ))}
        <Link to="/om" className="mt-8 border-b border-[var(--color-text)]/30 pb-1 text-sm">{t('Læs hele historien', 'Read the full story')}</Link>
      </section>

      <SharedProjects t={t} variant="editorial" />
      <SharedContact t={t} variant="editorial" />
    </main>
  )
}
```

- [ ] **Step 4: Registrer Editorial i controlleren**

```jsx
import HomeEditorial from './home/HomeEditorial'

const ACTIVE_MODES = {
  original: HomeOriginal,
  editorial: HomeEditorial,
}
```

- [ ] **Step 5: Kør test, build og commit**

Run: `npx playwright test tests/home-modes.spec.js --grep "editorial mode"`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

```bash
git add src/pages/Home.jsx src/pages/home/HomeEditorial.jsx src/pages/home/HomeShared.jsx tests/home-modes.spec.js
git commit -m "Byg editorial forside-mode"
```

### Task 5: Scrapbook-mode

**Files:**
- Create: `src/pages/home/HomeScrapbook.jsx`
- Modify: `src/pages/Home.jsx`
- Test: `tests/home-modes.spec.js`

- [ ] **Step 1: Skriv den fejlende Scrapbook-test**

```js
test('scrapbook mode renders draggable collage and pillars', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('home-layout', 'scrapbook'))
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })

  await expect(page.getByRole('heading', { name: 'Bygget af nysgerrighed' })).toBeVisible()
  await expect(page.locator('[data-scrapbook-card]')).toHaveCount(3)
  await expect(page.locator('[data-draggable-photo]')).toBeVisible()
})
```

- [ ] **Step 2: Kør testen og bekræft korrekt fejl**

Run: `npx playwright test tests/home-modes.spec.js --grep "scrapbook mode"`

Expected: FAIL fordi `HomeScrapbook` ikke findes.

- [ ] **Step 3: Opret Scrapbook med chips, noter og draggable foto**

```jsx
// src/pages/home/HomeScrapbook.jsx
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { HOME_PILLARS, ease } from './homeContent'
import { SharedProjects, SharedContact } from './HomeShared'

export default function HomeScrapbook() {
  const { t } = useLanguage()
  const constraintsRef = useRef(null)

  return (
    <main className="texture overflow-hidden bg-[var(--color-base)]">
      <section ref={constraintsRef} className="relative min-h-[88vh] px-6 py-20 md:px-12">
        <motion.div
          initial={{ opacity: 0, rotate: -5, y: 30 }}
          animate={{ opacity: 1, rotate: -2, y: 0 }}
          transition={{ ease, duration: 0.8 }}
          className="relative z-10 max-w-xl bg-[#FFFDF5] p-7 shadow-xl md:ml-[8%]"
        >
          <p className="text-[11px] uppercase tracking-[0.18em] opacity-50">{t('Nyt portfolio', 'New portfolio')}</p>
          <h1 className="mt-4 leading-[0.95]" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(58px, 9vw, 120px)', color: 'var(--color-burgundy)' }}>
            {t('Bygget af nysgerrighed', 'Built by curiosity')}
          </h1>
          <p className="mt-5 max-w-md leading-relaxed opacity-70">{t('Jeg forbinder design, forretning og teknologi med mennesker i centrum.', 'I connect design, business and technology with people at the centre.')}</p>
        </motion.div>

        <motion.div
          data-draggable-photo
          drag
          dragConstraints={constraintsRef}
          dragMomentum={false}
          className="relative z-20 mx-auto mt-10 w-[230px] cursor-grab bg-[#FFFDF5] p-3 pb-9 shadow-xl md:absolute md:right-[12%] md:top-[14%]"
        >
          <img src="/images/sitwavemepic.png" alt="Casandra" className="h-[300px] w-full object-contain object-bottom" draggable={false} />
        </motion.div>

        <div className="relative z-10 mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-3">
          {HOME_PILLARS.map((pillar, index) => (
            <motion.article
              data-scrapbook-card
              key={pillar.da}
              initial={{ opacity: 0, y: 24, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: [-2, 2, -1][index] }}
              transition={{ ease, duration: 0.7, delay: 0.25 + index * 0.1 }}
              className="bg-[#FFFDF5] p-6 shadow-md"
            >
              <span className="rounded-full px-3 py-1 text-[11px] text-[var(--color-base)]" style={{ background: pillar.color }}>{t(pillar.da, pillar.en)}</span>
            </motion.article>
          ))}
        </div>
        <Link to="/om" className="relative z-10 mx-auto mt-12 block w-fit border-b border-[var(--color-text)]/30 text-sm">{t('Læs hele historien', 'Read the full story')}</Link>
      </section>

      <SharedProjects t={t} variant="scrapbook" />
      <SharedContact t={t} variant="scrapbook" />
    </main>
  )
}
```

- [ ] **Step 4: Registrer mode, kør test, build og commit**

Tilføj `scrapbook: HomeScrapbook` i `ACTIVE_MODES`.

Run: `npx playwright test tests/home-modes.spec.js --grep "scrapbook mode"`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

```bash
git add src/pages/Home.jsx src/pages/home/HomeScrapbook.jsx tests/home-modes.spec.js
git commit -m "Byg scrapbook forside-mode"
```

### Task 6: Lab-mode

**Files:**
- Create: `src/pages/home/HomeLab.jsx`
- Modify: `src/pages/Home.jsx`
- Test: `tests/home-modes.spec.js`

- [ ] **Step 1: Skriv den fejlende Lab-test**

```js
test('lab mode renders connected system nodes and project modules', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('home-layout', 'lab'))
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })

  await expect(page.getByRole('heading', { name: 'Design x forretning x teknologi' })).toBeVisible()
  await expect(page.locator('[data-lab-node]')).toHaveCount(3)
  await expect(page.locator('[data-lab-connector]')).toHaveCount(3)
})
```

- [ ] **Step 2: Kør testen og bekræft korrekt fejl**

Run: `npx playwright test tests/home-modes.spec.js --grep "lab mode"`

Expected: FAIL fordi `HomeLab` ikke findes.

- [ ] **Step 3: Opret Lab-systemet**

```jsx
// src/pages/home/HomeLab.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { HOME_PILLARS, ease } from './homeContent'
import { SharedProjects, SharedContact } from './HomeShared'

export default function HomeLab() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--color-base)]">
      <section className="texture min-h-[88vh] px-5 py-16 md:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[var(--color-text)]/15 bg-white/25">
          <div className="grid md:grid-cols-[.85fr_1.15fr]">
            <div className="border-b border-[var(--color-text)]/15 p-7 md:border-b-0 md:border-r md:p-12">
              <p className="text-[11px] uppercase tracking-[0.2em] opacity-50">Creative system / Casandra</p>
              <h1 className="mt-8 leading-[0.95]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 100px)', color: 'var(--color-burgundy)' }}>
                {t('Design x forretning x teknologi', 'Design x business x technology')}
              </h1>
              <Link to="/om" className="mt-10 inline-block border-b border-[var(--color-text)]/30 text-sm">{t('Åbn profil', 'Open profile')}</Link>
            </div>

            <div className="relative min-h-[480px] p-8">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 480" aria-hidden="true">
                {['M300 240 L170 130', 'M300 240 L430 130', 'M300 240 L300 370'].map((path) => (
                  <motion.path
                    data-lab-connector
                    key={path}
                    d={path}
                    fill="none"
                    stroke="var(--color-text)"
                    strokeOpacity=".28"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ ease, duration: 1 }}
                  />
                ))}
              </svg>
              {HOME_PILLARS.map((pillar, index) => (
                <motion.div
                  data-lab-node
                  key={pillar.da}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ease, duration: 0.65, delay: 0.2 + index * 0.1 }}
                  className={`absolute grid h-32 w-32 place-items-center rounded-full text-center text-sm text-[var(--color-base)] ${
                    index === 0 ? 'left-[8%] top-[10%]' : index === 1 ? 'right-[8%] top-[10%]' : 'bottom-[8%] left-1/2 -translate-x-1/2'
                  }`}
                  style={{ background: pillar.color }}
                >
                  {t(pillar.da, pillar.en)}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SharedProjects t={t} variant="lab" />
      <SharedContact t={t} variant="lab" />
    </main>
  )
}
```

- [ ] **Step 4: Registrer mode, kør test, build og commit**

Tilføj `lab: HomeLab` i `ACTIVE_MODES`.

Run: `npx playwright test tests/home-modes.spec.js --grep "lab mode"`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

```bash
git add src/pages/Home.jsx src/pages/home/HomeLab.jsx tests/home-modes.spec.js
git commit -m "Byg lab forside-mode"
```

### Task 7: Cinema-mode

**Files:**
- Create: `src/pages/home/HomeCinema.jsx`
- Modify: `src/pages/Home.jsx`
- Test: `tests/home-modes.spec.js`

- [ ] **Step 1: Skriv den fejlende Cinema-test**

```js
test('cinema mode renders scenes and project frames', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('home-layout', 'cinema'))
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })

  await expect(page.getByRole('heading', { name: 'Portfolio med mere puls' })).toBeVisible()
  await expect(page.locator('[data-cinema-scene]')).toHaveCount(3)
  await expect(page.locator('a[href="/arbejde/o-bar"]')).toBeVisible()
})
```

- [ ] **Step 2: Kør testen og bekræft korrekt fejl**

Run: `npx playwright test tests/home-modes.spec.js --grep "cinema mode"`

Expected: FAIL fordi `HomeCinema` ikke findes.

- [ ] **Step 3: Opret Cinema med tre scener og parallax**

```jsx
// src/pages/home/HomeCinema.jsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { HOME_PILLARS, ease } from './homeContent'
import { SharedProjects, SharedContact } from './HomeShared'

export default function HomeCinema() {
  const { t } = useLanguage()
  const { scrollYProgress } = useScroll()
  const portraitY = useTransform(scrollYProgress, [0, 0.35], [0, 90])
  const titleY = useTransform(scrollYProgress, [0, 0.35], [0, -55])

  return (
    <main className="overflow-hidden bg-[var(--color-text)] text-[var(--color-base)]">
      <section data-cinema-scene className="relative min-h-[88vh] overflow-hidden px-6 py-16 md:px-12">
        <motion.div style={{ y: portraitY }} className="absolute inset-y-0 right-0 w-[65%] opacity-75">
          <img src="/images/mefinalpic.png" alt="Casandra" className="h-full w-full object-contain object-bottom" />
        </motion.div>
        <motion.div style={{ y: titleY }} className="relative z-10 flex min-h-[72vh] max-w-4xl flex-col justify-end">
          <p className="text-[11px] uppercase tracking-[0.2em] opacity-60">{t('Åbningsscene', 'Opening scene')}</p>
          <motion.h1
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease, duration: 0.95 }}
            className="mt-5 max-w-[9ch] leading-[0.9]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(62px, 11vw, 165px)' }}
          >
            {t('Portfolio med mere puls', 'A portfolio with more pulse')}
          </motion.h1>
        </motion.div>
      </section>

      <section data-cinema-scene className="bg-[var(--color-burgundy)] px-6 py-28 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {HOME_PILLARS.map((pillar, index) => (
            <motion.article
              key={pillar.da}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ ease, duration: 0.75, delay: index * 0.1 }}
              className="min-h-[280px] rounded-[28px] border border-[var(--color-base)]/20 bg-[var(--color-base)]/8 p-7"
            >
              <span className="text-[11px] opacity-55">Scene 0{index + 1}</span>
              <h2 className="mt-28 text-4xl" style={{ fontFamily: 'var(--font-display)' }}>{t(pillar.da, pillar.en)}</h2>
            </motion.article>
          ))}
        </div>
        <Link to="/om" className="mx-auto mt-12 block w-fit border-b border-[var(--color-base)]/35 text-sm">{t('Læs hele historien', 'Read the full story')}</Link>
      </section>

      <section data-cinema-scene className="bg-[var(--color-base)] py-24 text-[var(--color-text)]">
        <SharedProjects t={t} variant="cinema" />
      </section>
      <SharedContact t={t} variant="cinema" />
    </main>
  )
}
```

- [ ] **Step 4: Registrer mode, kør test, build og commit**

Tilføj `cinema: HomeCinema` i `ACTIVE_MODES`.

Run: `npx playwright test tests/home-modes.spec.js --grep "cinema mode"`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

```bash
git add src/pages/Home.jsx src/pages/home/HomeCinema.jsx tests/home-modes.spec.js
git commit -m "Byg cinema forside-mode"
```

### Task 8: Fuld verifikation og responsiv finpudsning

**Files:**
- Modify: `src/pages/home/HomeModeSwitcher.jsx`
- Modify: `src/pages/home/HomeEditorial.jsx`
- Modify: `src/pages/home/HomeScrapbook.jsx`
- Modify: `src/pages/home/HomeLab.jsx`
- Modify: `src/pages/home/HomeCinema.jsx`
- Modify: `src/pages/home/HomeShared.jsx`
- Modify: `tests/home-modes.spec.js`

- [ ] **Step 1: Tilføj reduced-motion og mobil-smoke-test**

```js
test('all home modes fit mobile without horizontal page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })

  for (const mode of ['original', 'editorial', 'scrapbook', 'lab', 'cinema']) {
    await page.addInitScript((value) => localStorage.setItem('home-layout', value), mode)
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1)
  }
})
```

- [ ] **Step 2: Kør hele Playwright-suiten**

Run: `npx playwright test tests/home-modes.spec.js tests/about-scrapbook2.spec.js`

Expected: Alle tests passer. Hvis mobiltesten fejler, ret kun den mode der skaber overflow.

- [ ] **Step 3: Tilføj reduced-motion til kontinuerlig bevægelse**

Brug `useReducedMotion()` fra Framer Motion i Editorial og Cinema:

```jsx
const reduceMotion = useReducedMotion()
const portraitY = useTransform(scrollYProgress, [0, 0.5], reduceMotion ? [0, 0] : [0, 70])
```

Fjern drag på mobil i Scrapbook via pointer-capability:

```jsx
drag={typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches}
```

- [ ] **Step 4: Tag desktop-screenshots af alle modes**

Run én Playwright-verifikation per mode ved `1440x900`, gemt som:

```text
tmp/home-original-desktop.png
tmp/home-editorial-desktop.png
tmp/home-scrapbook-desktop.png
tmp/home-lab-desktop.png
tmp/home-cinema-desktop.png
```

Kontrollér: mode-switcher er synlig, heroen har tydelig identitet, og intet vigtigt overlapper navigationen.

- [ ] **Step 5: Tag mobile screenshots af alle modes**

Run én Playwright-verifikation per mode ved `390x844`, gemt som:

```text
tmp/home-original-mobile.png
tmp/home-editorial-mobile.png
tmp/home-scrapbook-mobile.png
tmp/home-lab-mobile.png
tmp/home-cinema-mobile.png
```

Kontrollér: ingen horisontal page-overflow, switcheren kan scrolle, og heroens primære tekst er læsbar.

- [ ] **Step 6: Kør endelig build og diff-check**

Run: `npm run build`

Expected: PASS.

Run: `git diff --check`

Expected: Ingen output.

- [ ] **Step 7: Commit verifikation og finpudsning**

```bash
git add src/pages/Home.jsx src/pages/home tests/home-modes.spec.js
git commit -m "Verificer og finpuds forside-modes"
```
