import type {Route} from './+types/home'

import {Audience} from '~/components/audience'
import {Bento} from '~/components/bento/bento'
import {Faq} from '~/components/faq'
import {FinalCta} from '~/components/final-cta'
import {Footer} from '~/components/footer'
import {Hero} from '~/components/hero/hero'
import {HowItWorks} from '~/components/how-it-works/how-it-works'
import {RevealObserver} from '~/components/motion/reveal-observer'
import {Navbar} from '~/components/navbar'
import {Pricing} from '~/components/pricing'
import {SITE} from '~/lib/site'

export function meta(_: Route.MetaArgs) {
  return [
    {title: SITE.title},
    {name: 'description', content: SITE.description},
    {name: 'robots', content: 'index, follow'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: SITE.url},
    {property: 'og:title', content: SITE.title},
    {property: 'og:description', content: SITE.description},
    {property: 'og:image', content: `${SITE.url}/og-image.png`},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},
    {property: 'og:image:alt', content: SITE.ogImageAlt},
    {property: 'og:site_name', content: 'Nota'},
    {property: 'og:locale', content: 'en_US'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: SITE.title},
    {name: 'twitter:description', content: SITE.description},
    {name: 'twitter:image', content: `${SITE.url}/og-image.png`},
    {name: 'twitter:image:alt', content: SITE.ogImageAlt},
  ]
}

/** Section order mirrors the Figma frame "Landing / Desktop · 1512" (page 03 — Landing page). */
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <Audience />
        <HowItWorks />
        <Bento />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <RevealObserver />
    </>
  )
}
