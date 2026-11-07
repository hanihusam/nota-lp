import {Icon} from '~/components/ui/icon'
import {SectionHeading} from '~/components/ui/section-heading'

import {BentoTile} from './bento-tile'
import {ClientPicture} from './client-tile'
import {KeyboardPicture} from './keyboard-tile'
import {PdfPicture} from './pdf-tile'
import {TotalsPicture} from './totals-tile'

import './bento.css'

/**
 * Figma: Landing → Features (bento). Planned with Stageshow's bento
 * rules: one hero tile, then kinds that alternate so none sits next to its
 * own kind, and only three of the five move.
 *
 *   Totals    2×1  hero UI    a new row lands, the total rolls
 *   Client    1×1  component  "Ali" types, the details fill in
 *   PDF       1×1  object     a tilted stack of paper, still
 *   Offline   1×1  diagram    rings pulse once
 *   Keyboard  1×1  component  the command types, Enter presses
 */
export const Bento = () => (
  <section id="features" aria-labelledby="features-title" className="py-24 lg:py-32">
    <div className="container-page flex flex-col gap-12 lg:gap-16">
      <SectionHeading
        id="features-title"
        align="center"
        eyebrow="Features"
        title="Made for freelancers, not sales teams."
        description="Docs are flexible. CRMs are powerful. Nota keeps proposal work focused on what freelancers actually need."
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        <BentoTile
          index={0}
          lead="Totals that add themselves up."
          className="min-h-115 md:col-span-2 md:min-h-110"
          picture={<TotalsPicture />}
        >
          Rates, hours and tax calculate as you type.
        </BentoTile>

        <BentoTile index={1} lead="Clients fill themselves in." picture={<ClientPicture />}>
          Pick a client, and their details, rate and terms come with them.
        </BentoTile>

        <BentoTile index={2} lead="Branded PDF export." picture={<PdfPicture />}>
          Your logo and colors on a print-ready file, ready to attach anywhere.
        </BentoTile>

        <BentoTile
          index={3}
          lead="Works offline."
          picture={
            <div className="bento-rings" aria-hidden>
              <span className="bento-rings__ring" style={{'--size': '220px', '--i': 2} as React.CSSProperties} />
              <span className="bento-rings__ring" style={{'--size': '150px', '--i': 1} as React.CSSProperties} />
              <span className="bento-rings__ring" style={{'--size': '84px', '--i': 0} as React.CSSProperties} />
              <span className="bento-rings__core">
                <Icon name="signal-slash" size={20} />
              </span>
              <span className="bento-rings__status">
                <span className="size-1.5 rounded-full bg-sage-400" />
                Saved on this device
              </span>
            </div>
          }
        >
          Draft on a plane. It saves as you type.
        </BentoTile>

        <BentoTile
          index={4}
          lead="Keyboard-first."
          picture={<KeyboardPicture />}
        >
          New proposal, duplicate, export — every action is a shortcut away.
        </BentoTile>
      </div>
    </div>
  </section>
)

Bento.displayName = 'Bento'
