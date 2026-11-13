import {useEffect, useId, useRef, useState, type CSSProperties} from 'react'

import {Icon} from '~/components/ui/icon'
import {cn} from '~/lib/cn'
import type {Proposal} from '~/lib/dashboard/data'
import {canRemind, extendExpiry, moneyParts, swapExpiry, waitedAfterExtend} from '~/lib/dashboard/format'
import type {IconName} from '~/lib/icons'

import {useDashboard} from './state'

/**
 * Figma: 02 — Components → App / Stop, App / Journey, App / Progress,
 * App / Wait marker, App / Nudge tooltip, App / Chip
 *
 * The Sent → Opened → Signed line. Detailed rows label every stop and put a
 * wait marker on the stretch the proposal is waiting in; its position is the
 * exact share of time to expiry that has passed (Figma rounds to 20%).
 */

type StopState = 'done' | 'current' | 'pending' | 'attention' | 'failed' | 'partial'
type SegKind = 'done' | 'faint' | 'dashed' | 'dashed-danger' | 'wait'

interface StopSpec {
  state: StopState
  icon: IconName
}

interface LineSpec {
  stops: [StopSpec, StopSpec, StopSpec]
  segs: [SegKind, SegKind]
  current: 0 | 1 | 2
  danger: boolean
}

const ICON: [IconName, IconName, IconName] = ['paper-airplane', 'eye', 'pencil']

type Ids = ReadonlySet<string>

/** A reminder settles a nudge; so does another week on one about to expire. */
export const isSettled = (p: Proposal, reminded: Ids, extended: Ids) =>
  reminded.has(p.id) || (p.nudge?.kind === 'expiring' && extended.has(p.id))

export const isNudged = (p: Proposal, reminded: Ids, extended: Ids) =>
  Boolean(p.nudge) && p.nudge?.kind !== 'bounced' && !isSettled(p, reminded, extended)

export const expiryOf = (p: Proposal, extended: Ids) =>
  p.expires && extended.has(p.id) ? extendExpiry(p.expires) : p.expires

const waitedOf = (p: Proposal, extended: Ids) =>
  p.expires && extended.has(p.id) ? waitedAfterExtend(p.waited ?? 0, p.expires) : (p.waited ?? 0)

export function lineOf(p: Proposal, nudged: boolean): LineSpec {
  const s = (state: StopState, i: 0 | 1 | 2, icon: IconName = ICON[i]): StopSpec => ({state, icon})
  switch (p.stage) {
    case 'draft':
      return {stops: [s('pending', 0), s('pending', 1), s('pending', 2)], segs: ['dashed', 'dashed'], current: 0, danger: false}
    case 'sent':
      return {stops: [s(nudged ? 'done' : 'current', 0), s('pending', 1), s('pending', 2)], segs: ['wait', 'faint'], current: 0, danger: false}
    case 'opened':
      return {stops: [s('done', 0), s(nudged ? 'done' : 'current', 1), s('pending', 2)], segs: ['done', 'wait'], current: 1, danger: false}
    case 'signing':
      return {stops: [s('done', 0), s('done', 1), s('partial', 2)], segs: ['done', 'done'], current: 2, danger: false}
    case 'signed':
      return {stops: [s('done', 0), s('done', 1), s('done', 2, 'check-circle')], segs: ['done', 'done'], current: 2, danger: false}
    case 'expired': {
      const opened = Boolean(p.opens)
      return {stops: [s('done', 0), s(opened ? 'done' : 'pending', 1), s('failed', 2, 'x-mark')], segs: [opened ? 'done' : 'dashed', 'dashed-danger'], current: 2, danger: true}
    }
    case 'bounced':
      return {stops: [s('failed', 0), s('pending', 1), s('pending', 2)], segs: ['dashed-danger', 'dashed'], current: 0, danger: true}
  }
}

export const Stop = ({spec, size = 24, partial}: {spec: StopSpec; size?: 20 | 24; partial?: number}) => (
  <span className="stop" data-state={spec.state} data-size={size} aria-hidden>
    {spec.state === 'partial' ? (
      <svg className="stop__arc" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10.5" pathLength="100" strokeDasharray={`${Math.round((partial ?? 0.33) * 100)} 100`} />
      </svg>
    ) : null}
    <Icon name={spec.icon} size={size === 24 ? 14 : 12} />
  </span>
)

Stop.displayName = 'Stop'

const Segment = ({kind, waited, attention, children}: {kind: SegKind; waited?: number; attention: boolean; children?: React.ReactNode}) => (
  <span
    className="seg"
    data-kind={kind}
    data-attention={kind === 'wait' && attention ? '' : undefined}
    style={{'--waited': waited ?? 0} as CSSProperties}
  >
    {kind === 'wait' ? <span className="seg__lead" /> : null}
    {children}
  </span>
)

Segment.displayName = 'Segment'

