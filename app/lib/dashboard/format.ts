import type {Currency, Proposal, Stage} from './data'

const LOCALE: Record<Currency, string> = {
  USD: 'en-US',
  IDR: 'id-ID',
  JPY: 'en-US',
  EUR: 'de-DE',
}

/** Set here, not left to the locale: the Worker and the browser disagree on IDR. */
const DIGITS: Record<Currency, number> = {USD: 2, IDR: 0, JPY: 0, EUR: 2}

export interface MoneyPart {
  text: string
  /** Decimal separator and fraction, set smaller next to the amount. */
  minor: boolean
}

/**
 * Splits a formatted amount so the cents can be set smaller. Currencies
 * without minor units (JPY) have no minor part. Past `maxChars`, the amount
 * switches to the short form (Rp 1,25 M) and the caller shows the full value
 * in a tooltip.
 */
export function moneyParts(
  amount: number,
  currency: Currency,
  {maxChars}: {maxChars?: number} = {},
): {parts: MoneyPart[]; full: string; short: boolean} {
  const locale = LOCALE[currency]
  const digits = DIGITS[currency]
  const fmt = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
  const full = fmt.format(amount)
  if (maxChars && full.length > maxChars) {
    const compact = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(amount)
    return {parts: [{text: compact, minor: false}], full, short: true}
  }
  const parts = fmt.formatToParts(amount).map((p) => ({
    text: p.value,
    minor: p.type === 'decimal' || p.type === 'fraction',
  }))
  return {parts, full, short: false}
}

export const formatUsd = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)

export const formatCount = (n: number) => new Intl.NumberFormat('en-US').format(n)

export const STATUS_ORDER = ['draft', 'sent', 'opened', 'signed', 'expired'] as const
export type StatusFilter = (typeof STATUS_ORDER)[number]

export const STATUS_LABEL: Record<StatusFilter, string> = {
  draft: 'Draft',
  sent: 'Sent',
  opened: 'Opened',
  signed: 'Signed',
  expired: 'Expired',
}

/** Which status filter a stage belongs to. */
export function statusOf(stage: Stage): StatusFilter {
  switch (stage) {
    case 'bounced':
      return 'sent'
    case 'signing':
      return 'opened'
    default:
      return stage
  }
}

export const isAwaiting = (p: Proposal) =>
  p.stage === 'sent' || p.stage === 'opened' || p.stage === 'signing'

export const canRemind = (p: Proposal) => isAwaiting(p)

export interface Ledger {
  awaiting: number
  awaitingCount: number
  sentCount: number
  openedCount: number
  mixedCurrency: boolean
  byStatus: Record<StatusFilter, {count: number; value: number}>
}

export function ledgerOf(proposals: Proposal[]): Ledger {
  const byStatus = Object.fromEntries(
    STATUS_ORDER.map((s) => [s, {count: 0, value: 0}]),
  ) as Ledger['byStatus']
  let awaiting = 0
  let awaitingCount = 0
  let sentCount = 0
  let openedCount = 0
  for (const p of proposals) {
    const s = statusOf(p.stage)
    byStatus[s].count += 1
    byStatus[s].value += p.usd
    if (isAwaiting(p)) {
      awaiting += p.usd
      awaitingCount += 1
      if (s === 'sent') sentCount += 1
      else openedCount += 1
    }
  }
  const mixedCurrency = proposals.some((p) => p.currency !== 'USD')
  return {awaiting, awaitingCount, sentCount, openedCount, mixedCurrency, byStatus}
}

export const plural = (n: number, one: string, many = `${one}s`) =>
  `${formatCount(n)} ${n === 1 ? one : many}`

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const TODAY = new Date(2026, 2, 10)

function parseDay(label: string): Date | null {
  if (label === 'tomorrow') return new Date(2026, 2, 11)
  const m = /^([A-Z][a-z]{2}) (\d{1,2})$/.exec(label)
  const month = m ? MONTHS.indexOf(m[1]) : -1
  return m && month !== -1 ? new Date(2026, month, Number(m[2])) : null
}

/** Extend expiry adds 7 days: "Mar 13" → "Mar 20". The prototype's today is Mar 10, 2026. */
export function extendExpiry(label: string) {
  const d = parseDay(label)
  if (!d) return label
  d.setDate(d.getDate() + 7)
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`
}

/**
 * The wait marker's new spot once expiry is a week later. `waited` is
 * spent / (spent + left), so the days spent follow from the days left.
 */
export function waitedAfterExtend(waited: number, expires: string) {
  const d = parseDay(expires)
  if (!d || waited <= 0 || waited >= 1) return waited
  const left = Math.max(1, (d.getTime() - TODAY.getTime()) / 864e5)
  const spent = (waited * left) / (1 - waited)
  return spent / (spent + left + 7)
}

/** Puts a new date into a sentence's "Expires …", keeping any time after it. */
export const swapExpiry = (text: string, expires?: string) =>
  expires ? text.replace(/Expires [^.,]+?(?= at|\.|$)/, `Expires ${expires}`) : text
