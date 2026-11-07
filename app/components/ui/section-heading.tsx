import type {ReactNode} from 'react'

import {cn} from '~/lib/cn'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  /** Heading id, so the section can be labelled with aria-labelledby. */
  id?: string
  className?: string
}

/** Figma: 02 — Components → Section Heading. Reveals as one staggered group. */
export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
  className,
}: SectionHeadingProps) => (
  <div
    className={cn(
      'flex flex-col gap-4',
      align === 'center' ? 'mx-auto max-w-180 items-center text-center' : 'max-w-160',
      className,
    )}
  >
    <p data-reveal className="text-caption text-text-accent uppercase">
      {eyebrow}
    </p>
    <h2
      id={id}
      data-reveal
      style={{'--reveal-index': 1} as React.CSSProperties}
      className="text-heading-1 text-gradient text-balance"
    >
      {title}
    </h2>
    {description ? (
      <p
        data-reveal
        style={{'--reveal-index': 2} as React.CSSProperties}
        className="text-body text-pretty text-text-secondary"
      >
        {description}
      </p>
    ) : null}
  </div>
)

SectionHeading.displayName = 'SectionHeading'
