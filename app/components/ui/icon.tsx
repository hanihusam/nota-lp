import type {SVGProps} from 'react'

import {ICONS, type IconName} from '~/lib/icons'

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  /** Rendered size in px. Heroicons 16/solid are drawn on a 16px grid. */
  size?: 12 | 14 | 16 | 20
}

export const Icon = ({name, size = 16, className, ...rest}: IconProps) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden
    className={className}
    {...rest}
  >
    {ICONS[name].map((path, i) => (
      <path
        key={i}
        d={path.d}
        fillRule={'evenodd' in path ? 'evenodd' : undefined}
        clipRule={'evenodd' in path ? 'evenodd' : undefined}
      />
    ))}
  </svg>
)

Icon.displayName = 'Icon'
