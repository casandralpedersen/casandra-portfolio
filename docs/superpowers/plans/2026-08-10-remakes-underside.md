# Remakes-undersiden - implementeringsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Byg `/arbejde/remakes` som et bevismateriale-arkiv hvor tre fotograferede "før"-sedler løfter sig af væggen ved scroll og afslører det færdige redesign nedenunder.

**Architecture:** Én selvstændig sidekomponent `src/pages/work/Remakes.jsx` efter samme mønster som `OBar.jsx` og `Blitz.jsx` (bespoke side, ikke blocks-kit). Sidens motor er `PeelCase`: en `260vh` sektion med `sticky top-0 h-screen` scene, hvor `useScroll` + `useTransform` driver et før-foto ud af rammen via rotation om tape-hjørnet, mens efter-designet fader op nedenunder. Case 02 tilføjer en klikbar plakat-stak. Alle efter-artefakter kan åbnes i en lightbox for læsbarhed.

**Tech Stack:** React 18, framer-motion 11 (`useScroll`, `useTransform`, `useReducedMotion`, `AnimatePresence`), Tailwind CSS v4, React Router 6, `sips` til billedkomprimering.

## Global Constraints

- Bindestreg `-`, aldrig em-dash `—`, i al kode og tekst.
- Ingen kommentarer der forklarer hvad koden gør. Kun hvis WHY er ikke-åbenlyst.
- **Siden må ikke indeholde rolle, leverancer, år, værktøjer eller nogen anden meta-liste.** Ingen `MetaList`, ingen "Lavet i Figma", ingen "A/B test ... chatgpt+". De noter fra det gamle site droppes bevidst.
- Ingen `NextProject`-bånd på denne side. Siden slutter med en rolig linje plus link tilbage til forsidens arbejde-grid.
- Titler bruger ITC Garamond bold: `fontFamily: '"ITCGaramond", serif', fontWeight: 700`.
- Easing overalt: `[0.22, 1, 0.36, 1]`.
- Farve på `<a>`-elementer SKAL sættes inline. Tailwind preflight sætter `a{color:inherit}`, og `text-white` findes ikke i den kompilerede CSS.
- Dansk og engelsk gennem `useLanguage()`s `t(da, en)`. Al brødtekst er hentet ordret fra det gamle portfolios `data.js` med de sproglige originaler bevaret.
- Sidens egen palet (afviger bevidst fra sitets varme creme):
  - `WALL = '#E3E1D9'` - kølig institutionel væg
  - `INK = '#2C3630'` - næsten sort grågrøn brødtekst
  - `PEN = '#913C27'` - sitets burgundy, brugt som rettelses-blæk på numre og streger
  - `GREEN = '#3B7751'` - plakaternes grønne, brugt på titler
  - `PAPER = '#FFFDF5'` - print-kant om før-fotos
- Ingen testrunner i projektet. Verifikation = `npm run build` uden fejl plus Playwright-screenshot mod **Aside** (MCP-serveren `aside`), ikke Chrome.
- Dev-server kører allerede på `http://localhost:5173`. Genstart kun hvis den er død.

---

### Task 1: Billed-assets

Otte billeder flyttes fra det gamle portfolio, komprimeres og får forudsigelige navne. Kilderne fylder ca. 12 MB tilsammen og må ikke committes i rå form.

**Files:**
- Create: `public/images/projects/remakes/before-nvg.jpg`
- Create: `public/images/projects/remakes/after-nvg.png`
- Create: `public/images/projects/remakes/before-itu.jpg`
- Create: `public/images/projects/remakes/after-itu-1.png`
- Create: `public/images/projects/remakes/after-itu-2.png`
- Create: `public/images/projects/remakes/after-itu-3.png`
- Create: `public/images/projects/remakes/before-service.jpg`
- Create: `public/images/projects/remakes/after-service.png`

**Interfaces:**
- Consumes: intet.
- Produces: stierne ovenfor. Task 3-7 refererer dem via konstanten `IMG = '/images/projects/remakes'`.

- [ ] **Step 1: Opret målmappen**

```bash
cd "/Users/casandra/Desktop/Claude & AI projekter/Portfolio-dev/PortfolioFinal"
mkdir -p public/images/projects/remakes
```

- [ ] **Step 2: Konvertér de tre før-fotos til jpeg på 1800 px bredde**

