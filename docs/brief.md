# Portfolio Brief — Casandra Linde Pedersen

## Hvad vi bygger
Personligt designportefølje på dansk. Multi-page React + Vite app.
Målgruppe: bureauer og virksomheder der søger studentermedhjælper/praktikant inden for design, kommunikation, økonomi eller administration.
Førstehåndsindtryk: *"Det er personligt og hun er ikke kedelig at samarbejde med."*

## Visuel retning
- Asymmetriske layouts — ikke alt centreret
- Generøst negativt rum
- Tunge visuals, ikke standard kort-grid
- Polaroid-agtige billeder og overlappende elementer
- Personligt foto integreret tidligt — ikke gemt i om mig
- **Må ikke ligne:** generisk hvid developer-portfolio, coquette/sticker-æstetik, purple gradient

**Referencer:** Uthinh Pham, Aneri Shah, Lobster Lab, Sando brand identity

## Sidestruktur
- `/` — Forside: hero (navn + foto + draggable kort) + projektpreview
- `/arbejde` — Projektoversigt: editorial layout, varierende størrelser
- `/arbejde/:slug` — Individuel projektside (ikke bygget endnu)
- `/om` — Bio + erfaring/uddannelse tidslinje
- `/cv` — Kreativt CV: stort navn, expand/collapse erfaring, draggable polaroid

## Navigation
Sticky nav: **Casandra** (logo) til venstre · **Arbejde · Om · Kontakt** til højre
Kontakt er en knap (burgundy), ikke bare et link. Sprogskift DA/EN yderst til højre.

## Interaktivitet (kerneprioritering)
- Draggable B-DDIT-kort på forsiden
- Draggable polaroid-foto på CV-siden
- Hover-animationer på alle projektkort
- Scroll-triggerede indflyninger (useInView)
- Staggered letter-animation ved load (forsidesnavn)
- Expand/collapse på CV-erfaring (accordion — kun ét åbent ad gangen)

## Sektion der mangler / udestående
- Noget mellem hero og projekter på forsiden — muligvis skills — ikke besluttet endnu
- WorkDetail-sider — venter på projektbilleder
- Custom cursor — overvejes stadig
