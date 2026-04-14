import type {ComponentPropsWithRef, ReactNode} from 'react'

import {cn} from '~/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'base' | 'lg'
type ButtonIconPosition = 'left' | 'right'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  iconPosition?: ButtonIconPosition
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="size-5 shrink-0"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-btn-primary [@media(hover:hover)]:hover:bg-btn-primary-hover active:bg-btn-primary-pressed text-white',
  secondary:
    'border border-border-strong [@media(hover:hover)]:hover:bg-surface [@media(hover:hover)]:hover:border-gray-600 active:bg-gray-800 active:border-gray-600 text-white',
  ghost:
    'text-sage-400! [@media(hover:hover)]:hover:bg-sage-950 [@media(hover:hover)]:hover:text-sage-300 active:bg-sage-900 active:text-sage-300',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-caption gap-1.5',
  base: 'px-5 py-2 text-button',
  lg: 'px-7 py-3 text-button',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'base',
  iconPosition,
  className = '',
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-lg inline-flex items-center gap-2 transition active:scale-[0.97] motion-reduce:active:scale-100',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {iconPosition === 'left' && <ArrowRightIcon />}
      {children}
      {iconPosition === 'right' && <ArrowRightIcon />}
    </button>
  )
}

Button.displayName = 'Button'

export {Button}
export default Button