```bash
SRC="/Users/casandra/Desktop/Claude & AI projekter/Portfolio-dev/PortfolioTO/assets/placeholders/før og efter"
DST="/Users/casandra/Desktop/Claude & AI projekter/Portfolio-dev/PortfolioFinal/public/images/projects/remakes"

sips -Z 1800 -s format jpeg -s formatOptions 72 "$SRC/kantinefør.JPG"    --out "$DST/before-nvg.jpg"
sips -Z 1800 -s format jpeg -s formatOptions 72 "$SRC/itukantfør.jpeg"   --out "$DST/before-itu.jpg"
sips -Z 1800 -s format jpeg -s formatOptions 72 "$SRC/Servicefør.jpeg"   --out "$DST/before-service.jpg"
```

- [ ] **Step 3: Kopiér de fem efter-designs som png på 1400 px**

Rækkefølgen på ITU-plakaterne er bevidst: `after-itu-1` er den mest komplette (begge tallerkener, pil, pris), så den ligger øverst i stakken.

```bash
SRC="/Users/casandra/Desktop/Claude & AI projekter/Portfolio-dev/PortfolioTO/assets/placeholders/før og efter"
DST="/Users/casandra/Desktop/Claude & AI projekter/Portfolio-dev/PortfolioFinal/public/images/projects/remakes"

sips -Z 1400 "$SRC/kantefterny.png"        --out "$DST/after-nvg.png"
sips -Z 1400 "$SRC/itu-kantine-A4-16.png"  --out "$DST/after-itu-1.png"
sips -Z 1400 "$SRC/itu-kantine-A4-9.png"   --out "$DST/after-itu-2.png"
sips -Z 1400 "$SRC/itu-kantine-A4-3.png"   --out "$DST/after-itu-3.png"
sips -Z 1400 "$SRC/Service.png"            --out "$DST/after-service.png"
```

- [ ] **Step 4: Verificér at alle otte findes og at ingen fylder over 900 KB**

```bash
cd "/Users/casandra/Desktop/Claude & AI projekter/Portfolio-dev/PortfolioFinal"
ls -la public/images/projects/remakes
du -sh public/images/projects/remakes
```

Forventet: 8 filer, samlet under 4 MB. Ligger en enkelt fil over 900 KB, kør den igennem `sips -Z 1200` igen.

- [ ] **Step 5: Commit**

```bash
git add public/images/projects/remakes
git commit -m "Remakes: tilføj før/efter-billeder"
```

---

### Task 2: Projektdata

`projects.js` siger stadig 2022 og har hverken cover, beskrivelse eller rigtig accentfarve. Forsidens grid læser de felter, så de skal rettes før siden linkes.

**Files:**
- Modify: `src/data/projects.js:38-49`

**Interfaces:**
- Consumes: `public/images/projects/remakes/after-service.png` fra Task 1.
- Produces: projektobjektet `{ slug: 'remakes', accent: '#3B7751', ... }`. Task 3 læser `project.accent` gennem `WorkDetail`s dispatcher-prop.

- [ ] **Step 1: Læs det nuværende objekt**

```bash
cd "/Users/casandra/Desktop/Claude & AI projekter/Portfolio-dev/PortfolioFinal"
sed -n '36,50p' src/data/projects.js
```

- [ ] **Step 2: Erstat objektet**

Fra:

```js
  {
    slug: 'remakes',
    title: { da: 'Remakes', en: 'Remakes' },
    category: { da: 'Personligt projekt', en: 'Personal project' },
    year: '2022',
    cover: null,
    accent: '#2A3A5A',
    description: {
      da: '',
      en: '',
    },
  },
```

Til:

```js
  {
    slug: 'remakes',
    title: { da: 'Remakes', en: 'Remakes' },
    category: { da: 'Personligt projekt', en: 'Personal project' },
    year: '2025',
    cover: '/images/projects/remakes/after-service.png',
    accent: '#3B7751',
    description: {
      da: 'Tre steder hvor et godt budskab druknede i dårligt design, og hvad jeg gjorde ved det.',
      en: 'Three places where a good message drowned in bad design, and what I did about it.',
    },
  },
```

- [ ] **Step 3: Verificér at forsiden viser det nye kort**

Start dev-serveren hvis den ikke kører (`npm run dev`), naviger i Aside til `http://localhost:5173/#arbejde` og tag et screenshot. Forventet: Remakes-kortet viser den grønne opvask-plakat og årstallet 2025.

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.js
git commit -m "Remakes: ret år til 2025, tilføj cover, accent og beskrivelse"
```

---

### Task 3: Sidens skelet, palet og hero

Siden oprettes med væg-baggrund, hero og en tom plads hvor casene skal ind. Registreres i dispatcheren så ruten holder op med at vise "Under opbygning".

**Files:**
- Create: `src/pages/work/Remakes.jsx`
- Modify: `src/pages/WorkDetail.jsx:1-12`

**Interfaces:**
- Consumes: `BackLink` fra `../../components/work/blocks`, `useLanguage` fra `../../context/LanguageContext`, billederne fra Task 1.
- Produces:
  - `export default function Remakes()` - sidens rod, ingen props.
  - Modul-konstanter som senere tasks bruger: `IMG`, `EASE`, `TITLE_FONT`, `WALL`, `INK`, `PEN`, `GREEN`, `PAPER`.
  - `function PrintFrame({ src, alt, folded = false, className = '', style })` - før-fotoet i sin hvide printkant. Task 4 genbruger den inde i `PeelCase`.

- [ ] **Step 1: Opret `src/pages/work/Remakes.jsx`**

```jsx
import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { BackLink } from '../../components/work/blocks'

