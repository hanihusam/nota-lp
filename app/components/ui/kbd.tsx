import type {ComponentPropsWithRef} from 'react'

import {cn} from '~/lib/cn'

export const Kbd = ({className, ...rest}: ComponentPropsWithRef<'kbd'>) => (
  <kbd
    className={cn(
      'inline-flex h-5.5 min-w-5.5 items-center justify-center rounded border border-border-glass bg-surface-glass-hover px-1.5 font-sans text-caption text-text-secondary shadow-[inset_0_-1px_0_rgb(0_0_0/0.4)]',
      className,
    )}
    {...rest}
  />
)

Kbd.displayName = 'Kbd'
