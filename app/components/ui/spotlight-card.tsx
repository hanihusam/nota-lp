import {useCallback, type ComponentPropsWithRef, type PointerEvent} from 'react'

import {cn} from '~/lib/cn'

/**
 * Glass card with a pointer-follow spotlight. The light tracks the pointer
 * exactly (no easing) and only on devices that can hover; it fades in and
 * out over --duration-fast. Position lives in CSS variables on the card
 * itself, so moving it never re-renders React.
 */
export const SpotlightCard = ({
  className,
  children,
  onPointerMove,
  ...rest
}: ComponentPropsWithRef<'div'>) => {
  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
      event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
      onPointerMove?.(event)
    },
    [onPointerMove],
  )

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn(
        'group/spotlight relative isolate overflow-hidden rounded-2xl border border-border-glass bg-surface-glass shadow-card',
        'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-(--duration-fast)',
        'before:bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,0%),var(--color-glow-spotlight),transparent_60%)]',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:p-px after:opacity-0 after:transition-opacity after:duration-(--duration-fast)',
        'after:bg-[radial-gradient(260px_circle_at_var(--x,50%)_var(--y,0%),rgb(255_255_255/0.22),transparent_70%)]',
        'after:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]',
        'hover:before:opacity-100 hover:after:opacity-100 motion-reduce:before:hidden motion-reduce:after:hidden',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

SpotlightCard.displayName = 'SpotlightCard'