const IMG = '/images/projects/remakes'
const EASE = [0.22, 1, 0.36, 1]
const TITLE_FONT = '"ITCGaramond", serif'

const WALL = '#E3E1D9'
const INK = '#2C3630'
const PEN = '#913C27'
const GREEN = '#3B7751'
const PAPER = '#FFFDF5'

function PrintFrame({ src, alt, folded = false, className = '', style }) {
  const fold = 34
  return (
    <div
      className={`relative ${className}`}
      style={{
        background: PAPER,
        padding: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        clipPath: folded
          ? `polygon(0 0, calc(100% - ${fold}px) 0, 100% ${fold}px, 100% 100%, 0 100%)`
          : undefined,
        ...style,
      }}
    >
      <img src={src} alt={alt} className="block w-full h-auto object-contain" draggable={false} />
      {folded && (
        <span
          aria-hidden="true"
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: fold,
            height: fold,
            background: `linear-gradient(225deg, ${PAPER} 0%, #E7E3D6 55%, #CFCABB 100%)`,
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
            boxShadow: '-2px 2px 4px rgba(0,0,0,0.16)',
          }}
        />
      )}
    </div>
  )
}

function Tape({ rotate = -4, w = 92, className = '', style }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: w,
        height: 26,
        background: 'rgba(210,205,186,0.62)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    />
  )
}

function Hero({ t }) {
  const shots = [
    { src: `${IMG}/before-nvg.jpg`, alt: t('Menuskærmen før', 'The menu screen before'), rotate: -6, top: '4%', left: '2%', w: '58%', folded: false },
    { src: `${IMG}/before-itu.jpg`, alt: t('Tallerkenvejledningen før', 'The plate guide before'), rotate: 5, top: '32%', left: '38%', w: '52%', folded: false },
    { src: `${IMG}/before-service.jpg`, alt: t('Opvasksedlen før', 'The dishes notice before'), rotate: -3, top: '58%', left: '8%', w: '50%', folded: true },
  ]

  return (
    <header className="max-w-[1180px] mx-auto px-6 md:px-10 pt-14 md:pt-16 pb-20 md:pb-28">
      <div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-center">
        <div>
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: EASE, duration: 0.7 }}
            className="leading-[0.95]"
            style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(52px, 9vw, 112px)', color: GREEN }}
          >
            Remakes
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: EASE, duration: 0.7, delay: 0.12 }}
            className="font-body leading-relaxed mt-6 max-w-[46ch]"
            style={{ fontSize: 'clamp(16px, 1.5vw, 19px)', color: INK }}
          >
            {t(
              'Godt indhold fortjener godt design. Jeg kan ikke tåle spildt potentiale. Når et godt budskab drukner i dårligt design, klør det i fingrene. Her er et par ting jeg ikke kunne lade være med at redesigne.',
              'Good content deserves good design. I can’t stand wasted potential. When a good message drowns in bad design, my fingers itch. Here are a few things I couldn’t help but redesign.',
            )}
          </motion.p>
        </div>

        <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
          {shots.map((s, i) => (
            <motion.div
              key={s.src}
              initial={{ opacity: 0, y: 18, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: s.rotate }}
              transition={{ ease: EASE, duration: 0.8, delay: 0.2 + i * 0.12 }}
              className="absolute"
              style={{ top: s.top, left: s.left, width: s.w }}
            >
              <Tape rotate={s.rotate * -2} style={{ left: '50%', top: -12, marginLeft: -46 }} />
              <PrintFrame src={s.src} alt={s.alt} folded={s.folded} />
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  )
}

export default function Remakes() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen" style={{ background: WALL, color: INK }}>
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 pt-20">
        <BackLink />
      </div>

      <Hero t={t} />
    </main>
  )
}
```

- [ ] **Step 2: Registrér siden i dispatcheren**

I `src/pages/WorkDetail.jsx`, tilføj importen efter `Blitz`:

```jsx
import Remakes from './work/Remakes'
```

og udvid `pages`-objektet:

```jsx
const pages = {
  'etsy-composestudio': EtsyComposeStudio,
  'o-bar': OBar,
  blitz: Blitz,
  remakes: Remakes,
}
```

- [ ] **Step 3: Verificér i browseren**

Naviger i Aside til `http://localhost:5173/arbejde/remakes` og tag et screenshot.

