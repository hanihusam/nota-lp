import {APP_URL} from '~/lib/site'

import {ButtonLink} from './ui/button'

/**
 * Figma: Landing → Final CTA. The v2 statement line, now the closing
 * headline, over a sage horizon and glow. Phones keep the one action.
 */
export const FinalCta = () => (
  <section
    id="get-started"
    aria-labelledby="cta-title"
    className="relative isolate overflow-hidden pt-24 pb-36 lg:pt-40 lg:pb-52"
  >
    <div
      aria-hidden
      className="absolute bottom-0 left-1/2 -z-10 h-80 w-[min(900px,120%)] -translate-x-1/2 translate-y-1/2 rounded-full bg-glow-accent blur-[100px]"
    />
    <div
      aria-hidden
      className="absolute bottom-24 left-1/2 -z-10 h-px w-[min(1152px,100%)] -translate-x-1/2 bg-linear-to-r from-transparent via-sage-400/60 to-transparent lg:bottom-36"
    />
    <div className="container-page flex flex-col items-center gap-8 text-center">
      <h2
        id="cta-title"
        data-reveal
        className="text-display-2 text-balance"
      >
        <span className="block text-gradient [--gradient-to:rgb(255_255_255/0.8)]">
          Less proposal admin.
        </span>
        <span className="block text-gradient [--gradient-from:rgb(255_255_255/0.8)]">
          More billable work.
        </span>
      </h2>
      <div
        data-reveal
        style={{'--reveal-index': 1} as React.CSSProperties}
        className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row"
      >
        <ButtonLink href={APP_URL} size="lg">
          Start free
        </ButtonLink>
        <ButtonLink href="#faq" variant="secondary" size="lg" className="hidden sm:inline-flex">
          Read the FAQ
        </ButtonLink>
      </div>
      <p
        data-reveal
        style={{'--reveal-index': 2} as React.CSSProperties}
        className="text-caption text-text-tertiary"
      >
        Free forever <span aria-hidden>·</span> No account needed
      </p>
    </div>
  </section>
)

FinalCta.displayName = 'FinalCta'
