# CLAUDE.md — Casandra Portfolio

## Status
Sidst opdateret: 2026-07-06
Færdigt: Forside, /om, /cv, navigation, GitHub repo, Vercel deployment, vercel.json SPA-rewrite, tekstur/grain (subtil monokrom, baseFrequency 0.85, opacity 0.15), services-sektion, hero skill-pills (skubbet udad så de ikke rører billedet), /om kun Scrapbook 2.0, CV (årstal i brødtekst-font, sprog samme størrelse som skills), nav med mobil-hamburger, **Etsy-underside bygget med blocks-kit**, /arbejde-oversigt fjernet, mobil-responsivt review, **ScrollManager (gendan scroll ved tilbage, top ved fremad, logo→top)**, **Ø Bar-underside i gang: bespoke scroll-drevet build** — event-night-hero (lyskæder + neon-logo), stor beige intro, scroll-assembly-scene (Opstart→Byggeriet→Åbning→Eventdag, glide-cirkel til højre), animeret tal-graf (grupperet 2024 vs 2025), "Hvad jeg stod for"-kompetence-grid
Næste for Ø Bar: brand/synligheds-sektion (brug plade-væg-billedet m. RU-lockup + bartender-billede), pull quote, resultat-sektion, "hvad du får"-sektion, NextProject. **Billeder mangler at blive lagt i public/images/projects/o-bar/**: Casandra skal droppe crowd-billede (til stage 4) + bartender-billede (til brand). Råfiler ligger gitignored i `_obar-raw/` (261MB, ikke committet). Resterende WorkDetail-sider: Brødrene Vejen, Remakes. GitHub→Vercel auto-deploy ikke sat op endnu.

---

## Tech Stack
- **React 18** + **Vite 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite` — ingen tailwind.config.js, alt i `@theme` i global.css)
- **framer-motion 11** — al animation og drag
- **React Router 6** — routing
- **Playwright** — visuel verifikation efter alle ændringer

## Sidestruktur
```
/              → Forside (hero + services + projekt-grid "Mine fingeraftryk" i #arbejde-sektion)
/arbejde       → redirecter til / (oversigtssiden er fjernet, Work.jsx slettet)
/arbejde/:slug → Individuel projektside (WorkDetail = dispatcher, kun Etsy bygget, resten fallback)
/om            → Om mig (Scrapbook 2.0)
/cv            → Kreativt CV
```
Topnavigationen linker til `#arbejde` (scroller til forsidens projekt-grid), `/om`, `/cv` og kontakt. Projekterne linkes direkte til `/arbejde/:slug` fra forsidens grid.

### Projektundersider (WorkDetail)
- `src/pages/WorkDetail.jsx` er en **dispatcher**: slår projekt op via slug, rendrer projekt-komponent fra `src/pages/work/` (kun `EtsyComposeStudio.jsx` bygget), ellers pæn "under opbygning"-fallback.
- Genbrugelig **blocks-kit** i `src/components/work/blocks.jsx` deler sitets fonte/farver/easing/grain. Komponenter: `DetailHero`, `DragLogo` (post-it, draggable), `TextBlock` (label+number+rød streg), `MetaList`, `Feature` (tekst+billede), `Marquee` (uendelig plakat-rulle), `ImageGrid`, `ImageDuo` (frameColor+maxW), `TiltPair` (vinklede par), `PullQuote`, `NextProject` (tan bånd), `BackLink`.
- Titler bruger **ITC Garamond bold** (`"ITCGaramond", serif` + fontWeight 700), samme som /om — IKKE VSOP.
- Etsy-billeder i `public/images/projects/` (compoze-logo, poster-*, special-*, listing-*). Nogle er tunge og bør komprimeres.
- **Ø Bar (`src/pages/work/OBar.jsx`)**: bespoke, scroll-drevet side (IKKE generisk blocks-kit). Vinkel: 0→1-bygger + forretning, COO & operationel partner. Event-night-look (mørk oliven + amber lyskæder) i hero + tal-ramp; resten creme. Billeder i `public/images/projects/o-bar/` (o-bar-*.jpg kurateret/komprimeret; råfiler tunge, skal ryddes før commit). Tekster skal være CV-konkrete: hvad blev gjort/løst + kompetence, i en arbejdsgivers interesse.
- **Royal Unibrew — VIGTIGT**: På Ø Bar-siden må der KUN nævnes at der eksisterer et samarbejde. INGEN tal og INGEN detaljer om hvad de har givet (rabatter, POS-tilskud, markedsføringstilskud, gavekort, udstyr, containere, minimumsvolumen). Ingen 677k-tal nogen steder.

## Farvepalette
```css
--color-base:     #ebe8d6   /* lys cremegul baggrund */
--color-burgundy: #913C27   /* primær accent, varm rødbrun */
--color-blue:     #5A86AB   /* sekundær accent */
--color-text:     #295C7D   /* mørk navy */
```
Defineret i `src/styles/global.css` under `@theme`.

## Typografi
- **VSOP** (serif) — display/headlines, tal/årstal på CV
- **Montigny** (script/cursive) — sektionslabels på CV, "C" i Casandra-navn på forside
- **DM Sans / Inter** — brødtekst
- Fonte serveres fra `/public/fonts/`

## Animationsprincipper
- **Framer Motion til alt** — ingen CSS transitions alene
- Easing: `[0.22, 1, 0.36, 1]` overalt
- Staggered letter-animation på forsidesnavn ved load
- `useInView` til scroll-triggerede reveals (`once: true, margin: '-60px'`)
- Draggable elementer: forsiden (B-DDIT-kort, `left: '56%', top: '18%'`), CV-siden (polaroid-foto)
- AnimatePresence til expand/collapse
- Services-sektionen på forsiden bruger en scroll-tegnet SVG-kurve med zigzag-opstillede bokse

## Projektdata
Ligger i `src/data/projects.js`. Projekter (i rækkefølge):
1. **Ø Bar** (slug: `o-bar`) — visuel identitet & grafisk design, 2023-2024
2. **Etsy / CompozeStudio** (slug: `etsy-composestudio`) — e-handel & branding, 2022-2023
3. **Brødrene Vejen** (slug: `brodrene-vejen`) — fotografi & identitet, 2023
4. **Remakes** (slug: `remakes`) — personligt projekt, 2022

## Erfaringsdata
Ligger i `src/data/experience.js` — bruges af både `/om` og `/cv`.

## Tone of Voice
- Dansk (primært), engelsk via sprogskift
- Direkte · Varm · Konkret
- Ikke fluffy, ikke AI-agtig, ikke overdrevent formel
- Ingen em-dashes — brug bindestreg

## Arbejdsregler
1. **Playwright efter alle visuelle ændringer** — screenshot før rapportering
2. **Dev server**: kør `npm run dev`, typisk på port 5173
3. Byg én ting ad gangen — ikke hele sektioner på én gang
4. Rediger eksisterende filer fremfor at oprette nye
5. Ingen kommentarer der forklarer hvad koden gør
6. Ingen abstraktion udover hvad opgaven kræver
7. Deploy til Vercel med `vercel deploy` når vi er klar (ingen auto-deploy fra GitHub endnu)
8. Lokal auto-push er sat op i `.claude/settings.local.json` via PostToolUse-hook på `git commit` - den er personlig og skal ikke committes

## Deployment
- **GitHub**: https://github.com/casandralpedersen/casandra-portfolio (offentligt)
- **Vercel**: https://casandra-portfolio-murex.vercel.app
- GitHub → Vercel auto-deploy er ikke sat op endnu (skal gøres manuelt på vercel.com)
- Lokal auto-push til GitHub er sat op via `.claude/settings.local.json`

## Kendte mangler / beslutninger udestående
- VSOP-fonten har defekte/manglende æ/ø/å-glyffer (tegnes som a/o/a, så browser-fallback udløses ikke). På Scrapbook 2.0-titlerne pakkes kun selve specialtegnet i Georgia via `renderTitle`/`wrapSpecial` i `aboutContent.jsx` - resten af titlen forbliver VSOP. "Ø Bar" vises stadig som "O Bar" i display-font.
- `/om` har nu 3 layout-modes: Scrapbook, Scrapbook 2.0, Spotlight (Original og Magasin er slettet)
- WorkDetail (`/arbejde/:slug`) er stub - bygges når projektbilleder er klar
- Projektbilleder mangler (`cover: null` på alle projekter)
- Custom cursor blev bygget og testet, men Casandra foretrak almindelig browser-cursor - fjernet igen. Brug ikke custom cursor fremover medmindre hun selv beder om det.
- `--color-blue` bruges i praksis kun på `/om` til uddannelses-markering. Hvis blå skal ind på forsiden, er B-DDIT-kortet det mest naturlige sted, så farven får en tydelig betydning i stedet for bare dekoration.
- Kurvens scroll-timing i services-sektionen er finjusteret manuelt mod layoutet og kan kræve små justeringer igen, hvis boksbredder eller rækkefølge ændres.
