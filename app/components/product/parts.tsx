import type {CSSProperties} from 'react'

import {Icon} from '~/components/ui/icon'
import {Bar, Collapse, Count, Roll} from '~/lib/stageshow'

import './product.css'

export type Status = 'draft' | 'sent' | 'signed' | 'paid'

const STATUS_LABEL: Record<Status, string> = {
  draft: 'Draft',
  sent: 'Sent',
  signed: 'Signed',
  paid: 'Paid',
}

/** A proposal's status pill. The word rolls and the fill eases when it changes. */
export const StatusBadge = ({status, size}: {status: Status; size?: 'sm'}) => (
  <span className="pui-badge" data-status={status} data-size={size}>
    <Roll>{STATUS_LABEL[status]}</Roll>
  </span>
)

StatusBadge.displayName = 'StatusBadge'

// Sarah Mitchell's signature, written as three pen strokes (name, initial,
// underline) so each draws on in turn with a pen lift between them.
// viewBox 0 0 200 56. Figma: Signature pad → Ink (Sarah M.).
const STROKES = [
  {
    d: 'M30 14 C22 6, 6 10, 10 20 C14 30, 34 30, 30 42 C26 52, 8 50, 6 44 C18 46, 26 34, 36 34 C42 34, 40 44, 34 44 C30 44, 32 36, 40 36 C42 40, 42 44, 48 42 C52 40, 54 34, 58 34 C60 36, 58 40, 64 38 C70 34, 76 34, 74 40 C72 46, 64 44, 68 38 C72 34, 76 42, 82 40 C88 36, 92 20, 96 10 C98 4, 102 8, 98 20 C94 32, 92 40, 94 44 C96 36, 102 32, 106 36 C108 40, 106 44, 112 42',
    duration: 760,
    at: 0,
  },
  {
    d: 'M124 42 C128 30, 132 22, 134 28 C136 34, 132 42, 136 40 C140 34, 144 24, 148 30 C150 36, 148 42, 154 40 C158 34, 162 26, 166 32 C168 38, 166 42, 172 40',
    duration: 380,
    at: 860,
  },
  {d: 'M14 50 C60 54, 120 52, 186 46', duration: 300, at: 1320},
] as const

/** The ink signature. Hidden until `drawn`, then drawn on stroke by stroke (about 1.6s). */
export const Signature = ({drawn, width = 200}: {drawn: boolean; width?: number}) => (
  <svg
    viewBox="0 0 200 56"
    width={width}
    height={Math.round((width * 56) / 200)}
    className="pui-ink"
    data-drawn={drawn || undefined}
    aria-hidden
  >
    {STROKES.map(stroke => (
      <path
        key={stroke.at}
        d={stroke.d}
        pathLength={1}
        style={{'--d': `${stroke.duration}ms`, '--at': `${stroke.at}ms`} as CSSProperties}
      />
    ))}
  </svg>
)

Signature.displayName = 'Signature'

/** Total time the signature takes to draw, for scripts that wait on it. */
export const SIGNATURE_MS = 1620

export const currency = (n: number) =>
  `$${n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`

/** Before and after the Frontend build block lands, at $95 an hour and 10% tax. */
export const TOTALS = {
  before: {subtotal: 3990, tax: 399, total: 4389},
  after: {subtotal: 7790, tax: 779, total: 8569},
} as const

const ROWS = [
  {service: 'Discovery & research', hours: '12', amount: '$1,140'},
  {service: 'UI design', hours: '30', amount: '$2,850'},
] as const

interface LineItemsProps {
  /** The Frontend build block has been dropped in. */
  added: boolean
  /** Drop the Hours and Rate columns for a narrow card. */
  narrow?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Figma: How it works → Window / 01 Write → Line items. The new block opens
 * into the list and carries the rows below it; the totals roll a beat later,
 * subtotal first, so the result follows its cause.
 */
export const LineItems = ({added, narrow, className, style}: LineItemsProps) => {
  const sums = added ? TOTALS.after : TOTALS.before
  return (
    <div className={`pui-card pui-items ${className ?? ''}`} data-narrow={narrow || undefined} style={style}>
      <div className="pui-card__head">
        <span className="pui-caption">Line items</span>
        <span className="pui-link">+ Add block</span>
      </div>
      <div className="pui-items__row pui-items__row--head">
        <span>Service</span>
        <span className="pui-num" data-wide>
          Hours
        </span>
        <span className="pui-num" data-wide>
          Rate
        </span>
        <span className="pui-num">Amount</span>
      </div>
      {ROWS.map(row => (
        <div key={row.service} className="pui-items__row">
          <span>{row.service}</span>
          <span className="pui-num" data-wide>
            {row.hours}
          </span>
          <span className="pui-num" data-wide>
            $95
          </span>
          <span className="pui-num">{row.amount}</span>
        </div>
      ))}
      <Collapse open={added}>
        <div className="pui-items__row" data-fresh>
          <span className="pui-items__service">
            Frontend build <span className="pui-badge pui-badge--block">Block</span>
          </span>
          <span className="pui-num" data-wide>
            40
          </span>
          <span className="pui-num" data-wide>
            $95
          </span>
          <span className="pui-num">$3,800</span>
        </div>
      </Collapse>
      <div className="pui-totals">
        <span>Subtotal</span>
        <Count value={sums.subtotal} format={currency} duration={700} />
        <span>Tax (10%)</span>
        <Count value={sums.tax} format={currency} duration={700} />
        <span className="pui-totals__total">Total</span>
        <Count value={sums.total} format={currency} duration={900} className="pui-totals__amount" />
      </div>
    </div>
  )
}

LineItems.displayName = 'LineItems'

/** A card of placeholder lines: filler that sits under a fade. */
export const FillerCard = ({title, widths}: {title: string; widths: readonly number[]}) => (
  <div className="pui-card">
    <div className="pui-card__head">
      <span className="pui-caption">{title}</span>
    </div>
    <div className="pui-filler">
      {widths.map(w => (
        <Bar key={w} w={w} h={7} tone={2} />
      ))}
    </div>
  </div>
)

FillerCard.displayName = 'FillerCard'

interface NoticeProps {
  show: boolean
  title: string
  meta: string
  className?: string
  style?: CSSProperties
}

/** Nota's in-app notice: "Sarah opened your proposal". Rises in from 8px below. */
export const Notice = ({show, title, meta, className, style}: NoticeProps) => (
  <div className={`pui-notice ${className ?? ''}`} data-show={show || undefined} style={style}>
    <span className="pui-avatar size-8">SM</span>
    <span>
      <span className="pui-notice__title">{title}</span>
      <span className="pui-notice__meta">{meta}</span>
    </span>
  </div>
)

Notice.displayName = 'Notice'

export const CheckGlyph = () => <Icon name="check" size={12} />