Forventet: kølig grå væg i stedet for creme, "Remakes" i grøn ITC Garamond, brødtekst til venstre, tre tapede fotos i skæve vinkler til højre, og det nederste foto har et ombukket hjørne øverst til højre. Ikke længere "Under opbygning".

- [ ] **Step 4: Byg**

```bash
cd "/Users/casandra/Desktop/Claude & AI projekter/Portfolio-dev/PortfolioFinal"
npm run build
```

Forventet: build lykkes uden fejl.

- [ ] **Step 5: Commit**

```bash
git add src/pages/work/Remakes.jsx src/pages/WorkDetail.jsx
git commit -m "Remakes: sidens skelet, vægpalet og hero"
```

---

### Task 4: PeelCase - det scroll-drevne løft

Sidens motor. Én case fylder `260vh`; scenen indeni er `sticky top-0 h-screen`. Før-fotoet roterer om sit tape-hjørne og glider ud af rammen, mens efter-designet fader op nedenunder. Første case (menuskærmen) tages i brug her.

**Files:**
- Modify: `src/pages/work/Remakes.jsx`

**Interfaces:**
- Consumes: `PrintFrame`, `Tape`, `IMG`, `EASE`, `INK`, `PEN`, `GREEN` fra Task 3.
- Produces:
  - `function CaseHead({ number, label, story })` - venstre kolonne i en case.
  - `function PeelCase({ number, label, story, before, beforeAlt, dir = 1, stage = '4 / 3', children })` - `children` er efter-laget, så Task 5 kan sende et enkelt billede ind og Task 6 kan sende en plakat-stak ind. `dir = 1` sender papiret ud til højre, `dir = -1` ud til venstre.

- [ ] **Step 1: Tilføj `CaseHead` og `PeelCase` over `Hero` i `Remakes.jsx`**

```jsx
function CaseHead({ number, label, story }) {
  return (
    <div className="max-w-[42ch]">
      <p className="leading-none mb-3" style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 26, color: PEN }}>
        {number}
      </p>
      <h2
        className="leading-[1.05] mb-4"
        style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(30px, 4vw, 52px)', color: GREEN }}
      >
        {label}
      </h2>
      <span className="block mb-5" style={{ width: 46, height: 2, background: PEN }} />
      <p className="font-body leading-relaxed" style={{ fontSize: 15, color: INK, opacity: 0.85 }}>
        {story}
      </p>
    </div>
  )
}

function PeelCase({ number, label, story, before, beforeAlt, dir = 1, stage = '4 / 3', children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const rotate = useTransform(scrollYProgress, [0.18, 0.62], [0, dir * 16])
  const x = useTransform(scrollYProgress, [0.18, 0.62], ['0%', `${dir * 86}%`])
  const y = useTransform(scrollYProgress, [0.18, 0.62], ['0%', '-38%'])
  const scale = useTransform(scrollYProgress, [0.18, 0.4, 0.62], [1, 1.05, 1.02])
  const shadow = useTransform(
    scrollYProgress,
    [0.18, 0.62],
    ['0 2px 8px rgba(0,0,0,0.12)', '0 46px 72px rgba(0,0,0,0.30)'],
  )
  const tapeOpacity = useTransform(scrollYProgress, [0.18, 0.3], [1, 0])
  const afterOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const afterScale = useTransform(scrollYProgress, [0.2, 0.62], [0.94, 1])

  const origin = dir === 1 ? '100% 0%' : '0% 0%'

  return (
    <section ref={ref} className="relative" style={{ height: '260vh' }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-[1180px] mx-auto w-full px-6 md:px-10 grid md:grid-cols-[minmax(0,320px)_1fr] gap-10 md:gap-16 items-center">
          <CaseHead number={number} label={label} story={story} />

          <div className="relative w-full" style={{ aspectRatio: stage }}>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: afterOpacity, scale: afterScale }}
            >
              {children}
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ rotate, x, y, scale, transformOrigin: origin }}
            >
              <motion.div className="relative" style={{ maxWidth: '86%', boxShadow: shadow }}>
                <motion.span style={{ opacity: tapeOpacity }}>
                  <Tape rotate={-5} style={{ left: '50%', top: -13, marginLeft: -46 }} />
                </motion.span>
                <PrintFrame src={before} alt={beforeAlt} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Tilføj case 01 i `Remakes`-komponenten, under `<Hero />`**

```jsx
      <PeelCase
        number="01"
        label={t('Menuskærmen', 'The menu screen')}
        story={t(
          'Under et GSK-kursus i matematik prøvede jeg at bestille frokost, og jeg kunne simpelthen ikke finde rundt på menukortet. Tekst og billeder manglede hierarki og opdeling. Så jeg redesignede det tilbage i maj 2025. Så hvem ved, måske har de fikset det siden.',
          'During a GSK course in mathematics I tried to order lunch, and I simply couldn’t navigate the menu board. Text and images lacked hierarchy and structure. So I redesigned it back in May 2025. Who knows, maybe they’ve fixed it since.',
        )}
        before={`${IMG}/before-nvg.jpg`}
        beforeAlt={t('Menuskærmen i kantinen før redesignet', 'The canteen menu screen before the redesign')}
        dir={1}
        stage="4 / 3"
      >
        <img
          src={`${IMG}/after-nvg.png`}
          alt={t('Menukortet efter redesignet', 'The menu after the redesign')}
          className="max-w-full max-h-full object-contain"
          style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.16)' }}
        />
      </PeelCase>
