# CLAUDE.md — Casandra Portfolio

## Status
Sidst opdateret: 2026-08-11
Færdigt: Forside, /om, /cv, navigation, GitHub repo, Vercel deployment, vercel.json SPA-rewrite, tekstur/grain (subtil monokrom, baseFrequency 0.85, opacity 0.15), services-sektion, hero skill-pills (skubbet udad så de ikke rører billedet), /om kun Scrapbook 2.0, CV (årstal i brødtekst-font, sprog samme størrelse som skills), nav med mobil-hamburger, **Etsy-underside bygget med blocks-kit**, /arbejde-oversigt fjernet, mobil-responsivt review, **ScrollManager (gendan scroll ved tilbage, top ved fremad, logo→top)**, **Ø Bar-underside i gang: bespoke scroll-drevet build** — event-night-hero (lyskæder + neon-logo), stor beige intro, scroll-assembly-scene (Opstart→Byggeriet→Åbning→Eventdag med rigtige fotos, glide-cirkel til højre), animeret tal-graf (grupperet 2024 vs 2025: Laveste 25% 7k→15k, Gnsm 18k→32k, Rekord 65k→120k), gæste-tal (~500/~2.000/17.000), "Hvad jeg stod for"-kompetence-grid, **SoMe/marketing-sektion (paid ads + organisk, Instagram-grid)**
**Session 2026-08-08:** **Blitz-underside bygget** (`/arbejde/blitz`, erstattede "Kommer snart"-felt 05). Scroll-drevet stak: én høj container (420vh) med `sticky top-0 h-screen` scene hvor 4 sektioner (Udkast/Retning/App-ikon/Størrelse) krydsfader via `useScroll`+`useTransform` — samme teknik som Ø Bars AssembleScene. Progress-rail i højre side. Hero: app-ikon-flise (live SVG fra `Endelig.svg`, draggable) med "fun fact"-seddel ved hover/tap. Assets i `public/images/projects/blitz/` (12 draft-*, 4 variant-*, 11 tile-*, alle beskåret+transparente fra Figma-ark, ~630KB total). Scope: KUN app-ikonet (Lukas' firma havde identitet i forvejen) — copy holder sig til ikonet uden disclaimer.
**Session 2026-08-10:** **Remakes-underside bygget** (`/arbejde/remakes`). Bevidst anderledes end de andre projektsider: egen kølig vægpalet (`WALL #E3E1D9`, `INK #2C3630`, `PEN #913C27` som rettelsesblæk, `GREEN #3B7751`), INGEN meta (rolle/leverancer/år/værktøjer) og INGEN NextProject-bånd - slutter med "Godt indhold fortjener godt design." + link til `/#arbejde`. Motoren er `PeelCase`: 260vh sektion (200vh på mobil) med `sticky top-0 h-screen`, hvor et før-foto roterer om sit tape-hjørne og glider ud af rammen mens efter-designet fader op nedenunder. Tre udgangsretninger (`right`/`up`/`far`) så casene ikke bliver ens, plus `EXIT_NARROW` på mobil fordi den lodrette udgang ellers flyver hen over tekstkolonnen. Case 02 har `PosterStack`: tre ITU-plakater i forskudt stak, klik sender den forreste bagerst. Alle efter-artefakter kan åbnes i `Lightbox` (Escape lukker) - det løser læsbarheden på mobil, hvor levende HTML-embed af NVG-menuen blev droppet (afhænger af Google Fonts + ikon-CDN og ville stadig kræve nyt layout). Billeder i `public/images/projects/remakes/` (3 før-jpg + 5 efter-png, 3,2 MB), kilde: `PortfolioTO/assets/placeholders/før og efter`. Tekster er Casandras egne fra det gamle portfolios `data.js`. Labels omdøbt fordi hendes egne kolliderede: Menuskærmen (NVG), Tallerkenvejledningen (ITU), Kommunens opvask. Plan: `docs/superpowers/plans/2026-08-10-remakes-underside.md`.

**Session 2026-08-11:** **HRS-underside bygget** (`/arbejde/hrs`, Hovedstadens Rekrutteringsservice, projektansat apr-sep 2026 ifbm. omstruktureringen i Novo Nordisk). Bespoke som Ø Bar/Remakes, ikke blocks-kit. Grebet er et paletskift halvvejs: HRS-blå (`#1A1FA8` / `#12137A` på papir `#E8EAF6`, accenter mint `#6BC4A6` + rosa `#E8B0C0` fra logoets cirkler) skifter til GreenSM-turkis (`#00B8B2` / `#007A76` / nat `#122524` / gul `#FFD300`) - to opgaver, to målgrupper. Case 01 (brancheskifte-event) er invitationen i papirramme + lightbox. Case 02 (GreenSM) er `FormatScene`: 220vh med `sticky top-0 h-screen`, hvor den **stående** starter stor og centreret, glider til venstre, og den liggende folder sig ud ved siden af - `hidden md:block`, med `FormatStack` som almindelig stak på mobil. Hero-cirklerne er `hidden md:block` fordi de ellers lå oven i meta-teksten. Billeder i `public/images/projects/hrs/` (3 stk, ~4,7 MB). Placeholder-flisen "Projekt 06" på forsiden er fjernet - `placeholderProjects` er nu tom.
**Forside 2026-08-11:** Nyt hero-billede `hero-me-photo.png` (Casandras egen fritlægning af `headeralternativ`). **Gotcha:** billedet er fritlagt på et stramt lærred (figuren fylder 88% af højden), hvor det gamle `hero-me.png` havde masser af luft - derfor `translateX(8%) translateY(-17%) scale(0.78)` for at ramme samme visuelle størrelse som før. Skift billede = juster de tal igen. Skill-pills er skiftet til 10 nye (Kommunikation, Grafisk design, Marketing, Visuel kommunikation, Struktur, Administration, UX, Løsningsorienteret, Vibe coding, Omstillingsparat) i to kolonner der stopper ved fodhøjde. Projektrækkefølge: Ø Bar, Blitz, Remakes, Etsy, Brødrene Vejen, HRS.

**CV omskrevet:** `/cv` bruger nu `src/pages/cv/LayoutDossier.jsx` (to-kolonners rekruttør-CV: sticky sidebar m. kompetencer/sprog-metre, lodret tidslinje m. fold-ud). Delt data i `src/pages/cv/shared.jsx`. Download PDF henter rigtig fil fra `public/cv/casandra-linde-pedersen-cv.pdf`. **Gotcha:** `text-white` findes ikke i kompileret CSS + Tailwind preflight sætter `a{color:inherit}` → farve på anker-knapper SKAL sættes inline.
**Forside:** ny hero (script "Hejsa, Casandra her.", roterende drevet-af-ord, primær "Hvad jeg kan" → `#kogt-ned`, sekundær "se mine referencer" → `#arbejde`), AboutTeaser rykket op med negativ margin så billede 2 er synligt over folden, fik rigtig VSOP-titel + afsnit om arbejdsmetoder.

Næste for Ø Bar: pull quote, resultat-sektion, "hvad du får"-sektion, NextProject. Evt. brand-sektion m. plade-væg-billedet (RU-lockup). Bartender-billede ligger klar som `o-bar-crew.jpg` (bruges evt. i brand/service). Ø Bar-billeder er komprimeret i public (o-bar-*, ~12MB); 67 råfiler gitignored i `_obar-raw/` (kan hente flere derfra). Resterende WorkDetail-side: Brødrene Vejen. GitHub→Vercel auto-deploy ikke sat op endnu.

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
- **Remakes (`src/pages/work/Remakes.jsx`)**: bespoke scroll-drevet side med egen vægpalet, ikke blocks-kit. Må aldrig få meta-liste eller NextProject.
- **HRS (`src/pages/work/HRS.jsx`)**: bespoke, paletskift fra HRS-blå til GreenSM-turkis midtvejs. Vinkel: kommunikation til folk der er blevet opsagt - konkret om værktøjer (Bricksite, Figma, PowerPoint, Excel) og opgaver, ikke fluffy.
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
4. **Remakes** (slug: `remakes`) - personligt projekt, 2025
5. **Blitz** (slug: `blitz`) - ikondesign, 2025
6. **Hovedstadens Rekrutteringsservice** (slug: `hrs`) - rekrutteringskommunikation, 2026

Rækkefølgen i `projects.js` er Casandras egen: Ø Bar, Blitz, Remakes, Etsy, Brødrene Vejen, HRS.

## Erfaringsdata
Ligger i `src/data/experience.js` — bruges af både `/om` og `/cv`.

## Tone of Voice
- Dansk (primært), engelsk via sprogskift
- Direkte · Varm · Konkret
- Ikke fluffy, ikke AI-agtig, ikke overdrevent formel
- Ingen em-dashes — brug bindestreg

## Arbejdsregler
1. **Playwright efter alle visuelle ændringer** - screenshot før rapportering. Kør mod **Aside** (Casandras browser), ikke Chrome: MCP-serveren `aside` i `~/.claude.json` peger på `/Applications/Aside.app/Contents/MacOS/Aside`
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
