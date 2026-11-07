import {Icon} from '~/components/ui/icon'
import {Bar, Button} from '~/lib/stageshow'

import {Signature} from './parts'

export interface SignScene {
  /** The ink has been drawn. */
  drawn: boolean
  /** The typed name, one character at a time. */
  name: string
  agreed: boolean
  signed: boolean
}

export const SIGN_START: SignScene = {drawn: false, name: '', agreed: false, signed: false}
export const SIGN_END: SignScene = {drawn: true, name: 'Sarah Mitchell', agreed: true, signed: true}

/** The Accept and sign card on its own: the payoff of step 03, and its compact design. */
export const SignCard = ({s, compact}: {s: SignScene; compact?: boolean}) => (
  <div className="pui-sign">
    <span className="pui-sign__title">Accept and sign</span>
    {compact ? null : <span className="pui-sign__hint">Draw your signature, or type your name.</span>}
    <div className="pui-pad">
      <Signature drawn={s.drawn} width={compact ? 168 : 188} />
    </div>
    <div className="pui-sign__fields" style={compact ? {gridTemplateColumns: '1fr 120px'} : undefined}>
      <span>
        <span className="pui-field__label">Full name</span>
        <span className="pui-field__box">{s.name || ' '}</span>
      </span>
      <span>
        <span className="pui-field__label">Date</span>
        <span className="pui-field__box">Mar 12, 2026</span>
      </span>
    </div>
    <span className="pui-check">
      <span className="pui-check__box" data-on={s.agreed || undefined}>
        <Icon name="check" size={12} />
      </span>
      I agree to the scope, price and terms in this proposal
    </span>
    <Button
      variant="primary"
      className="pui-btn"
      data-target="sign"
      icon={s.signed ? <Icon name="check" size={14} /> : undefined}
    >
      {s.signed ? 'Signed' : 'Sign proposal'}
    </Button>
    <span className="pui-sign__audit">
      Your name, the time and your IP address are recorded with your signature.
    </span>
  </div>
)

SignCard.displayName = 'SignCard'

/**
 * Figma: How it works / Step panels → 03 Get it signed. What the client sees:
 * the shared link in a browser, the proposal's title and terms, and the
 * signing card. No account, no app.
 */
export const ClientPage = ({s}: {s: SignScene}) => (
  <div className="pui-browser">
    <div className="pui-browser__bar">
      <span className="pui-browser__lights">
        <span />
        <span />
        <span />
      </span>
      <span className="pui-browser__url">
        <Icon name="lock-closed" size={12} className="pui-icon" />
        nota.app/p/website-redesign
      </span>
    </div>
    <div className="pui-page">
      <span className="pui-caption">Proposal from Jordan Doe Studio</span>
      <span className="pui-serif pui-page__title">Website Redesign</span>
      <span className="pui-page__meta">
        Prepared for Sarah Mitchell · $8,569.00 incl. tax · Valid until Apr 8
      </span>
      <SignCard s={s} />
      <span className="pui-caption mt-6">Scope</span>
      <span className="mt-3 flex flex-col gap-3">
        <Bar w={420} h={7} tone={2} />
        <Bar w={360} h={7} tone={2} />
      </span>
    </div>
  </div>
)

ClientPage.displayName = 'ClientPage'