```

- [ ] **Step 3: Verificér løftet i browseren**

Naviger i Aside til `http://localhost:5173/arbejde/remakes`. Scroll ned i case 01 og tag tre screenshots: i hvile, midt i løftet, og efter løftet.

Forventet:
- I hvile ligger før-fotoet centreret med tape øverst, og efter-designet er usynligt bag det.
- Midtvejs er papiret roteret om sit øverste højre hjørne, på vej ud til højre og opad, med voksende skygge. Tapen er væk.
- Til sidst er papiret helt ude af rammen og det redesignede menukort står alene i fuld opacity.

Kontrollér samtidig at scenen ikke skaber vandret scroll på siden. Gør den det, skyldes det `overflow-hidden` mangler på den sticky container.

- [ ] **Step 4: Byg**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/work/Remakes.jsx
git commit -m "Remakes: scroll-drevet papirløft og case 01"
```

---

### Task 5: Case 03 - kommunens opvask

Genbruger `PeelCase` uændret, men løfter til den modsatte side så de tre cases ikke bliver ens. Bygges før case 02, fordi den er den simple af de to og bekræfter at `PeelCase` er genbrugelig uden ændringer.

**Files:**
- Modify: `src/pages/work/Remakes.jsx`

**Interfaces:**
- Consumes: `PeelCase` fra Task 4.
- Produces: intet nyt.

- [ ] **Step 1: Tilføj case 03 efter case 01 i `Remakes`-komponenten**

Den indsættes efter case 01 nu og havner mellem 02 og slutningen når Task 6 skyder case 02 ind imellem.

```jsx
      <PeelCase
        number="03"
        label={t('Kommunens opvask', 'The council’s dishes')}
        story={t(
          'Denne hang på mit arbejde, og det gjorde mig så trist - det var et så godt budskab, men det druknede i for meget tekst, dårlig kommunikation og uoverskuelighed.',
          'This was hanging at my workplace, and it made me so sad - it was such a good message, but it drowned in too much text, poor communication and lack of clarity.',
        )}
        before={`${IMG}/before-service.jpg`}
        beforeAlt={t('Den laminerede opvaskseddel før redesignet', 'The laminated dishes notice before the redesign')}
        dir={-1}
        stage="4 / 3"
      >
        <img
          src={`${IMG}/after-service.png`}
          alt={t('Opvaskplakaten efter redesignet', 'The dishes poster after the redesign')}
          className="max-h-full w-auto object-contain"
          style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.16)' }}
        />
      </PeelCase>
```

- [ ] **Step 2: Verificér i browseren**

Screenshot af case 03 midt i løftet. Forventet: papiret roterer om sit **øverste venstre** hjørne og glider ud til venstre. Den grønne plakat står i fuld højde bagved uden at blive beskåret.

Bliver den stående plakat for lille i den `4 / 3` brede scene, sæt `stage="3 / 4"` på netop denne case og screenshot igen.

- [ ] **Step 3: Byg**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/work/Remakes.jsx
git commit -m "Remakes: case 03, kommunens opvask"
```

---

### Task 6: Case 02 - plakat-stakken

ITU-casen har tre færdige plakater. Løftet sker passivt som de andre, men stakken kræver at man rører den: et klik sender den forreste plakat bagerst. Den lille forskel i tempo gør netop den case til noget man selv graver i.

**Files:**
- Modify: `src/pages/work/Remakes.jsx`

**Interfaces:**
- Consumes: `PeelCase` fra Task 4, `EASE`, `INK`, `PEN` fra Task 3.
- Produces: `function PosterStack({ posters, hint, counter })` hvor `posters` er `[{ src, alt }, ...]`, `hint` er klik-teksten og `counter` en funktion `(n, total) => string`. Task 7 udvider komponenten med zoom.