/** Detailed: stops with labels and the wait marker. Compact: stops only. */
export const Journey = ({p, compact = false, className}: {p: Proposal; compact?: boolean; className?: string}) => {
  const {reminded, extended} = useDashboard()
  const nudged = isNudged(p, reminded, extended)
  const line = lineOf(p, nudged)
  const size = compact ? 20 : 24
  const partial = p.signing ? p.signing.signed / p.signing.total : undefined
  const waited = waitedOf(p, extended)
  const expires = expiryOf(p, extended)
  const waitSeg = (i: 0 | 1) =>
    line.segs[i] === 'wait' ? (
      <Segment kind="wait" waited={waited} attention={nudged}>
        {compact ? null : <WaitMarker p={p} waited={waited} attention={nudged} />}
      </Segment>
    ) : (
      <Segment kind={line.segs[i]} attention={false} />
    )
  return (
    <div className={cn('journey', compact && 'journey--compact', className)}>
      <div className="journey__line">
        <Stop spec={line.stops[0]} size={size} />
        {waitSeg(0)}
        <Stop spec={line.stops[1]} size={size} />
        {waitSeg(1)}
        <Stop spec={line.stops[2]} size={size} partial={partial} />
      </div>
      {compact ? null : (
        <ol className="journey__labels" aria-label="Progress">
          {p.stops.map((stop, i) => {
            const isCurrent = i === line.current
            return (
              <li key={i} className="journey__label" data-current={isCurrent || undefined} data-danger={(isCurrent && line.danger) || undefined}>
                <span className={isCurrent ? 't-ui' : 't-ui-regular'}>{swapExpiry(stop.label, expires)}</span>
                {isCurrent && stop.detail ? <span className="t-caption journey__detail">{stop.detail}</span> : null}
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}

Journey.displayName = 'Journey'

/** The clock on the waiting stretch. Hover for 300ms or focus to open. */
export const WaitMarker = ({p, waited, attention}: {p: Proposal; waited: number; attention: boolean}) => {
  const {reminded, extended, remind} = useDashboard()
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const wrap = useRef<HTMLSpanElement>(null)
  const marker = useRef<HTMLButtonElement>(null)
  const tipId = useId()
  const expires = expiryOf(p, extended)
  const why = reminded.has(p.id)
    ? `Reminder sent to ${p.contact}. Expires ${expires}.`
    : attention && p.nudge
      ? swapExpiry(p.nudge.why, expires)
      : `Waiting on ${p.contact}. Expires ${expires}.`
  const pct = Math.round(waited * 100)

  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = () => {
    // Keep focus inside the marker so the confirmation stays open.
    marker.current?.focus()
    remind([p.id], `Reminder sent to ${p.contact}`)
    setSent(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setOpen(false)
      setSent(false)
    }, 1600)
  }

  return (
    <span
      ref={wrap}
      className="wait"
      style={{left: `${pct}%`}}
      onPointerEnter={(e) => {
        if (e.pointerType !== 'mouse') return
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setOpen(true), 300)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'mouse' || sent) return
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setOpen(false), 120)
      }}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false)
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        ref={marker}
        type="button"
        className="wait__marker"
        data-attention={attention || undefined}
        aria-label={`Waited ${pct}% of the time to expiry`}
        aria-describedby={open ? tipId : undefined}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="clock" size={12} />
      </button>
      <span id={tipId} role="tooltip" className="tip" data-open={open || undefined}>
        {sent ? (
          <span className="tip__sent t-ui">
            <Icon name="check-circle" size={14} /> Reminder sent to {p.contact}
          </span>
        ) : (
          <>
            <span className="t-caption tip__why">{why}</span>
            {canRemind(p) && !reminded.has(p.id) ? (
              <button type="button" className="tip__action t-ui" onClick={send}>
                <Icon name="paper-airplane" size={12} /> Send a reminder
              </button>
            ) : null}
          </>
        )}
      </span>
    </span>
  )
}

WaitMarker.displayName = 'WaitMarker'

export type ChipTone = 'neutral' | 'accent' | 'attention' | 'danger'

export const Chip = ({tone, icon, children}: {tone: ChipTone; icon: IconName; children: React.ReactNode}) => (
  <span className="chip t-badge" data-tone={tone}>
    <Icon name={icon} size={12} />
    {children}
  </span>
)

Chip.displayName = 'Chip'

/** The status chip for a stage. */
export function statusChip(p: Proposal): {tone: ChipTone; icon: IconName; label: string} {
  switch (p.stage) {
    case 'draft':
      return {tone: 'neutral', icon: 'pencil', label: 'Draft'}
    case 'sent':
      return {tone: 'neutral', icon: 'paper-airplane', label: 'Sent'}
    case 'opened':
      return {tone: 'accent', icon: 'eye', label: 'Opened'}
    case 'signing':
      return {tone: 'accent', icon: 'pencil', label: `Signing, ${p.signing?.signed} of ${p.signing?.total}`}
    case 'signed':
      return {tone: 'accent', icon: 'check-circle', label: 'Signed'}
    case 'expired':
      return {tone: 'danger', icon: 'x-mark', label: 'Expired'}
    case 'bounced':
      return {tone: 'danger', icon: 'exclamation-triangle', label: 'Email bounced'}
  }
}

/** The nudge chip, or the neutral one once a reminder went out. */
export function nudgeChip(p: Proposal, reminded: Ids, extended: Ids): {tone: ChipTone; icon: IconName; label: string} | null {
  if (!p.nudge) return null
  if (p.nudge.kind === 'bounced') return {tone: 'danger', icon: 'exclamation-triangle', label: p.nudge.label}
  if (reminded.has(p.id)) return {tone: 'neutral', icon: 'paper-airplane', label: 'Reminder sent just now'}
  if (isSettled(p, reminded, extended)) return {tone: 'neutral', icon: 'clock', label: `Expiry moved to ${expiryOf(p, extended)}`}
  return {tone: 'attention', icon: p.nudge.kind === 'expiring' ? 'clock' : 'exclamation-triangle', label: p.nudge.label}
}

export const Money = ({amount, currency, maxChars, className}: {amount: number; currency: Proposal['currency']; maxChars?: number; className?: string}) => {
  const {parts, full, short} = moneyParts(amount, currency, {maxChars})
  return (
    <span className={cn('money', className)} title={short ? full : undefined} aria-label={full}>
      {parts.map((part, i) => (
        <span key={i} className={part.minor ? 'money__minor' : undefined} aria-hidden>
          {part.text}
        </span>
      ))}
    </span>
  )
}

Money.displayName = 'Money'
