import {useEffect, useMemo, useState} from 'react'
import {Link, useNavigate, useSearchParams, useViewTransitionState} from 'react-router'

import {Icon} from '~/components/ui/icon'
import type {Proposal} from '~/lib/dashboard/data'
import {getProposals} from '~/lib/dashboard/data'
import {
  STATUS_LABEL,
  STATUS_ORDER,
  canRemind,
  formatCount,
  formatUsd,
  ledgerOf,
  plural,
  statusOf,
  type StatusFilter,
} from '~/lib/dashboard/format'
import type {IconName} from '~/lib/icons'

import {Chip, Journey, Money, SwapChip, isSettled, nudgeChip, statusChip} from './journey'
import {Roll, Swap} from './motion'
import {useDashboard, usePreference} from './state'

/**
 * Figma: 06 — Dashboard → Proposals / Desktop 1440, Phone 390
 *
 * The list: the amount awaiting signature, a value bar with equal-width status
 * filters, search, the nudge filter, density, and the rows. Filters live in
 * the URL so a link reopens the same view; density is remembered per person.
 */

const PAGE_SIZE = 25

const STATUS_ICON: Record<StatusFilter, IconName> = {
  draft: 'pencil',
  sent: 'paper-airplane',
  opened: 'eye',
  signed: 'check-circle',
  expired: 'clock',
}

