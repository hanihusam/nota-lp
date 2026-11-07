import {AnnouncementPill} from '~/components/ui/announcement-pill'
import {ButtonLink} from '~/components/ui/button'
import {APP_URL} from '~/lib/site'

import {HeroStage} from './hero-stage'

const delay = (ms: number) => ({'--enter-delay': `${ms}ms`}) as React.CSSProperties

/**
 * Figma: Landing → Hero. Centered copy over the product. Copy enters on
 * page load with CSS only (no JS), most important first: pill, headline
 * lines, subline, actions; the product frame follows on the slower curve.
 */
export const Hero = () => (
  <section id="top" aria-labelledby="hero-title" className="relative pt-28 lg:pt-36">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[1152px] -translate-x-1/2 xl:block"
    >
      <span className="absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-white/8 to-transparent" />
      <span className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-white/8 to-transparent" />
    </div>

    <div className="container-page relative flex flex-col items-center gap-5 text-center lg:gap-6">
      <AnnouncementPill
        href="#how-it-works"
        tag="New"
        label="E-signatures, built in"
        className="enter"
        style={delay(0)}
      />
      <h1 id="hero-title" className="text-display-1">
        <span
          className="enter block text-gradient [--gradient-to:rgb(255_255_255/0.8)]"
          style={delay(80)}
        >
          Send proposals.
        </span>
        <span
          className="enter block text-gradient [--gradient-from:rgb(255_255_255/0.8)]"
          style={delay(160)}
        >
          Get them signed.
        </span>
      </h1>
      <p className="enter max-w-140 text-body text-pretty text-text-secondary" style={delay(240)}>
        Write a polished proposal in minutes, send it as a link, and let your client sign it right
        in the browser.
      </p>
      <div
        className="enter flex w-full flex-col items-stretch gap-3 pt-2 sm:w-auto sm:flex-row sm:items-center"
        style={delay(320)}
      >
        <ButtonLink href={APP_URL} size="lg">
          Start free
        </ButtonLink>
        <ButtonLink href="#how-it-works" variant="secondary" size="lg" arrow>
          See how it works
        </ButtonLink>
      </div>
      <p className="enter text-caption text-text-tertiary" style={delay(360)}>
        Free forever <span aria-hidden>·</span> No account needed
      </p>
    </div>

    <div className="container-page relative mt-14 lg:mt-18">
      <HeroStage />
    </div>
  </section>
)

Hero.displayName = 'Hero'
