# Forside-modes - design

## Formål

Forsiden skal kunne opleves i fem forskellige visuelle retninger:

1. Original - den nuværende forside bevares uændret som et valg.
2. Editorial - rolig, typografisk og selvsikker.
3. Scrapbook - taktil, personlig og lagdelt.
4. Lab - systemisk, interaktiv og teknologisk.
5. Cinema - dramatisk, scenebaseret og scroll-koreograferet.

Brugeren skifter mellem dem med en lille fast mode-switcher som på `/om`. Valget gemmes i `localStorage`.

## Fælles indhold

Alle modes skal formidle den samme kerne:

- Casandra og hendes faglige positionering.
- Design, forretning og teknologi.
- Kort introduktion og link til `/om`.
- Kompetencer og arbejdsområder.
- Projekter fra den eksisterende `projects`-data.
- Kontakt og eksisterende navigation.

Modes må variere i rækkefølge, layout, typografi og animation, men links og projektdata skal komme fra fælles kilder.

## Mode-switcher

- Fast nederst til højre, visuelt beslægtet med switcheren på `/om`.
- Labels: `Original`, `Editorial`, `Scrapbook`, `Lab`, `Cinema`.
- Aktiv mode er tydeligt markeret.
- Ved mode-skift scrolles siden til toppen.
- Valget gemmes som `home-layout` i `localStorage`.
- På mobil scroller switcheren horisontalt med de samme labels, så alle modes er tilgængelige.

## Original

Den nuværende `Home` bevares som selvstændig mode uden visuelle ændringer. Dens eksisterende hero, service-kurve, projektgrid og kontaktsektion må ikke slettes.

## Editorial

### Visuelt

- Stor typografi er det bærende element.
- Stram redaktionel gridstruktur med asymmetriske kolonner.
- Begrænset dekoration og tydelig luft.
- Eksisterende creme, burgundy og blå bruges mere disciplineret.
- Projekter præsenteres som kuraterede opslag med store titler og metadata.

### Animation

- Heroens ord ankommer linjevis og bogstavvis.
- Store billed- og projektflader folder sig roligt ud.
- Diskret parallax på udvalgte elementer.
- Sektioner afsløres med kontrolleret timing og uden konstant bevægelse.

## Scrapbook

### Visuelt

- Papirlag, tape, noter, billeder, pile og labels.
- Organisk komposition med tydelig læseretning.
- Design, Forretning og Teknologi bruges som farvede chips.
- Projekterne føles som fundne eller fastgjorte artefakter.
- Elementer holdes trukket ind mod midten på desktop.

### Animation

- Noter og billeder lander med små rotationsforskelle ved load.
- Enkelte billeder eller kort kan trækkes.
- Pile og streger tegnes ind under scroll.
- Små elementer svæver diskret, men brødtekst står roligt.

## Lab

### Visuelt

- Forsiden præsenteres som et kreativt system eller kontrolpanel.
- Design, Forretning og Teknologi er noder i et forbindelsesdiagram.
- Projekter vises som moduler med status, kategori og år.
- Transparente paneler, fine linjer og klare systemlabels.
- Udtrykket skal stadig bruge portfoliens varme palette og ikke ligne et generisk mørkt dashboard.

### Animation

- Noder forbindes med linjer, når heroen loader.
- Hover på noder fremhæver relaterede kompetencer eller projekter.
- Moduler reagerer som et levende værktøjspanel.
- Scroll-progress bruges til at aktivere næste systemlag.

## Cinema

### Visuelt

- Forsiden består af store scener med tydelige skift i tempo.
- Heroen fungerer som åbningsscene med stor titel og portræt.
- Projekter vises som frames eller kapitler.
- Mørkere blå og burgundy flader kan bruges, men creme bevarer genkendeligheden.
- Sektionerne må føles dramatiske uden at blokere navigation eller læsning.

### Animation

- Store reveals og lagdelte sceneovergange.
- Tekst og billeder bevæger sig med forskellig scroll-hastighed.
- Projekter ankommer som frames i en filmstrimmel.
- Kontaktsektionen fungerer som en rolig slutscene.

## Struktur

- `Home.jsx` bliver ansvarlig for valg, persistence og rendering af aktiv mode.
- Den nuværende forside flyttes intakt til en `HomeOriginal`-komponent.
- Hver ny mode får sin egen fokuserede komponent under `src/pages/home/`.
- Små fælles dele som mode-switcher og fælles projektlinks kan deles, når det reducerer reel duplikation.
- Mode-specifik layoutkode holdes adskilt, så visuelle retninger ikke bliver flettet sammen i én stor komponent.

## Responsiv adfærd

- Alle fem modes skal fungere ved cirka 390 px og 1440 px bredde.
- Store typografiske kompositioner skal skalere med `clamp`.
- Overlap og drag må ikke skjule vigtigt indhold på mobil.
- Lab-forbindelser og Cinema-parallax skal forenkles på mindre skærme.
- `prefers-reduced-motion` skal respekteres for de mest markante kontinuerlige animationer.

## Verifikation

- Build skal gennemføres uden fejl.
- Playwright verificerer at alle fem mode-knapper virker og gemmes i `localStorage`.
- Playwright verificerer at mode-skift starter i toppen.
- Hver mode verificeres visuelt på desktop og mobil.
- Eksisterende links til `/om`, `/arbejde/:slug`, `/cv` og mail skal fortsat virke.

## Afgrænsning

- Ingen eksisterende forside slettes.
- Projektdata og tekster omskrives ikke som del af denne opgave.
- WorkDetail-sider bygges ikke.
- Mode-switcheren er et preview-værktøj og kan fjernes senere, når en endelig forside er valgt.
