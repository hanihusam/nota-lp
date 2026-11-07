import type {ReactNode} from 'react'

import {SpotlightCard} from '~/components/ui/spotlight-card'
import {cn} from '~/lib/cn'

interface BentoTileProps {
  /** Bold run-in lead, e.g. "Works offline." */
  lead: string
  children: ReactNode
  picture: ReactNode
  index: number
  className?: string
}

/**
 * Figma: Landing → Features → Bento Tile / *. Copy sits top-left as a
 * run-in (bold lead, gray continuation, page type); the picture fills the
 * rest and owns any bleed. Tiles reveal 100ms apart in reading order.
 */
export const BentoTile = ({lead, children, picture, index, className}: BentoTileProps) => (
  <SpotlightCard
    data-reveal
    style={{'--reveal-index': index, '--stagger': '100ms'} as React.CSSProperties}
    className={cn('flex min-h-90 flex-col lg:h-110', className)}
  >
    <p className="max-w-130 p-6 pb-0 text-body text-pretty text-text-tertiary lg:p-8 lg:pb-0">
      <strong className="font-semibold text-text-primary">{lead}</strong>{' '}
      {children}
    </p>
    <div className="relative min-h-0 flex-1">{picture}</div>
  </SpotlightCard>
)

BentoTile.displayName = 'BentoTile'