- [ ] **Step 1: Tilføj `PosterStack` over `Hero` i `Remakes.jsx`**

```jsx
const STACK_POSE = [
  { x: 0, y: 0, rotate: -2 },
  { x: 30, y: 14, rotate: 3 },
  { x: 58, y: 28, rotate: 7 },
]

function PosterStack({ posters, hint, counter }) {
  const [order, setOrder] = useState(() => posters.map((_, i) => i))

  const cycle = () => setOrder((o) => [...o.slice(1), o[0]])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative h-[82%]" style={{ aspectRatio: '2380 / 3368' }}>
        {posters.map((p, i) => {
          const pos = order.indexOf(i)
          const pose = STACK_POSE[pos] ?? STACK_POSE[STACK_POSE.length - 1]
          return (
            <motion.button
              key={p.src}
              type="button"
              onClick={cycle}
              aria-label={hint}
              className="absolute inset-0 block cursor-pointer"
              style={{ zIndex: posters.length - pos }}
              animate={{ x: pose.x, y: pose.y, rotate: pose.rotate }}
              transition={{ ease: EASE, duration: 0.55 }}
            >
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-full object-contain"
                style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.18)' }}
                draggable={false}
              />
            </motion.button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-[11px] tracking-[0.16em] uppercase" style={{ color: PEN }}>
          {counter(order[0] + 1, posters.length)}
        </span>
        <span className="font-body text-[12px]" style={{ color: INK, opacity: 0.55 }}>
          {hint}
        </span>
      </div>
    </div>
  )
}
```

`order[0]` er indekset på den plakat der ligger forrest, så tælleren følger stakken og ikke arrayet.

- [ ] **Step 2: Indsæt case 02 mellem case 01 og case 03**

```jsx
      <PeelCase
        number="02"
        label={t('Tallerkenvejledningen', 'The plate guide')}
        story={t(
          'Som studerende på ITU gjorde det mig lidt ondt, at kantinens skiltning ikke afspejlede at vi har over 200 designstuderende i huset. Så her er mine bud på en makeover af "tallerkenvejledningen".',
          'As a student at ITU it hurt a little that the canteen’s signage didn’t reflect that we have over 200 design students in the building. So here is my take on a makeover of the "plate guide".',
        )}
        before={`${IMG}/before-itu.jpg`}
        beforeAlt={t('Tallerkenvejledningen tapet på døren før redesignet', 'The plate guide taped to the door before the redesign')}
        dir={1}
        stage="4 / 3"
      >
        <PosterStack
          posters={[
            { src: `${IMG}/after-itu-1.png`, alt: t('Plakat: vælg den lille tallerken og spar 4,50 kr.', 'Poster: choose the small-rim plate and save 4.50 dkk') },
            { src: `${IMG}/after-itu-2.png`, alt: t('Plakat: spar 4,50 kr.', 'Poster: save 4.50 dkk') },
            { src: `${IMG}/after-itu-3.png`, alt: t('Plakat: tag den lille tallerken', 'Poster: take the small plate') },
          ]}
          hint={t('Klik for at bladre', 'Click to browse')}
          counter={(n, total) => `${n} / ${total}`}
        />
      </PeelCase>
```

- [ ] **Step 3: Verificér stakken i browseren**

Screenshot efter løftet i case 02, klik derefter på den forreste plakat og screenshot igen.

Forventet: tre plakater i en forskudt stak, tælleren viser `1 / 3`, og efter klik ligger plakat 2 forrest med tælleren på `2 / 3`. Efter tre klik er man tilbage ved `1 / 3`.

