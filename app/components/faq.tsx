import {useCallback, useId, useState} from 'react'

import {cn} from '~/lib/cn'

import {Icon} from './ui/icon'

// The e-signature answer is legal copy: review it before shipping.
const QUESTIONS = [
  {
    q: 'Is Nota really free?',
    a: 'Yes. Everything that runs on your device is free forever: unlimited proposals and clients, reusable blocks and branded PDF export. Pro is optional and only covers the parts that need our servers.',
  },
  {
    q: 'What do I get with Pro?',
    a: 'Unlimited e-signature requests with a signed PDF and audit trail, live links that tell you when they are opened, sync and backup across devices, your own domain, and deposits collected when a client signs.',
  },
  {
    q: 'Are e-signatures legally binding?',
    a: 'Electronic signatures are recognized for most business agreements in many countries, including under the US ESIGN Act and the EU eIDAS rules. Nota records the signer’s name, time and IP address with each signature. For regulated contracts, check with a lawyer.',
  },
  {
    q: 'Does Nota work offline?',
    a: 'Yes. Nota saves to your device as you type, so you can draft anywhere. Sending a link or collecting a signature needs a connection.',
  },
  {
    q: 'Can I use my own branding?',
    a: 'Yes. Add your logo and colors once and every PDF uses them. With Pro, shared links use your own domain and drop the Nota branding.',
  },
  {
    q: 'Can I cancel Pro anytime?',
    a: 'Yes. Cancel from settings whenever you like. Your proposals stay on your device, and everything in Free keeps working.',
  },
] as const

interface FaqItemProps {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}

/**
 * Figma: 02 — Components → Accordion Item. Height animates with
 * grid-template-rows 0fr → 1fr (no measuring), 300ms ease-in-out-cubic;
 * the chevron turns 180°. Instant under reduced motion.
 */
const FaqItem = ({question, answer, open, onToggle}: FaqItemProps) => {
  const id = useId()
  return (
    <div className="border-b border-border-subtle">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-body text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
        >
          {question}
          <span
            aria-hidden
            className={cn(
              'grid size-7 shrink-0 place-items-center rounded-lg border border-border-glass text-icon-secondary transition-[background-color,color] duration-(--duration-fast) group-hover:text-icon-primary',
              open && 'bg-surface-glass-hover text-icon-primary',
            )}
          >
            <Icon
              name="chevron-down"
              size={14}
              className={cn(
                'transition-transform duration-(--duration-base) ease-in-out-cubic motion-reduce:transition-none',
                open && 'rotate-180',
              )}
            />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        inert={!open}
        className={cn(
          'grid transition-[grid-template-rows] duration-(--duration-base) ease-in-out-cubic motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-150 pb-5 text-paragraph text-text-secondary">{answer}</p>
        </div>
      </div>
    </div>
  )
}

FaqItem.displayName = 'FaqItem'

/** Figma: Landing → FAQ. */
export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const toggle = useCallback(
    (index: number) => setOpenIndex(prev => (prev === index ? null : index)),
    [],
  )

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 lg:py-32">
      <div className="container-page grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-24">
        <div className="flex flex-col gap-4">
          <p data-reveal className="text-caption text-text-accent uppercase">
            FAQ
          </p>
          <h2
            id="faq-title"
            data-reveal
            style={{'--reveal-index': 1} as React.CSSProperties}
            className="text-heading-1 text-gradient"
          >
            Questions, <br className="hidden lg:block" />
            answered.
          </h2>
          <p
            data-reveal
            style={{'--reveal-index': 2} as React.CSSProperties}
            className="text-paragraph text-text-tertiary"
          >
            Still curious?{' '}
            <a
              href="mailto:support@nota.app"
              className="text-text-accent underline decoration-sage-400/40 underline-offset-4 transition-colors hover:decoration-sage-400"
            >
              Get in touch
            </a>{' '}
            and a real person will reply.
          </p>
        </div>
        <div className="border-t border-border-subtle">
          {QUESTIONS.map((item, i) => (
            <FaqItem
              key={item.q}
              question={item.q}
              answer={item.a}
              open={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

Faq.displayName = 'Faq'
