import type {ComponentPropsWithRef, ReactNode} from 'react'

import {cn} from '~/lib/cn'

import {Icon} from './icon'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'base' | 'lg'

interface ButtonStyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Adds the trailing arrow that nudges right on hover. */
  arrow?: boolean
}

export function buttonVariant(variant: ButtonVariant = 'primary'): string {
  switch (variant) {
    case 'secondary': {
      return 'border border-border-glass bg-surface-glass text-text-primary hover:border-white/16 hover:bg-surface-glass-hover'
    }
    case 'ghost': {
      return 'text-text-secondary hover:bg-surface-glass hover:text-text-primary'
    }
    default: {
      return 'bg-button-primary text-button-text-primary shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.4)] hover:bg-button-hover active:bg-button-pressed'
    }
  }
}

export function buttonSize(size: ButtonSize = 'base'): string {
  switch (size) {
    case 'sm': {
      return 'h-8 gap-1.5 px-3'
    }
    case 'lg': {
      return 'h-11 gap-2 px-5'
    }
    default: {
      return 'h-9 gap-2 px-4'
    }
  }
}

export function buttonStyles({variant, size}: ButtonStyleProps = {}) {
  return cn(
    'group/button inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg text-paragraph leading-none select-none',
    'transition-[background-color,border-color,color,scale] duration-(--duration-fast) ease-out active:scale-[0.97] motion-reduce:active:scale-100',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400',
    buttonVariant(variant),
    buttonSize(size),
  )
}

const ButtonArrow = () => (
  <Icon
    name="arrow-right"
    size={14}
    className="-mr-0.5 transition-transform duration-(--duration-fast) ease-out group-hover/button:translate-x-0.5 motion-reduce:transition-none"
  />
)

interface ButtonProps extends ComponentPropsWithRef<'button'>, ButtonStyleProps {
  children: ReactNode
}

export const Button = ({
  variant,
  size,
  arrow,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) => (
  <button
    type={type}
    className={cn(buttonStyles({variant, size}), className)}
    {...rest}
  >
    {children}
    {arrow ? <ButtonArrow /> : null}
  </button>
)

Button.displayName = 'Button'

interface ButtonLinkProps extends ComponentPropsWithRef<'a'>, ButtonStyleProps {
  children: ReactNode
}

export const ButtonLink = ({
  variant,
  size,
  arrow,
  className,
  children,
  ...rest
}: ButtonLinkProps) => (
  <a className={cn(buttonStyles({variant, size}), className)} {...rest}>
    {children}
    {arrow ? <ButtonArrow /> : null}
  </a>
)

ButtonLink.displayName = 'ButtonLink'
