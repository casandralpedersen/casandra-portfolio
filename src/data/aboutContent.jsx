export const LINKEDIN = 'https://www.linkedin.com/in/casandra-linde-pedersen'
export const EMAIL = 'casandralpedersen@gmail.com'
export const ABOUT_PHOTO = '/images/alternativtmepic.png'

export const aboutLabel = {
  da: 'En designer med forretningsforståelse',
  en: 'A designer with business insight',
}

export const aboutIntro = {
  da: 'Mit venndiagram med design, IT og forretning - altid med målgruppen i centrum.',
  en: 'My Venn diagram of design, IT and business - always with the audience at the centre.',
}

export const aboutBlocks = [
  {
    type: 'text',
    noteTitle: {
      da: 'Drevet af **evig nysgerrighed** og **sund kritik**',
      en: 'Driven by **endless curiosity** and **healthy skepticism**',
    },
    da: 'Jeg har et arbejdsliv drevet af nysgerrighed og indre motivation, og det har fået mig i mange spændende retninger. Alt fra marketing og drift som COO, til at bygge visuel identitet fra bunden og arbejde med IT-support og kundeservice.',
    en: "I have a working life driven by curiosity and inner motivation, and it's taken me in many interesting directions. Everything from marketing and operations as a COO, to building a visual identity from scratch and working in IT support and customer service.",
  },
  {
    type: 'text',
    noteTitle: {
      da: 'Det starter altid med **målgruppen**',
      en: 'It always starts with the **audience**',
    },
    da: 'Uanset om det er en hjemmeside, en kampagne eller et opslag, starter jeg med det samme spørgsmål: **hvem taler vi til, og hvad skal de føle, forstå eller gøre?**',
    en: "Whether it's a website, a campaign or a post, I start with the same question: **who are we talking to, and what should they feel, understand or do?**",
  },
  {
    type: 'quote',
    da: 'Mit mål er, at folk ikke bare ser indholdet\n- men **forstår** det, **stoler** på det og **handler** på det.',
    en: "My goal is that people don't just see the content\n- but **understand** it, **trust** it and **act** on it.",
  },
  {
    type: 'text',
    noteTitle: {
      da: 'Teori og **praksis**',
      en: 'Theory and **practice**',
    },
    da: 'Et arbejdsliv parallelt med relevante studier, gør at jeg har fået forståelse for hvordan ting hænger sammen i teori og praksis.',
    en: 'A working life alongside relevant studies has given me an understanding of how things fit together in theory and practice.',
  },
  {
    type: 'text',
    noteTitle: {
      da: 'Brænder for **optimering**',
      en: 'Passionate about **optimisation**',
    },
    da: 'Jeg brænder for målgrupper, UX og optimering. Hvilken knap bliver klikket? Hvor falder folk fra? Og hvad skal der til, før de gør det, de kom for? Det er præcis den slags spørgsmål jeg vil hjælpe jer med at svare på - med A/B-test og evaluering af jeres processer.',
    en: "I'm passionate about target audiences, UX and optimisation. How do you tailor communication and user experience so it works - and can ideally be measured in numbers?",
  },
  {
    type: 'text',
    noteTitle: {
      da: 'Ned i **AI**-kaninhullet',
      en: 'Down the **AI** rabbit hole',
    },
    da: 'AI er udfordrende, men yderst tilfredsstillende når det virker! Jeg har altid elsket statistik og systemer, og AI er et område, jeg bruger meget tid på at dykke ned i lige nu, f.eks. i projekter som dette, med vibecoding, GitHub og Vercel. Eller automatisering af privatliv og studie. Jeg er overbevist om, at det her ændrer måden, vi arbejder på - og jeg hygger mig med at følge med og lærer en masse i processen.',
    en: "AI is challenging, but deeply satisfying when it works! I've always loved statistics and systems, and AI is an area I spend a lot of time diving into right now - for example in projects like this one, with vibe coding, GitHub and Vercel. Or automating bits of everyday life and studies. I'm convinced this is changing the way we work, and I genuinely enjoy keeping up and learning a lot along the way.",
  },
  {
    type: 'quote',
    da: 'Jeg ved, hvornår jeg er specialisten, og hvornår jeg skal spørge en.',
    en: "I know when I'm the specialist, and when to ask one.",
  },
  {
    type: 'text',
    noteTitle: {
      da: 'Aldrig bange for at **spørge**',
      en: 'Never afraid to **ask**',
    },
    da: 'Jeg elsker at lære fra mig, men er på samme måde ikke bange for at lære nyt eller stille dumme spørgsmål. Jeg tror på, at det mest selvstændige, proaktive arbejde forudsætter, at man er en teamplayer og kender sine styrker og svagheder.',
    en: "I love sharing what I know, but I'm just as unafraid to learn something new or ask a stupid question. I believe the most independent, proactive work depends on being a team player who knows their strengths and weaknesses.",
  },
  {
    type: 'small',
    da: 'Og så det formelle: jeg læser Digital Design og Interaktive Teknologier på ITU.',
    en: "And the formal part: I'm studying Digital Design and Interactive Technologies at ITU.",
  },
]

const DANISH_SPECIAL = /[æøåÆØÅ]/
const SERIF_FALLBACK = 'Georgia, "Times New Roman", serif'

// VSOP mangler æ/ø/å-glyffer, så citater med disse bogstaver falder tilbage til en anden serif
export function quoteFont(text) {
  return DANISH_SPECIAL.test(text) ? SERIF_FALLBACK : 'var(--font-display)'
}

export function renderEmphasised(text, color = 'var(--color-burgundy)', italic = false) {
  return text.split('\n').flatMap((line, li, arr) => {
    const parts = line.split(/\*\*(.+?)\*\*/g).map((part, i) =>
      i % 2 === 1 ? (
        <em key={`${li}-${i}`} className={italic ? 'italic' : 'not-italic font-semibold'} style={{ color }}>
          {part}
        </em>
      ) : (
        part
      )
    )
    return li < arr.length - 1 ? [...parts, <br key={`br-${li}`} />] : parts
  })
}

const SPECIAL = /([æøåÆØÅ])/

// VSOP mangler æ/ø/å-glyffer (de tegnes som a/o/a), så vi pakker kun selve specialtegnet i en serif med korrekt glyf
function wrapSpecial(text, keyPrefix) {
  return text.split(SPECIAL).map((seg, i) =>
    SPECIAL.test(seg) ? (
      <span key={`${keyPrefix}-${i}`} style={{ fontFamily: SERIF_FALLBACK }}>
        {seg}
      </span>
    ) : (
      seg
    )
  )
}

export function renderTitle(text, color = 'var(--color-burgundy)') {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="not-italic" style={{ color }}>
        {wrapSpecial(part, `e${i}`)}
      </em>
    ) : (
      <span key={i}>{wrapSpecial(part, `p${i}`)}</span>
    )
  )
}