- [ ] **Step 4: Byg**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/work/Remakes.jsx
git commit -m "Remakes: case 02 med klikbar plakat-stak"
```

---

### Task 7: Lightbox

De redesignede artefakter er tætte på tekst. På en telefon er en menutavle med syv kolonner ulæselig uanset hvor skarp filen er, så alle efter-artefakter skal kunne åbnes stort. Én mekanisme dækker alle tre cases.

**Files:**
- Modify: `src/pages/work/Remakes.jsx`

**Interfaces:**
- Consumes: `AnimatePresence` fra framer-motion (tilføjes til den eksisterende import-linje), `INK`, `PAPER`.
- Produces: `function Lightbox({ shot, onClose })` hvor `shot` er `{ src, alt }` eller `null`. Zoom-tilstanden holdes i `Remakes`-roden og gives videre som `onZoom`-callback til case-indholdet.

- [ ] **Step 1: Udvid framer-motion-importen i toppen af filen**

```jsx
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
```

- [ ] **Step 2: Tilføj `useEffect` til React-importen**

```jsx
import { useEffect, useRef, useState } from 'react'
```

- [ ] **Step 3: Tilføj `Lightbox` over `Hero`**

```jsx
function Lightbox({ shot, onClose }) {
  useEffect(() => {
    if (!shot) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [shot, onClose])

  return (
    <AnimatePresence>
      {shot && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          style={{ background: 'rgba(24,28,25,0.94)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.img
            src={shot.src}
            alt={shot.alt}
            className="max-w-full max-h-full object-contain"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ ease: EASE, duration: 0.35 }}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-6 text-[11px] tracking-[0.16em] uppercase"
            style={{ color: PAPER }}
          >
            Luk
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 4: Hold zoom-tilstanden i `Remakes`-roden**

Tilføj øverst i komponenten:

```jsx
  const [zoom, setZoom] = useState(null)
```

og lige før `</main>`:

```jsx
      <Lightbox shot={zoom} onClose={() => setZoom(null)} />
```

- [ ] **Step 5: Gør efter-artefakterne klikbare**

I case 01 og 03, pak `<img>` ind i en knap:

```jsx
        <button
          type="button"
          onClick={() => setZoom({ src: `${IMG}/after-nvg.png`, alt: t('Menukortet efter redesignet', 'The menu after the redesign') })}
          className="max-w-full max-h-full cursor-zoom-in"
        >
          <img
            src={`${IMG}/after-nvg.png`}
            alt={t('Menukortet efter redesignet', 'The menu after the redesign')}
            className="max-w-full max-h-full object-contain"
            style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.16)' }}
          />
        </button>
```

Samme mønster i case 03 med `after-service.png` og dens alt-tekst.

I `PosterStack` tager et klik allerede stakken rundt. Tilføj derfor en separat forstørrelses-knap under tælleren i stedet for at overtage plakat-klikket:

```jsx
      <div className="mt-4 flex items-center gap-3">
        <span className="text-[11px] tracking-[0.16em] uppercase" style={{ color: PEN }}>
          {counter(order[0] + 1, posters.length)}
        </span>
        <span className="font-body text-[12px]" style={{ color: INK, opacity: 0.55 }}>
          {hint}
        </span>
        <button
          type="button"
          onClick={() => onZoom(posters[order[0]])}
          className="font-body text-[12px] underline underline-offset-4"
          style={{ color: PEN }}
        >
          {zoomLabel}
        </button>
      </div>
```

Udvid `PosterStack`s signatur tilsvarende til `function PosterStack({ posters, hint, counter, onZoom, zoomLabel })` og send `onZoom={setZoom}` samt `zoomLabel={t('Se stor', 'View large')}` med fra case 02.

- [ ] **Step 6: Verificér i browseren**

Klik på menukortet i case 01. Forventet: mørkt overlay, billedet fylder skærmen, "Luk" øverst til højre. Tryk Escape - overlayet forsvinder. Klik "Se stor" i case 02 - den forreste plakat åbnes, ikke den første i arrayet.

- [ ] **Step 7: Byg**

```bash
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add src/pages/work/Remakes.jsx
git commit -m "Remakes: lightbox på efter-artefakterne"
```

---

### Task 8: Afslutning, reduced motion og mobil

Siden må ikke ende blindt, og scroll-scenerne skal have en statisk udgave for dem der har slået animation fra. Mobil får kortere scener og en tilpasset hero.

**Files:**
- Modify: `src/pages/work/Remakes.jsx`

**Interfaces:**
- Consumes: alt fra Task 3-7.
- Produces: `function Outro({ t })` og en `reduce`-gren i `PeelCase`.

- [ ] **Step 1: Tilføj `Outro` over `Hero`**

Ingen `NextProject`-bånd. En rolig gentagelse af sidens præmis plus vejen videre.

```jsx
function Outro({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="max-w-[1180px] mx-auto px-6 md:px-10 py-28 md:py-40 text-center">
      <motion.p
        initial={{ y: 24, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ ease: EASE, duration: 0.7 }}
        className="mx-auto max-w-[18ch] leading-[1.05]"
        style={{ fontFamily: TITLE_FONT, fontWeight: 700, fontSize: 'clamp(30px, 4.4vw, 60px)', color: GREEN }}
      >
        {t('Godt indhold fortjener godt design.', 'Good content deserves good design.')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ ease: EASE, duration: 0.7, delay: 0.15 }}
        className="mt-10"
      >
        <Link
          to="/#arbejde"
          className="inline-block text-[11px] tracking-[0.16em] uppercase"
          style={{ color: PEN }}
        >
          {t('Se de andre projekter', 'See the other projects')} →
        </Link>
      </motion.div>
    </section>
  )
}
```

Farven er sat inline med vilje: Tailwind preflight sætter `a{color:inherit}`, så en klasse ville blive slugt.

- [ ] **Step 2: Kald `<Outro t={t} />` som sidste element før `<Lightbox ... />`**

- [ ] **Step 3: Tilføj reduced-motion-grenen i `PeelCase`**

Tilføj `const reduce = useReducedMotion()` øverst i `PeelCase`, og indsæt før `return`:

```jsx
  if (reduce) {
    return (
      <section className="max-w-[1180px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-[minmax(0,320px)_1fr] gap-10 md:gap-16 items-start">
        <CaseHead number={number} label={label} story={story} />
        <div className="grid gap-6">
          <PrintFrame src={before} alt={beforeAlt} />
          <div className="relative w-full" style={{ aspectRatio: stage }}>
            <div className="absolute inset-0 flex items-center justify-center">{children}</div>
          </div>
        </div>
      </section>
    )
  }
```

Hooks skal stå før dette `return`, ellers brydes hook-rækkefølgen. Alle `useScroll`- og `useTransform`-kald bliver derfor stående øverst i funktionen.

- [ ] **Step 4: Kortere scener på mobil**

`260vh` er for langt på en telefon, hvor der ikke er plads til både tekst og scene ved siden af hinanden. Erstat den faste højde i `PeelCase` med en der følger skærmbredden:

```jsx
  const [tall, setTall] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setTall(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
```

og brug `style={{ height: tall ? '260vh' : '200vh' }}` på `<section>`.

- [ ] **Step 5: Verificér på tre bredder**

Screenshot af hele siden i Aside på 1440, 834 og 390 px bredde.

Forventet:
- 1440: tekst til venstre, scene til højre, ingen vandret scroll.
- 834: samme opdeling, tekstkolonnen smallere.
- 390: tekst over scenen, papir og plakat stadig inden for skærmen, ingen vandret scroll, og hero-fotoene overlapper ikke overskriften.

- [ ] **Step 6: Verificér reduced motion**

Kør i Aside:

```js
await page.emulateMedia({ reducedMotion: 'reduce' })
```

og genindlæs `/arbejde/remakes`. Forventet: ingen sticky scener, hver case viser før over efter i en almindelig kolonne, alt indhold læsbart.

Sæt tilbage bagefter:

```js
await page.emulateMedia({ reducedMotion: 'no-preference' })
```

- [ ] **Step 7: Byg**

```bash
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add src/pages/work/Remakes.jsx
git commit -m "Remakes: afslutning, reduced motion og mobiltilpasning"
```

---

### Task 9: Gennemgang og deploy

**Files:**
- Modify: `CLAUDE.md` (statusafsnittet)

**Interfaces:**
- Consumes: alt fra Task 1-8.
- Produces: intet i kode.

- [ ] **Step 1: Gennemgå siden mod de faste krav**

Læs `src/pages/work/Remakes.jsx` igennem og bekræft hvert punkt:
- Ingen em-dash nogen steder. Søg: `grep -n "—" src/pages/work/Remakes.jsx` skal give nul træffere.
- Ingen rolle, leverancer, år, værktøjer eller `MetaList`.
- Ingen `NextProject`.
- Ingen kommentarer der forklarer hvad koden gør.
- Alle `<img>` har en `alt` der siger noget.

- [ ] **Step 2: Kontrollér at forsidens link virker**

Naviger i Aside til `http://localhost:5173/`, scroll til `#arbejde`, klik Remakes-kortet. Forventet: siden åbner øverst, og et tryk på browserens tilbage-knap lander samme sted i griddet som man forlod, fordi `ScrollManager` gendanner scroll ved tilbage.

- [ ] **Step 3: Byg og deploy**

```bash
cd "/Users/casandra/Desktop/Claude & AI projekter/Portfolio-dev/PortfolioFinal"
npm run build
vercel deploy --prod --yes
```

- [ ] **Step 4: Verificér i produktion**

Naviger i Aside til `https://casandra-portfolio-murex.vercel.app/arbejde/remakes` og tag et screenshot af hero plus én case. Forventet: samme som lokalt, alle otte billeder loader.

- [ ] **Step 5: Opdatér `CLAUDE.md`**

Tilføj Remakes til "Færdigt"-listen i statusafsnittet, notér at siden bevidst afviger fra blocks-kittet med sin egen vægpalet og at før/efter-billederne stammer fra `PortfolioTO/assets/placeholders/før og efter`. Fjern Remakes fra "Resterende WorkDetail-sider" så kun Brødrene Vejen står tilbage.

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md
git commit -m "CLAUDE.md: Remakes-undersiden er bygget"
```
