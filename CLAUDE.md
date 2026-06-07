# CLAUDE.md — Casandra Portfolio

## Status
Sidst opdateret: 2026-06-07
Færdigt: Forside, /arbejde, /om, /cv (med expand/collapse, justerede tekststørrelser), navigation, GitHub repo, Vercel deployment, vercel.json SPA-rewrite (fixer 404 på direkte route-navigation), tekstur/grain på Home og About hero
Næste: Projektbilleder uploades til /arbejde, WorkDetail-sider bygges når billeder er klar. GitHub→Vercel auto-deploy kræver stadig at Casandra forbinder GitHub Login Connection på vercel.com/account/login-connections (CLI-forbindelse fejler indtil da)

---

## Tech Stack
- **React 18** + **Vite 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite` — ingen tailwind.config.js, alt i `@theme` i global.css)
- **framer-motion 11** — al animation og drag
- **React Router 6** — routing
- **Playwright** — visuel verifikation efter alle ændringer

## Sidestruktur
```
/              → Forside (hero + projektliste preview)
/arbejde       → Projektoversigt (alle projekter)
/arbejde/:slug → Individuel projektside (stub — ikke bygget endnu)
/om            → Om mig (bio + erfaring/uddannelse tidslinje)
/cv            → Kreativt CV (expand/collapse erfaring, draggable polaroid)
```

## Farvepalette
```css
--color-base:     #F5F0E8   /* creme baggrund */
--color-burgundy: #8B2A2A   /* primær accent */
--color-blue:     #7A9BB5   /* sekundær accent */
--color-text:     #1A1A1A   /* næsten sort */
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

## Deployment
- **GitHub**: https://github.com/casandralpedersen/casandra-portfolio (offentligt)
- **Vercel**: https://casandra-portfolio-murex.vercel.app
- GitHub → Vercel auto-deploy er ikke sat op endnu (skal gøres manuelt på vercel.com)

## Kendte mangler / beslutninger udestående
- VSOP-fonten har ikke Ø-tegnet — "Ø Bar" vises som "O Bar" i display-font
- WorkDetail (`/arbejde/:slug`) er stub — bygges når projektbilleder er klar
- Projektbilleder mangler (`cover: null` på alle projekter)
- Custom cursor blev bygget og testet, men Casandra foretrak almindelig browser-cursor — fjernet igen. Brug ikke custom cursor fremover medmindre hun selv beder om det.
