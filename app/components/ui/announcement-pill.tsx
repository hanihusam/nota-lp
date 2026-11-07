import type {ComponentPropsWithRef} from 'react'

import {cn} from '~/lib/cn'

import {Icon} from './icon'

interface AnnouncementPillProps extends ComponentPropsWithRef<'a'> {
  tag: string
  label: string
}

export const AnnouncementPill = ({
  tag,
  label,
  className,
  ...rest
}: AnnouncementPillProps) => (
  <a
    className={cn(
      'group inline-flex items-center gap-2.5 rounded-full border border-border-glass bg-surface-glass py-1 pr-3 pl-1 transition-colors duration-(--duration-fast) hover:bg-surface-glass-hover',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400',
      className,
    )}
    {...rest}
  >
    <span className="rounded-full bg-sage-900 px-2 py-0.5 text-caption text-text-accent">
      {tag}
    </span>
    <span className="text-label text-text-secondary transition-colors duration-(--duration-fast) group-hover:text-text-primary">
      {label}
    </span>
    <Icon
      name="arrow-right"
      size={14}
      className="text-icon-secondary transition-transform duration-(--duration-fast) ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
    />
  </a>
)

AnnouncementPill.displayName = 'AnnouncementPill'
