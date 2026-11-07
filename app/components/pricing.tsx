import type {ReactNode} from 'react'

import {cn} from '~/lib/cn'
import {APP_URL, PRO_PRICE} from '~/lib/site'

import {ButtonLink} from './ui/button'
import {Icon} from './ui/icon'
import {SectionHeading} from './ui/section-heading'

const FREE = [
  'Unlimited proposals and clients',
  'Reusable blocks, totals and tax',
  'Branded PDF export',
  'Works offline, keyboard-first',
  '3 e-signature requests a month',
] as const

const PRO = [
  'Unlimited e-signatures with an audit trail',
  'Live links with “opened” alerts',
  'Sync and backup across devices',
  'Your own domain, no Nota branding',
  'Collect a deposit when they sign',
] as const

interface PlanProps {
  name: string
  badge?: string
  tagline: string
  price: string
  period: string
  action: ReactNode
  intro?: string
  features: readonly string[]
  featured?: boolean
  index: number
}

/** Figma: Landing → Pricing → Plan Card / Free and / Pro. */
const Plan = ({name, badge, tagline, price, period, action, intro, features, featured, index}: PlanProps) => (
  <article
    data-reveal
    style={{'--reveal-index': index, '--stagger': '100ms'} as React.CSSProperties}
    className={cn(
      'flex flex-col rounded-2xl border bg-surface-glass p-6 shadow-card lg:p-8',
      featured ? 'border-border-accent/70' : 'border-border-glass',
    )}
  >
    <div className="flex items-center gap-2.5">
      <h3 className="text-heading-2 text-text-primary">{name}</h3>
      {badge ? (
        <span className="rounded-full bg-sage-900 px-2 py-0.5 text-caption text-text-accent">
          {badge}
        </span>
      ) : null}
    </div>
    <p className="mt-2 text-paragraph text-text-tertiary">{tagline}</p>
    <p className="mt-6 flex items-baseline gap-2.5">
      <span className="text-display-2 text-text-primary">{price}</span>
      <span className="text-paragraph text-text-tertiary">{period}</span>
    </p>
    <div className="mt-6">{action}</div>
    <div className="mt-6 border-t border-border-subtle pt-6">
      {intro ? <p className="mb-3 text-label text-text-tertiary">{intro}</p> : null}
      <ul className="flex flex-col gap-3">
        {features.map(feature => (
          <li key={feature} className="flex items-start gap-3 text-paragraph text-text-secondary">
            <Icon name="check" size={14} className="mt-1 shrink-0 text-icon-accent" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </article>
)

Plan.displayName = 'Plan'

/**
 * Figma: Landing → Pricing. Modelled on Obsidian and Cap: everything that
 * runs on your device is free with no limits; Pro is the parts that need a
 * server. The Pro price is a placeholder (PRO_PRICE in lib/site.ts).
 */
export const Pricing = () => (
  <section id="pricing" aria-labelledby="pricing-title" className="py-24 lg:py-32">
    <div className="container-page flex flex-col gap-12 lg:gap-16">
      <SectionHeading
        id="pricing-title"
        align="center"
        eyebrow="Pricing"
        title="Free forever. Pro when you need the cloud."
        description="Everything that runs on your device is free, with no limits. Pro adds the parts that need our servers."
      />
      <div className="mx-auto grid w-full max-w-236 gap-4 md:grid-cols-2 lg:gap-6">
        <Plan
          index={0}
          name="Free"
          tagline="For everything you do on your own device."
          price="$0"
          period="forever"
          action={
            <ButtonLink href={APP_URL} variant="secondary" size="lg" className="w-full">
              Start free
            </ButtonLink>
          }
          features={FREE}
        />
        <Plan
          index={1}
          featured
          name="Pro"
          badge="Cloud"
          tagline="For proposals that live online."
          price={PRO_PRICE.amount}
          period={PRO_PRICE.period}
          action={
            <ButtonLink href={APP_URL} size="lg" className="w-full">
              Get Pro
            </ButtonLink>
          }
          intro="Everything in Free, plus:"
          features={PRO}
        />
      </div>
      <p data-reveal className="text-center text-caption text-text-tertiary">
        Cancel anytime. Your proposals stay on your device either way.
      </p>
    </div>
  </section>
)

Pricing.displayName = 'Pricing'