export const ProposalsPage = () => {
  const [params, setParams] = useSearchParams()
  const dataset = params.get('data')
  const all = getProposals(dataset)
  const {reminded, extended, remind, toast} = useDashboard()
  const [density, setDensity] = usePreference<'detailed' | 'compact'>('density', 'detailed')
  const [swaps, setSwaps] = useState(0)
  const status = (params.get('status') as StatusFilter | null) ?? null
  const nudgeOnly = params.get('nudge') === '1'
  const page = Math.max(1, Number(params.get('page') ?? 1))
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set())

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value === null) next.delete(key)
    else next.set(key, value)
    if (key !== 'page') next.delete('page')
    setParams(next, {replace: true, preventScrollReset: true})
  }

  // Search writes to the URL a beat after typing stops.
  useEffect(() => {
    const t = setTimeout(() => {
      if ((params.get('q') ?? '') !== query) setParam('q', query || null)
    }, 200)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  useEffect(() => setSelected(new Set()), [dataset, status, nudgeOnly, query])

  const ledger = useMemo(() => ledgerOf(all), [all])
  const attention = all.filter((p) => p.nudge && !isSettled(p, reminded, extended)).length
  const needle = query.trim().toLowerCase()
  const filtered = all.filter(
    (p) =>
      (!status || statusOf(p.stage) === status) &&
      (!nudgeOnly || Boolean(p.nudge)) &&
      (!needle || `${p.title} ${p.client} ${p.number}`.toLowerCase().includes(needle)),
  )
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const signedRate = ledger.byStatus.signed.count / Math.max(1, ledger.byStatus.signed.count + ledger.byStatus.expired.count)

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  // The bar keeps showing the last selection while it fades out.
  const picked = all.filter((p) => selected.has(p.id))
  const pickedKey = picked.map((p) => p.id).join(' ')
  const [bulk, setBulk] = useState({key: '', proposals: picked, reminded})
  if (picked.length > 0 && (pickedKey !== bulk.key || reminded !== bulk.reminded)) setBulk({key: pickedKey, proposals: picked, reminded})
  const bulkOn = picked.length > 0
  const nudgeLabel = attention === 0 ? 'None need a nudge' : `${formatCount(attention)} ${attention === 1 ? 'needs' : 'need'} a nudge`

  const allOnPage = rows.length > 0 && rows.every((p) => selected.has(p.id))
  const someOnPage = rows.some((p) => selected.has(p.id))

  return (
    <main className="dash-main">
      <div className="page-head">
        <h1 className="t-h1">Proposals</h1>
        <div className="page-head__actions">
          <button type="button" className="btn btn--secondary t-ui" onClick={() => toast('Export is not part of this prototype.')}>
            <Icon name="arrow-down-tray" size={14} /> Export
          </button>
          <button type="button" className="btn btn--primary t-ui" onClick={() => toast('The editor is not part of this prototype.')}>
            <Icon name="plus" size={14} /> New proposal
          </button>
        </div>
      </div>

      <section className="ledger" aria-label="Totals">
        <div className="ledger__total">
          <span className="t-ui-regular ledger__label">Awaiting signature</span>
          <span className="ledger__amount">
            <span className="t-display">{formatUsd(ledger.awaiting)}</span>
            <span className="t-h1 ledger__cents">.00</span>
          </span>
          <span className="t-caption ledger__note">
            {plural(ledger.awaitingCount, 'proposal')} out with clients: {formatCount(ledger.sentCount)} sent,{' '}
            {formatCount(ledger.openedCount)} opened
            {ledger.mixedCurrency ? '. Totals converted to USD.' : ''}
          </span>
        </div>
        <dl className="ledger__stats">
          <div>
            <dt className="t-caption">Signed, last 90 days</dt>
            <dd className="t-stat">{formatUsd(ledger.byStatus.signed.value)}</dd>
          </div>
          <div>
            <dt className="t-caption">Signing rate, last 90 days</dt>
            <dd className="t-stat">{Math.round(signedRate * 100)}%</dd>
          </div>
          <div>
            <dt className="t-caption">Median time to sign</dt>
            <dd className="t-stat">{dataset === 'stress' ? '38.5 days' : '2.4 days'}</dd>
          </div>
        </dl>
      </section>

      <section className="strip" aria-label="Filter by status">
        <div className="strip__bar" aria-hidden>
          {STATUS_ORDER.filter((s) => ledger.byStatus[s].value > 0).map((s) => (
            <span
              key={s}
              className="strip__seg"
              data-status={s}
              data-muted={(status && status !== s) || undefined}
              style={{flexGrow: ledger.byStatus[s].value}}
            />
          ))}
        </div>
        <div className="strip__filters">
          {STATUS_ORDER.map((s) => {
            const {count, value} = ledger.byStatus[s]
            return (
              <button
                key={s}
                type="button"
                className="filter"
                data-status={s}
                aria-pressed={status === s}
                data-muted={(status && status !== s) || undefined}
                onClick={() => setParam('status', status === s ? null : s)}
              >
                <span className="filter__head t-ui">
                  <Icon name={STATUS_ICON[s]} size={14} className="filter__icon" />
                  {STATUS_LABEL[s]}
                </span>
                <span className="t-caption filter__count">
                  {count === 0 ? 'None right now' : `${formatUsd(value)} in ${plural(count, 'proposal')}`}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <div className="toolbar-swap">
        <BulkBar
          proposals={bulk.proposals}
          reminded={bulk.reminded}
          off={!bulkOn}
          onClear={() => setSelected(new Set())}
          onRemind={(ids, note) => {
            remind(ids, note)
            setSelected(new Set())
          }}
        />
        <div className="toolbar" inert={bulkOn}>
          <label className="search">
            <Icon name="magnifying-glass" size={14} />
            <span className="visually-hidden">Search proposals</span>
            <input
              type="search"
              className="t-ui-regular"
              placeholder="Search proposals"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <button
            type="button"
            className="btn btn--secondary t-ui toolbar__nudge"
            aria-pressed={nudgeOnly}
            aria-label={nudgeLabel}
            onClick={() => setParam('nudge', nudgeOnly ? null : '1')}
          >
            <Icon name="exclamation-triangle" size={14} className="toolbar__nudge-icon" />
            <Swap id={attention === 0 ? 'none' : 'some'}>
              {attention === 0 ? (
                nudgeLabel
              ) : (
                <>
                  <Roll value={attention}>{formatCount(attention)}</Roll> {attention === 1 ? 'needs' : 'need'} a nudge
                </>
              )}
            </Swap>
          </button>
          <span className="toolbar__count t-caption" aria-live="polite">
            {formatCount(filtered.length)} of {formatCount(all.length)}, newest activity first
          </span>
          <div className="seg-toggle toolbar__density" role="radiogroup" aria-label="Row density">
            {(['detailed', 'compact'] as const).map((d) => (
              <button
                key={d}
                type="button"
                role="radio"
                aria-checked={density === d}
                data-density={d}
                className="seg-toggle__option t-ui"
                onClick={() => {
                  if (d === density) return
                  setDensity(d)
                  setSwaps((n) => n + 1)
                }}
              >
                {d === 'detailed' ? 'Detailed' : 'Compact'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="table" key={swaps} data-swapped={swaps > 0 || undefined}>
        <div className="table__head t-caption">
          <span className="col-select">
            <input
              type="checkbox"
              aria-label="Select all on this page"
              checked={allOnPage}
              ref={(el) => {
                if (el) el.indeterminate = !allOnPage && someOnPage
              }}
              onChange={() =>
                setSelected(allOnPage ? new Set() : new Set([...selected, ...rows.map((p) => p.id)]))
              }
            />
          </span>
          <span className="col-proposal">Proposal</span>
          <span className="col-progress">Progress</span>
          <span className="col-status">Status</span>
          <span className="col-last">Last activity</span>
          <span className="col-value">Value</span>
          <span className="col-more" />
        </div>
        {rows.length === 0 ? (
          <div className="table__empty">
            <p className="t-h2">No proposals match</p>
            <p className="t-body">Try another search, or clear the filters to see all {formatCount(all.length)}.</p>
            <button
              type="button"
              className="btn btn--secondary t-ui"
              onClick={() => {
                setQuery('')
                const next = new URLSearchParams()
                if (dataset) next.set('data', dataset)
                setParams(next, {replace: true})
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="table__rows">
            {rows.map((p) => (
              <Row key={p.id} p={p} dataset={dataset} selected={selected.has(p.id)} onSelect={() => toggle(p.id)} />
            ))}
          </ul>
        )}
        <div className="table__foot">
          <span className="t-caption">
            {filtered.length === 0
              ? 'Nothing to show'
              : `${formatCount((current - 1) * PAGE_SIZE + 1)}–${formatCount((current - 1) * PAGE_SIZE + rows.length)} of ${formatCount(filtered.length)}`}
          </span>
          {pages > 1 ? (
            <span className="table__pager">
              <button type="button" className="btn btn--secondary t-ui" disabled={current === 1} onClick={() => setParam('page', String(current - 1))}>
                Previous
              </button>
              <button type="button" className="btn btn--secondary t-ui" disabled={current === pages} onClick={() => setParam('page', String(current + 1))}>
                Next
              </button>
            </span>
          ) : null}
        </div>
      </div>
    </main>
  )
}

ProposalsPage.displayName = 'ProposalsPage'

const Row = ({p, dataset, selected, onSelect}: {p: Proposal; dataset: string | null; selected: boolean; onSelect: () => void}) => {
  const {reminded, extended, toast} = useDashboard()
  const navigate = useNavigate()
  const href = `/app/proposals/${p.id}${dataset ? `?data=${dataset}` : ''}`
  // Only the row going to (or coming back from) its detail page carries the
  // names, so its title and amount travel and the rest of the page crossfades.
  const travels = useViewTransitionState(href)
  const status = statusChip(p)
  const nudge = nudgeChip(p, reminded, extended)
  return (
    <li
      className="row"
      data-selected={selected || undefined}
      data-nudge={Boolean(nudge) || undefined}
      data-expired={p.stage === 'expired' || undefined}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('a, button, input, label')) return
        if (window.getSelection()?.toString()) return
        navigate(href, {viewTransition: true})
      }}
    >
      <label className="row__select" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" checked={selected} onChange={onSelect} />
        <span className="visually-hidden">Select {p.title}</span>
      </label>
      <div className="row__proposal">
        <Link
          to={href}
          viewTransition
          className="row__title t-body-strong"
          title={p.title}
          style={travels ? {viewTransitionName: 'proposal-title'} : undefined}
        >
          {p.title}
        </Link>
        <span className="row__client t-caption" title={p.client}>
          {p.client}
        </span>
        {nudge ? (
          <span className="row__chips">
            <SwapChip tone={nudge.tone} icon={nudge.icon}>{nudge.label}</SwapChip>
          </span>
        ) : null}
      </div>
      <Journey p={p} className="row__journey" />
      <Journey p={p} compact className="row__progress" />
      <div className="row__status">
        {nudge ? (
          <SwapChip tone={nudge.tone} icon={nudge.icon}>{nudge.label}</SwapChip>
        ) : (
          <span className="row__status-chip">
            <Chip tone={status.tone} icon={status.icon}>{status.label}</Chip>
          </span>
        )}
      </div>
      <span className="row__last t-caption">{p.lastActivity}</span>
      <span className="row__value" style={travels ? {viewTransitionName: 'proposal-amount'} : undefined}>
        <Money amount={p.amount} currency={p.currency} maxChars={17} />
      </span>
      <button type="button" className="row__more" aria-label={`More actions for ${p.title}`} onClick={() => toast('Row actions are not part of this prototype.')}>
        <Icon name="ellipsis-horizontal" size={16} />
      </button>
    </li>
  )
}

Row.displayName = 'Row'

interface BulkBarProps {
  proposals: Proposal[]
  reminded: ReadonlySet<string>
  off: boolean
  onClear: () => void
  onRemind: (ids: string[], note: string) => void
}

const BulkBar = ({proposals, reminded, off, onClear, onRemind}: BulkBarProps) => {
  const {toast} = useDashboard()
  const eligible = proposals.filter((p) => canRemind(p) && !reminded.has(p.id))
  const skipped = proposals.filter((p) => !eligible.includes(p))
  const why = (p: Proposal) =>
    reminded.has(p.id)
      ? 'already got a reminder'
      : p.stage === 'draft'
        ? "is a draft, so it won't get a reminder"
        : p.stage === 'bounced'
          ? "bounced, so a reminder won't arrive"
          : `is ${p.stage}, so it doesn't need one`
  const note =
    skipped.length === 0
      ? ''
      : skipped.length === 1
        ? `${skipped[0].title} ${why(skipped[0])}.`
        : `${skipped.length} of these can't get a reminder: drafts, signed, expired or already reminded.`
  return (
    <div className="toolbar bulk" role="region" aria-label="Selected proposals" inert={off}>
      <span className="t-body-strong">{proposals.length} selected</span>
      <button type="button" className="btn btn--ghost t-ui" onClick={onClear}>
        Clear
      </button>
      <span className="bulk__divider" aria-hidden />
      {eligible.length > 0 ? (
        <button
          type="button"
          className="btn btn--secondary t-ui"
          onClick={() => onRemind(eligible.map((p) => p.id), `${plural(eligible.length, 'reminder')} sent`)}
        >
          <Icon name="paper-airplane" size={14} /> Send {plural(eligible.length, 'reminder')}
        </button>
      ) : null}
      <button type="button" className="btn btn--secondary t-ui" onClick={() => toast('Export is not part of this prototype.')}>
        <Icon name="arrow-down-tray" size={14} /> Export
      </button>
      <button type="button" className="btn btn--secondary t-ui" onClick={() => toast('Archive is not part of this prototype.')}>
        Archive
      </button>
      {note ? <span className="t-caption bulk__note">{note}</span> : null}
    </div>
  )
}

BulkBar.displayName = 'BulkBar'
