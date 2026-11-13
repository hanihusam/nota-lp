import type {CSSProperties} from 'react'
import {Link} from 'react-router'

import {Icon} from '~/components/ui/icon'
import type {Proposal, Signer, TimelineEvent} from '~/lib/dashboard/data'
import {canRemind, extendExpiry, swapExpiry} from '~/lib/dashboard/format'
import type {IconName} from '~/lib/icons'

import {Money, Stop, expiryOf, isNudged} from './journey'
import {useDashboard, useEnters} from './state'

/**
 * Figma: 06 — Dashboard → Proposal detail / Desktop 1440, Phone 390
 *
 * One proposal: the page the client reads, and beside it what needs doing,
 * what happened (the journey drawn vertically), who signs, where they read
 * and how reminders work. Send a reminder and Extend expiry change the page
 * in place, the way the handoff's motion table describes.
 */
export const ProposalDetail = ({p, dataset}: {p: Proposal; dataset: string | null}) => {
  const {reminded, extended, remind, extend, toast} = useDashboard()
  const back = `/app/proposals${dataset ? `?data=${dataset}` : ''}`
  const wasReminded = reminded.has(p.id)
  const wasExtended = extended.has(p.id)
  const expires = expiryOf(p, extended)
  const nudged = isNudged(p, reminded, extended)

  const sendReminder = () => remind([p.id], `Reminder sent to ${p.contact}`)
  const extendByWeek = () =>
    p.expires && extend(p.id, `Expiry moved to ${extendExpiry(p.expires)}`)

  return (
    <main className="dash-main detail">
      <nav className="crumbs t-ui-regular" aria-label="Breadcrumb">
        <Link to={back}>
          <Icon name="chevron-down" size={12} className="crumbs__back" /> Proposals
        </Link>
        <span aria-hidden>/</span>
        <span aria-current="page">{p.number}</span>
      </nav>

      <header className="detail__head">
        <div className="detail__title">
          <h1 className="t-h1">{p.title}</h1>
          <p className="t-body detail__client">{p.client}</p>
        </div>
        <div className="detail__side">
          <Money amount={p.amount} currency={p.currency} className="detail__value" />
          <div className="detail__actions">
            <button
              type="button"
              className="btn btn--secondary t-ui"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href).catch(() => undefined)
                toast('Link copied')
              }}
            >
              <Icon name="link" size={14} /> Copy link
            </button>
            <button type="button" className="btn btn--secondary t-ui" onClick={() => toast('PDF export is not part of this prototype.')}>
              <Icon name="arrow-down-tray" size={14} /> Download PDF
            </button>
          </div>
        </div>
      </header>

      <div className="detail__body">
        <section className="preview" aria-label="Document">
          <div className="preview__bar">
            <span className="t-ui">Document</span>
            <span className="t-caption">12 pages, version 2</span>
            <span className="t-caption preview__page">Page 4 of 12, the most-read page</span>
          </div>
          <div className="desk">
            <Paper p={p} />
          </div>
          <button type="button" className="doc-card" onClick={() => toast('The full document viewer is not part of this prototype.')}>
            <span className="doc-card__thumb" aria-hidden>
              <span />
              <span />
              <span />
            </span>
            <span className="doc-card__text">
              <span className="t-ui">Document</span>
              <span className="t-caption">12 pages, version 2</span>
            </span>
            <Icon name="chevron-down" size={14} className="doc-card__chevron" />
          </button>
        </section>

        <aside className="rail" aria-label="Status and activity">
          <Callout
            p={p}
            nudged={nudged}
            reminded={wasReminded}
            extended={wasExtended}
            expires={expires}
            onRemind={sendReminder}
            onExtend={p.expires && !wasExtended ? extendByWeek : undefined}
          />
          <RailSection title="Activity" note={p.stage === 'draft' ? 'No events yet' : undefined}>
            <ol className="timeline">
              {eventsOf(p, {reminded: wasReminded, extended: wasExtended, settled: !nudged && Boolean(p.nudge), expires}).map((ev, i, list) => (
                <TimelineItem key={i} ev={ev} first={i === 0} last={i === list.length - 1} attention={nudged} partial={p.signing ? p.signing.signed / p.signing.total : undefined} />
              ))}
            </ol>
          </RailSection>
          <RailSection title="Signers" note={signedNote(p)}>
            <ul className="signers">
              {signersOf(p).map((s) => (
                <li key={s.name} className="signer">
                  <span className="avatar avatar--md t-caption" aria-hidden>
                    {s.initials}
                  </span>
                  <span className="signer__text">
                    <span className="t-ui signer__name">{s.name}</span>
                    <span className="t-caption signer__role">{s.role}</span>
                  </span>
                  <span className="chip t-badge" data-tone={s.signed ? 'accent' : 'neutral'}>
                    <Icon name={s.signed ? 'check-circle' : 'clock'} size={12} />
                    {s.signed ?? 'Not signed yet'}
                  </span>
                </li>
              ))}
            </ul>
          </RailSection>
          <RailSection title="Where they read" note={p.reading ? `${duration(p.reading.reduce((a, r) => a + r.minutes, 0))} in total` : undefined}>
            {p.reading ? (
              <ul className="reading">
                {p.reading.map((r) => (
                  <li key={r.section} className="reading__row">
                    <span className="t-ui-regular reading__label" title={r.section}>
                      {r.section}
                    </span>
                    <span className="reading__measure">
                      <span className="reading__track">
                        <span
                          className="reading__bar"
                          style={{'--share': r.minutes / Math.max(...p.reading!.map((x) => x.minutes))} as CSSProperties}
                        />
                      </span>
                      <span className="t-caption">{duration(r.minutes)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="t-caption rail__empty">
                {p.stage === 'draft' || p.stage === 'sent' || p.stage === 'bounced'
                  ? `Reading time shows up after ${p.contact} opens it.`
                  : 'No reading time recorded.'}
              </p>
            )}
          </RailSection>
          <RailSection title="Reminders">
            <div className="reminders">
              <span className="reminders__text">
                <span className="t-ui-regular">{remindersLine(p)[0]}</span>
                <span className="t-caption">{wasReminded ? 'Next one in 3 days' : remindersLine(p)[1]}</span>
              </span>
              <button type="button" className="btn btn--ghost t-ui" onClick={() => toast('Reminder settings are not part of this prototype.')}>
                Change
              </button>
            </div>
          </RailSection>
        </aside>
      </div>
    </main>
  )
}

ProposalDetail.displayName = 'ProposalDetail'

const RailSection = ({title, note, children}: {title: string; note?: string; children: React.ReactNode}) => (
  <section className="rail__section">
    <div className="rail__heading">
      <h2 className="t-ui">{title}</h2>
      {note ? <span className="t-caption">{note}</span> : null}
    </div>
    {children}
  </section>
)

RailSection.displayName = 'RailSection'

interface CalloutProps {
  p: Proposal
  nudged: boolean
  reminded: boolean
  extended: boolean
  expires?: string
  onRemind: () => void
  onExtend?: () => void
}

const Callout = ({p, nudged, reminded, extended, expires, onRemind, onExtend}: CalloutProps) => {
  const {toast} = useDashboard()
  const view = calloutOf(p, {nudged, reminded, extended, expires})
  return (
    <div className="callout" data-tone={view.tone} aria-live="polite">
      <CalloutHead key={view.title} icon={view.icon} title={view.title} />
      <p className="t-body callout__body">{view.body}</p>
      <div className="callout__actions">
        {view.primary === 'remind' ? (
          <button type="button" className="btn btn--primary t-ui" onClick={onRemind}>
            <Icon name="paper-airplane" size={14} /> {p.stage === 'signing' ? 'Remind the others' : 'Send a reminder'}
          </button>
        ) : view.primary ? (
          <button type="button" className="btn btn--primary t-ui" onClick={() => toast(`${view.primary} is not part of this prototype.`)}>
            {view.primary}
          </button>
        ) : null}
        {onExtend && canRemind(p) ? (
          <button type="button" className="btn btn--ghost t-ui" onClick={onExtend}>
            Extend expiry
          </button>
        ) : null}
      </div>
    </div>
  )
}

Callout.displayName = 'Callout'

const CalloutHead = ({icon, title}: {icon: IconName; title: string}) => {
  const enters = useEnters()
  return (
    <p className="callout__head t-ui" data-enter={enters || undefined}>
      <Icon name={icon} size={14} /> {title}
    </p>
  )
}

CalloutHead.displayName = 'CalloutHead'

function calloutOf(
  p: Proposal,
  {nudged, reminded, extended, expires}: {nudged: boolean; reminded: boolean; extended: boolean; expires?: string},
): {tone: 'neutral' | 'attention' | 'accent' | 'danger'; icon: IconName; title: string; body: string; primary?: string} {
  if (p.stage === 'draft')
    return {tone: 'neutral', icon: 'pencil', title: 'Not sent yet', body: `Send it to ${p.contact} to start tracking when it's opened, read and signed.`, primary: 'Send proposal'}
  if (p.stage === 'bounced')
    return {tone: 'danger', icon: 'exclamation-triangle', title: 'Email bounced', body: p.nudge?.why ?? '', primary: 'Fix email address'}
  if (p.stage === 'signed')
    return {tone: 'accent', icon: 'check-circle', title: p.stops[2].label, body: 'Both sides have the signed copy and its audit trail.', primary: 'Download signed PDF'}
  if (p.stage === 'expired')
    return {tone: 'danger', icon: 'x-mark', title: p.stops[2].label, body: "It wasn't signed in time. Send a fresh copy to restart the clock.", primary: 'Send again'}
  if (reminded)
    return {tone: 'neutral', icon: 'check-circle', title: 'Reminder sent just now', body: `${p.contact} gets it by email. It won't be flagged again for 3 days.${expires ? ` Expires ${expires}.` : ''}`}
  if (p.stage === 'signing')
    return {tone: 'accent', icon: 'pencil', title: p.stops[2].label, body: p.stops[2].detail ?? '', primary: 'remind'}
  if (extended && p.nudge?.kind === 'expiring')
    return {tone: 'neutral', icon: 'clock', title: `Expiry moved to ${expires}`, body: `${p.contact} sees the new date on the proposal.`, primary: 'remind'}
  if (nudged && p.nudge)
    return {tone: 'attention', icon: p.nudge.kind === 'expiring' ? 'clock' : 'exclamation-triangle', title: p.nudge.label, body: swapExpiry(p.nudge.why, expires), primary: 'remind'}
  return {
    tone: 'neutral',
    icon: 'clock',
    title: p.stage === 'sent' ? 'Not opened yet' : 'Waiting for a signature',
    body: `Expires ${expires}. Nota sends a reminder every 3 days until it's signed.`,
    primary: 'remind',
  }
}

const STOP_ICON = (title: string): IconName =>
  /^Sent|^Bounced/.test(title) ? 'paper-airplane' : /^Opened|^Not opened|opened/.test(title) ? 'eye' : /^Signed/.test(title) ? 'check-circle' : /^Expired/.test(title) ? 'x-mark' : 'pencil'

const TimelineItem = ({ev, first, last, attention, partial}: {ev: TimelineEvent; first: boolean; last: boolean; attention: boolean; partial?: number}) => {
  const stopState = ev.kind === 'done' ? 'done' : ev.kind === 'current' ? 'current' : ev.kind === 'failed' ? 'failed' : ev.kind === 'partial' ? 'partial' : 'pending'
  return (
    <li className="tl" data-kind={ev.kind} data-attention={(ev.kind === 'waiting' && attention) || undefined}>
      <span className="tl__rail" aria-hidden>
        <span className="tl__line tl__line--above" data-hidden={first || undefined} />
        {ev.kind === 'event' ? (
          <span className="tl__dot" />
        ) : ev.kind === 'waiting' ? (
          <span className="wait__marker tl__marker" data-attention={attention || undefined}>
            <Icon name="clock" size={12} />
          </span>
        ) : (
          <Stop spec={{state: stopState, icon: STOP_ICON(ev.title)}} partial={partial} />
        )}
        <span className="tl__line tl__line--below" data-hidden={last || undefined} />
      </span>
      <span className="tl__text">
        <span className={ev.kind === 'event' || ev.kind === 'pending' ? 't-ui-regular' : 't-ui'}>{ev.title}</span>
        <span className="t-caption tl__meta">{ev.meta}</span>
      </span>
    </li>
  )
}

TimelineItem.displayName = 'TimelineItem'

function eventsOf(p: Proposal, s: {reminded: boolean; extended: boolean; settled: boolean; expires?: string}): TimelineEvent[] {
  const date = (label: string, word: string) => label.replace(`${word} `, '')
  const extra: TimelineEvent[] = []
  if (s.reminded) extra.push({kind: 'event', title: 'Reminder sent by you', meta: `Just now, to ${p.contact}`})
  if (s.extended && p.expires) extra.push({kind: 'event', title: 'Expiry extended by you', meta: `Just now, from ${p.expires} to ${s.expires}`})
  const tail = (events: TimelineEvent[]) => {
    const at = events.findIndex((e) => e.kind === 'waiting' || e.kind === 'pending' || e.kind === 'partial')
    const list = at === -1 ? [...events, ...extra] : [...events.slice(0, at), ...extra, ...events.slice(at)]
    return list.map((e) =>
      e.kind === 'waiting' && s.settled
        ? {...e, title: 'Waiting for a signature', meta: swapExpiry(e.meta, s.expires)}
        : e.kind === 'waiting' || e.kind === 'pending'
          ? {...e, meta: swapExpiry(e.meta, s.expires)}
          : e,
    )
  }
  if (p.events) return tail(p.events)
  const [sent, opened, signed] = p.stops
  switch (p.stage) {
    case 'draft':
      return [
        {kind: 'pending', title: 'Not sent yet', meta: `Draft, ${(sent.detail ?? '').toLowerCase()}`},
        {kind: 'pending', title: 'Opened', meta: "You'll see who opened it and for how long"},
        {kind: 'pending', title: 'Signature', meta: `${p.contact} signs here`},
      ]
    case 'bounced':
      return tail([
        {kind: 'failed', title: sent.label, meta: sent.detail ?? ''},
        {kind: 'pending', title: 'Opened', meta: 'Not delivered'},
        {kind: 'pending', title: 'Signature', meta: `Expires ${p.expires}`},
      ])
    case 'sent':
      return tail([
        {kind: p.nudge ? 'done' : 'current', title: 'Sent', meta: `${date(sent.label, 'Sent')} by Jordan Doe`},
        p.nudge ? {kind: 'waiting', title: p.nudge.label, meta: `Expires ${p.expires}`} : {kind: 'event', title: 'Delivered', meta: 'Not opened yet'},
        {kind: 'pending', title: 'Opened', meta: `Waiting on ${p.contact}`},
        {kind: 'pending', title: 'Signature', meta: `Expires ${p.expires}`},
      ])
    case 'opened':
      return tail([
        {kind: 'done', title: 'Sent', meta: `${date(sent.label, 'Sent')} by Jordan Doe`},
        {kind: p.nudge ? 'done' : 'current', title: `Opened by ${p.contact}`, meta: opened.detail ?? opened.label},
        ...(p.nudge ? [{kind: 'waiting' as const, title: p.nudge.label, meta: `Expires ${p.expires}`}] : []),
        {kind: 'pending', title: 'Signature', meta: `Waiting on ${p.contact}`},
      ])
    case 'signing':
      return tail([
        {kind: 'done', title: 'Sent', meta: `${date(sent.label, 'Sent')} by Jordan Doe`},
        {kind: 'done', title: opened.label, meta: `${p.viewers ?? 1} viewers`},
        {kind: 'partial', title: signed.label, meta: signed.detail ?? ''},
      ])
    case 'signed':
      return [
        {kind: 'done', title: 'Sent', meta: `${date(sent.label, 'Sent')} by Jordan Doe`},
        {kind: 'done', title: opened.label, meta: `By ${p.contact}`},
        {kind: 'done', title: signed.label, meta: `${signed.detail ?? ''}. A signed copy went to both sides.`},
      ]
    case 'expired':
      return [
        {kind: 'done', title: 'Sent', meta: `${date(sent.label, 'Sent')} by Jordan Doe`},
        {kind: p.opens ? 'done' : 'pending', title: opened.label, meta: p.opens ? `By ${p.contact}` : 'Never opened'},
        {kind: 'failed', title: signed.label, meta: 'Not signed in time'},
      ]
  }
}

function signersOf(p: Proposal): Signer[] {
  if (p.signers) return p.signers
  const initials = p.contact
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const contact: Signer = {name: p.contact, role: p.contactRole, initials}
  if (p.stage === 'draft') return [contact]
  const sentOn = p.stops[0].label.replace(/^(Sent|Bounced) /, '')
  return [contact, {name: 'Jordan Doe', role: 'You, Jordan Doe Studio', initials: 'JD', signed: `Signed ${sentOn}`}]
}

const signedNote = (p: Proposal) => {
  const list = signersOf(p)
  return `${list.filter((s) => s.signed).length} of ${list.length} signed`
}

function remindersLine(p: Proposal): [string, string] {
  if (p.reminders) return p.reminders
  if (p.stage === 'draft') return ["Off until it's sent", 'Then every 3 days until signed']
  if (p.stage === 'signed' || p.stage === 'expired') return ['Off', 'Reminders stop once a proposal is signed or expires']
  if (p.stage === 'bounced') return ['Paused', "They start again once the email is delivered"]
  return ['Automatic, every 3 days until signed', 'Next one Mar 11 at 9:00 AM']
}

const duration = (minutes: number) =>
  minutes >= 60 ? `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, '0')} min` : `${minutes} min`

/** "Mar 13" → "Mar 20"; "tomorrow" → "in 8 days". */
const Paper = ({p}: {p: Proposal}) => {
  const total = p.items.reduce((a, i) => a + i.amount, 0)
  const signedByClient = p.stage === 'signed'
  return (
    <article className="paper" aria-label={`Page 4 of ${p.title}`}>
      <header className="paper__head t-caption">
        <span>Jordan Doe Studio</span>
        <span>Proposal {p.number}, page 4</span>
      </header>
      <h2 className="t-h2">4. Investment</h2>
      <p className="t-body">{p.intro ?? 'Billed in parts, each one when it is delivered.'}</p>
      <table className="paper__table">
        <tbody>
          {p.items.map((item) => (
            <tr key={item.label}>
              <td className="t-body">{item.label}</td>
              <td className="t-body">
                <Money amount={item.amount} currency={p.currency} />
              </td>
            </tr>
          ))}
          <tr className="paper__total">
            <td className="t-body-strong">Total</td>
            <td>
              <Money amount={total} currency={p.currency} className="t-amount" />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="paper__bones" aria-hidden>
        <span style={{width: '100%'}} />
        <span style={{width: '96%'}} />
        <span style={{width: '100%'}} />
        <span style={{width: '62%'}} />
      </div>
      <footer className="paper__signatures">
        <div>
          <span className="t-caption paper__muted">For Jordan Doe Studio</span>
          <span className="paper__line">{p.stage === 'draft' ? null : <span className="paper__typed">Jordan Doe</span>}</span>
          <span className="t-caption">{p.stage === 'draft' ? "Jordan Doe signs when it's sent" : 'Jordan Doe'}</span>
        </div>
        <div>
          <span className="t-caption paper__muted">For {p.client}</span>
          <span className="paper__line">{signedByClient ? <span className="paper__typed">{p.contact}</span> : null}</span>
          <span className="t-caption paper__muted">{signedByClient ? p.contact : `${p.contact}, waiting for signature`}</span>
        </div>
      </footer>
    </article>
  )
}

Paper.displayName = 'Paper'
