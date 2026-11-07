import {AppWindow} from '~/components/product/app-window'
import {Icon} from '~/components/ui/icon'
import {SIGNATURE_MS, Signature} from '~/components/product/parts'
import {useElementSize} from '~/lib/use-element-size'
import {Stage, States, type Act} from '~/lib/stageshow'

import './hero-stage.css'

// Story (play once, about 7s): the cursor presses Send and the proposal goes
// out. Sarah opens it, then signs: her signature draws on in the card, and
// only once the ink is down do the status pills turn to Signed and the audit
// line confirm it. The poster is that last frame, so reduced motion and
// screenshots show the result, not a beat in the middle.
type Scene = {sent: boolean; opened: boolean; drawn: boolean; signed: boolean}

const initial: Scene = {sent: false, opened: false, drawn: false, signed: false}
const poster: Scene = {sent: true, opened: true, drawn: true, signed: true}

async function script(a: Act<Scene>) {
  await a.wait(1400)
  if (a.layout === 'wide') {
    await a.move('send')
    await a.click()
  }
  await a.set({sent: true})
  // Off the label it just pressed, onto the empty margin below it
  if (a.layout === 'wide') await a.move({x: 1110, y: 110}, {duration: 700})
  await a.wait(a.layout === 'wide' ? 300 : 1000)
  await a.set({opened: true})
  await a.wait(1100)
  await a.set({drawn: true})
  await a.wait(SIGNATURE_MS + 250)
  await a.set({signed: true})
}

const SignedCard = ({s}: {s: Scene}) => (
  <div className="hero-signed" data-show={s.opened || undefined}>
    <div className="hero-signed__head">
      <span className="pui-avatar size-8">SM</span>
      <span className="min-w-0">
        <States
          value={s.signed ? 'signed' : 'opened'}
          align="start"
          states={{
            opened: <span className="pui-notice__title">Sarah opened your proposal</span>,
            signed: <span className="pui-notice__title">Sarah Mitchell signed</span>,
          }}
        />
        <span className="pui-notice__meta">Website Redesign · Just now</span>
      </span>
    </div>
    <div className="pui-pad">
      <Signature drawn={s.drawn} width={196} />
    </div>
    <States
      value={s.signed ? 'saved' : 'waiting'}
      align="start"
      className="hero-signed__audit"
      states={{
        waiting: <span className="text-text-tertiary">Waiting for her signature…</span>,
        saved: (
          <span className="inline-flex items-center gap-2 text-text-secondary">
            <Icon name="check" size={14} className="text-sage-400" />
            Signed PDF and audit trail saved
          </span>
        ),
      }}
    />
  </div>
)

/**
 * Figma: Landing → Hero → Hero Stage. The app window at 1:1, cropped by a
 * fade at its foot, with the Signed card straddling its right edge over the
 * editor's empty margin. Compact (phones) crops to the proposal card and
 * moves the card to the lower left, over filler. The compact design takes
 * the column's width (phones to small tablets), so the window always runs
 * off the right edge instead of sitting cut in the middle of a wide column.
 */
export const HeroStage = () => {
  const [ref, {width}] = useElementSize<HTMLElement>({width: 1296, height: 600})
  const compactWidth = Math.max(320, Math.min(width, 759))
  return (
    <figure ref={ref} className="hero-figure relative">
      <figcaption className="sr-only">
        Nota’s proposal editor. The proposal for Sarah Mitchell is sent; she opens it and signs it
        in her browser, and its status changes to Signed.
      </figcaption>
      <div aria-hidden className="hero-glow" />
      <div className="enter-stage" style={{'--enter-delay': '480ms'} as React.CSSProperties}>
        <div className="hero-tilt" inert>
          <Stage<Scene>
            width={1296}
            height={600}
            compact={{below: 760, width: compactWidth, height: 500}}
            theme="dark"
            play="once"
            initial={initial}
            poster={poster}
            script={script}
            cursor={{at: {wide: {x: 1080, y: 150}, compact: {x: 420, y: 560}}, style: 'arrow'}}
            className="nota-stage hero-stage"
          >
            {(s, _rect, layout) => (
              <>
                <div className="hero-window" data-layout={layout}>
                  <AppWindow sent={s.sent} status={s.signed ? 'signed' : s.sent ? 'sent' : 'draft'} />
                </div>
                <SignedCard s={s} />
              </>
            )}
          </Stage>
        </div>
      </div>
    </figure>
  )
}

HeroStage.displayName = 'HeroStage'
