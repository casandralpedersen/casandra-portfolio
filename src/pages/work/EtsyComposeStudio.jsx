import { useLanguage } from '../../context/LanguageContext'
import { projects } from '../../data/projects'
import {
  BackLink,
  DetailHero,
  DragLogo,
  TextBlock,
  MetaList,
  Feature,
  Marquee,
  ImageDuo,
  TiltPair,
  PullQuote,
  NextProject,
} from '../../components/work/blocks'

const IMG = '/images/projects'

export default function EtsyComposeStudio({ project }) {
  const { t } = useLanguage()
  const accent = project.accent
  const next = projects.find((p) => p.slug === 'brodrene-vejen')

  return (
    <main className="min-h-screen">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-20">
        <BackLink />
      </div>

      <div className="relative">
        <DetailHero project={project} showCover={false} />
        <DragLogo
          src={`${IMG}/compoze-logo.png`}
          className="absolute right-[4%] md:right-[12%] top-4 md:top-24 z-30 w-[120px] md:w-[190px]"
          rotate={6}
        />
      </div>

      <MetaList
        accent={accent}
        items={[
          { label: t('Rolle', 'Role'), value: t('Grundlægger & designer', 'Founder & designer') },
          {
            label: t('Leverancer', 'Deliverables'),
            value: t(
              'Brandidentitet\nPlakatdesign\nBilledbearbejdning\nSEO & tekst\nEtsy-drift',
              'Brand identity\nPoster design\nImage editing\nSEO & copy\nEtsy operations',
            ),
          },
          { label: t('År', 'Year'), value: project.year },
          { label: t('Værktøjer', 'Tools'), value: 'Etsy · Photoshop · Illustrator' },
        ]}
      />

      <TextBlock
        number="01"
        label={t('Overblik', 'Overview')}
        title={t('En digital plakatbutik bygget fra bunden', 'A digital poster shop built from scratch')}
        accent={accent}
        width="wide"
      >
        <p>
          {t(
            'CompozeStudio er et brand og en Etsy-butik jeg byggede og drev fra ende til anden. Butikken sælger printbare plakater som digitale downloads - fra minimalistiske album-plakater til botaniske prints - og jeg stod for det hele: brandidentitet, produktdesign, billedbearbejdning, tekst, SEO og den daglige drift.',
            'CompozeStudio is a brand and an Etsy shop I built and ran end to end. It sells printable posters as digital downloads - from minimalist album posters to botanical prints - and I handled all of it: brand identity, product design, image work, copy, SEO and the day-to-day running.',
          )}
        </p>
      </TextBlock>

      <Feature
        accent={accent}
        number="02"
        label={t('Start', 'The start')}
        title={t('Det begyndte generisk', 'It started generic')}
        image={{ src: `${IMG}/poster-fruit.jpg`, alt: 'Frugt-plakat' }}
      >
        <p className="mb-4">
          {t(
            'Jeg startede med at generere frugt-plakaten og en række andre generiske motiver. Det fungerede ikke - markedet var fyldt med præcis den slags, og plakaterne forsvandt i mængden.',
            'I started by generating the fruit poster and a range of other generic motifs. It didn’t work - the market was full of exactly that, and the posters disappeared into the crowd.',
          )}
        </p>
        <p>
          {t(
            'Så jeg gik mere nichet til værks og opdagede at fandoms havde langt mindre konkurrence, men stadig en stor og engageret målgruppe. Det var første gang jeg for alvor dykkede ned i SEO og lod søgningen styre hvad jeg lavede.',
            'So I went more niche and discovered that fandoms had far less competition but still a large, engaged audience. It was the first time I really dug into SEO and let search guide what I made.',
          )}
        </p>
      </Feature>

      <TextBlock
        number="03"
        label={t('Produktet', 'The product')}
        title={t('Album-plakater med ét gennemgående system', 'Album posters with one consistent system')}
        accent={accent}
        width="wide"
      >
        <p>
          {t(
            'Hele kataloget følger det samme designsprog: albumcover, tracklist, en farvepalette trukket ud af coveret, kunstnerens signatur og udgivelsesdato. Systemet gør at hver ny plakat tager kort tid at lave, men stadig står knivskarpt og genkendeligt ved siden af de andre.',
            'The whole catalogue follows the same design language: album cover, tracklist, a colour palette pulled from the artwork, the artist’s signature and release date. The system means each new poster is quick to make, yet still looks sharp and recognisable next to the others.',
          )}
        </p>
      </TextBlock>

      <Marquee
        accent={accent}
        items={[
          { src: `${IMG}/poster-arctic-monkeys.png`, alt: 'Arctic Monkeys plakat' },
          { src: `${IMG}/poster-oasis.png`, alt: 'Oasis plakat' },
          { src: `${IMG}/poster-bad-bunny.png`, alt: 'Bad Bunny plakat' },
          { src: `${IMG}/poster-frank-ocean.png`, alt: 'Frank Ocean plakat' },
          { src: `${IMG}/poster-drake.png`, alt: 'Drake plakat' },
        ]}
      />

      <TextBlock
        number="04"
        label={t('Variation', 'Range')}
        title={t('Special Edition: samme univers, nyt format', 'Special Edition: same universe, new format')}
        accent={accent}
        width="wide"
      >
        <p>
          {t(
            'For at udvide butikken lavede jeg en avis-inspireret serie, hvor sangtekster sættes op som en gammel forside. Det viste at brandet kunne strække sig til nye formater uden at miste sin identitet.',
            'To widen the shop I made a newspaper-inspired series where lyrics are laid out like an old front page. It showed the brand could stretch into new formats without losing its identity.',
          )}
        </p>
      </TextBlock>

      <TiltPair
        accent={accent}
        items={[
          { src: `${IMG}/special-white-ferrari.png`, alt: 'White Ferrari special edition' },
          { src: `${IMG}/special-we-all-try.png`, alt: 'We All Try special edition' },
        ]}
      />

      <TextBlock
        number="05"
        label={t('Konvertering', 'Conversion')}
        title={t('Fra produkt til salg', 'From product to sale')}
        accent={accent}
        width="wide"
      >
        <p>
          {t(
            'Et godt produkt er ikke nok - det skal kunne findes, forstås og købes på under et minut. Jeg behandlede hvert listing som en lille landingsside med tydelige "what you get"- og "how to download"-grafikker, så køberen aldrig var i tvivl, og så jeg slap for spørgsmål efter salget.',
            'A good product isn’t enough - it has to be found, understood and bought in under a minute. I treated every listing as a small landing page with clear “what you get” and “how to download” graphics, so buyers were never in doubt and I avoided post-sale questions.',
          )}
        </p>
      </TextBlock>

      <ImageDuo
        accent={accent}
        ratio="1 / 1"
        maxW={820}
        frameColor="#913C27"
        left={{ src: `${IMG}/listing-what-you-get.jpg`, alt: 'What you get' }}
        right={{ src: `${IMG}/listing-how-to-download.jpg`, alt: 'How to download' }}
      />

      <PullQuote accent={accent}>
        {t(
          '«Et system slår en god idé. Det er det der gør en butik til en forretning.»',
          '“A system beats a good idea. That’s what turns a shop into a business.”',
        )}
      </PullQuote>

      <TextBlock number="06" label={t('Resultat', 'Outcome')} accent={accent} width="wide">
        <p className="mb-4">
          {t(
            'Over perioden marts 2025 til april 2026 fik butikken 1.235 besøg og 42 salg - en konverteringsrate på 3,4 %.',
            'Over the period March 2025 to April 2026 the shop drew 1,235 visits and 42 sales - a 3.4% conversion rate.',
          )}
        </p>
        <p>
          {t(
            'Det er stærkt for et rent digitalt produkt, hvor 1-2 % typisk er normalen. På Etsy regnes 1-3 % for gennemsnitligt, 3-5 % for stærkt og over 5 % for exceptionelt - så CompozeStudio lå i det stærke felt og solgte mens jeg sov.',
            'That’s strong for a purely digital product, where 1-2% is usually the norm. On Etsy, 1-3% is considered average, 3-5% strong and above 5% exceptional - so CompozeStudio landed in the strong band and sold while I slept.',
          )}
        </p>
      </TextBlock>

      <MetaList
        accent={accent}
        items={[
          { label: t('Besøg', 'Visits'), value: t('1.235', '1,235') },
          { label: t('Ordrer', 'Orders'), value: '42' },
          { label: t('Konverteringsrate', 'Conversion rate'), value: t('3,4 %', '3.4%') },
          { label: t('Omsætning', 'Revenue'), value: t('1.466,00 kr.', '1,466.00 kr.') },
        ]}
      />

      <NextProject project={next} />
    </main>
  )
}
