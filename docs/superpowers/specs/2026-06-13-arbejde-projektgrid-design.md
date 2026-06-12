# Arbejde-projektgrid på forsiden

## Baggrund

Forsidens "Arbejde"-sektion viser i dag de 4 projekter som en lodret liste af rækker (`ProjectRow` i `Home.jsx`), hver med nummer, titel, kategori/år og et farve- eller billedfelt til højre. Den erstattes af et grid af farvede felter, inspireret af bento-grid-referencer, men uden cover-billeder.

## Layout

- 3 kolonner x 2 rækker på desktop, 2 kolonner x 3 rækker på mobil.
- 6 kvadratiske felter (`aspect-square`), ingen gap - felterne ligger op af hinanden.
- Grid'et sidder inden for samme `px-10`-margin som resten af sidens indhold (ikke full-bleed).
- Sektionsoverskriften "Arbejde" / "ARBEJDE" forbliver ovenpå grid'et, uændret fra i dag.

## Feltindhold

Hvert felt er en ren farveflade i projektets `accent`-farve fra `projects.js`. I bunden af feltet, med padding:

- Titel i VSOP serif, ~28px (`clamp` for responsivitet)
- Kategori/arbejdstype, lille (~11px), uppercase, letter-spacing, ~60% opacity

Tekstfarve vælges automatisk ud fra baggrundsfarvens lyshed (luminans-beregning på `accent`-hex): lys baggrund (Etsy/CompozeStudio, `#C4A882`) får mørk tekst (`--color-text`), de øvrige mørkere baggrunde får lys tekst (`--color-base`). Dette beregnes generisk, så det også virker for fremtidige projekter uden manuel indstilling.

De 4 første felter er de eksisterende projekter i `projects.js`-rækkefølge (Ø Bar, Etsy / CompozeStudio, Brødrene Vejen, Remakes).

## Hover

- Let lysning/mørkning af feltets farve via et halvtransparent overlay.
- En pil (→) fader ind i feltets hjørne (f.eks. øverst til højre).
- `cursor: pointer`.
- Hele feltet er en `Link` til `/arbejde/:slug`.

## "Kommer snart"-felter (5 og 6)

To ekstra felter for fremtidige projekter, hardcodet i grid-komponenten (ikke i `projects.js`, da de ikke er rigtige projekter med slug/beskrivelse):

- Felt 5: baggrund `var(--color-burgundy)` (`#913C27`), titel "Kommer snart" / "Coming soon" med reduceret opacity (~0.6), label "Projekt 05" med endnu lavere opacity (~0.4)
- Felt 6: baggrund `var(--color-blue)` (`#5A86AB`), samme stil, label "Projekt 06"
- Ikke klikbare, ingen hover-effekt, ingen pil.

Når der kommer rigtige projekter til, udskiftes disse felter manuelt med data fra `projects.js` - ingen automatisk håndtering af "kommende projekter" indbygges.

## Implementering

- Ny komponent i `Home.jsx` (f.eks. `WorkGrid`) erstatter den nuværende `ProjectRow`-baserede liste i homepage-sektionen med `id="arbejde"` (omkring linje 457-461).
- `ProjectRow`-funktionen i `Home.jsx` fjernes, da den ikke længere bruges der.
- Scroll-in animation: samme stagger/fade-mønster som den nuværende `ProjectRow` (`useInView`, `once: true`).
- En lille luminans-helper (f.eks. `getContrastTextColor(hex)`) tilføjes i `Home.jsx` til at vælge tekstfarve pr. felt.

## Ude af scope

- `/arbejde`-oversigtssiden (`Work.jsx`) - har sin egen `ProjectRow` og rører ikke ved denne ændring.
- `/arbejde/:slug`-detaljesider - uændrede (stadig stubs).
- Ingen ændringer i `projects.js` (ingen nye projekter tilføjes - placeholders er hardcodede i komponenten).
- Sidetransitions ved navigation til projektsider.
