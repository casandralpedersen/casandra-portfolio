export const LINKEDIN = 'https://www.linkedin.com/in/casandra-linde-pedersen'
export const EMAIL = 'casandralpedersen@gmail.com'
export const ABOUT_PHOTO = '/images/alternativtmepic.png'

export const aboutLabel = {
  da: 'En designer med forretningsforståelse',
  en: 'A designer with business insight',
}

export const aboutIntro = {
  da: 'Mit venndiagram med kommunikation, design og teknologi - altid med målgruppen i centrum.',
  en: 'My Venn diagram of communication, design and technology - always with the audience at the centre.',
}

export const aboutBlocks = [
  {
    type: 'text',
    noteTitle: {
      da: 'Det starter altid med **målgruppen**',
      en: 'It always starts with the **audience**',
    },
    da: 'Uanset om det er en hjemmeside, en kampagne eller et opslag, starter jeg med det samme spørgsmål: hvem taler vi til, og hvad skal de føle, forstå eller gøre?',
    en: "Whether it's a website, a campaign or a post, I start with the same question: who are we talking to, and what should they feel, understand or do?",
  },
  {
    type: 'quote',
    da: 'Jeg arbejder med kommunikation, design og teknologi - og ser dem som tre ting der ikke giver mening uden hinanden.',
    en: "I work with communication, design and technology - and see them as three things that don't make sense without each other.",
  },
  {
    type: 'text',
    noteTitle: {
      da: 'Et arbejdsliv drevet af **nysgerrighed**',
      en: 'A working life driven by **curiosity**',
    },
    da: 'Jeg har haft et arbejdsliv drevet af nysgerrighed og indre motivation, og det har fået mig i mange spændende retninger. Alt fra drift, rekruttering og marketing som COO, til at bygge visuel identitet fra bunden og arbejde med IT-support og kundeservice.',
    en: "I've had a working life driven by curiosity and inner motivation, and it's taken me in many interesting directions. Everything from operations, recruitment and marketing as a COO, to building a visual identity from scratch and working in IT support and customer service.",
  },
  {
    type: 'text',
    noteTitle: {
      da: 'Teori og **praksis** i samspil',
      en: 'Theory meets **practice**',
    },
    da: 'Det mix, parallelt med relevante studier, gør at jeg har fået forståelse for hvordan ting hænger sammen i teori og praksis.',
    en: 'That mix, alongside relevant studies, has given me an understanding of how things fit together in theory and practice.',
  },
  {
    type: 'text',
    noteTitle: {
      da: 'Brænder for **optimering**',
      en: 'Passionate about **optimisation**',
    },
    da: 'Jeg brænder for målgrupper, UX og optimering. Hvordan tilpasses kommunikation og brugeroplevelse, så den virker - og gerne kan måles i statistik?',
    en: "I'm passionate about target audiences, UX and optimisation. How do you tailor communication and user experience so it works - and can ideally be measured in numbers?",
  },
  {
    type: 'text',
    noteTitle: {
      da: 'Dyk ned i **AI**',
      en: 'Diving into **AI**',
    },
    da: 'Tilfredsstillende! Jeg har altid elsket statistik og systemer, og AI er et område jeg bruger meget tid på at dykke ned i lige nu.',
    en: "Satisfying! I've always loved statistics and systems, and AI is something I'm spending a lot of time diving into right now.",
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
    type: 'quote-emphasis',
    da: 'Mit mål er, at folk ikke bare ser indholdet - men **forstår** det, **stoler** på det og **handler** på det.',
    en: "My goal is that people don't just see the content - but **understand** it, **trust** it and **act** on it.",
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

export function renderEmphasised(text, color = 'var(--color-burgundy)') {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="not-italic" style={{ color }}>
        {part}
      </em>
    ) : (
      part
    )
  )
}
