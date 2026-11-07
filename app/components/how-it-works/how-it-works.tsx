import {useCallback, useEffect, useRef, useState} from 'react'

import {SectionHeading} from '~/components/ui/section-heading'
import {cn} from '~/lib/cn'

import {PinnedPicture, StepPicture} from './panels'

import './how-it-works.css'

const STEPS = [
  {
    number: '01',
    title: 'Write it',
    description: 'Drop in your saved service blocks. Hours, rates and tax add themselves up.',
  },
  {
    number: '02',
    title: 'Send it',
    description: 'Share a link or a branded PDF, and see the moment your client opens it.',
  },
  {
    number: '03',
    title: 'Get it signed',
    description: 'Your client signs in the browser. You get a signed PDF with an audit trail.',
  },
] as const

type Step = (typeof STEPS)[number]

const Heading = () => (
  <SectionHeading
    eyebrow="How it works"
    title="From first draft to signature."
    description="Three steps in one window. No templates to fight, no spreadsheet on the side, no separate signing app."
  />
)

interface StepItemProps {
  step: Step
  index: number
  state: 'done' | 'active' | 'next'
  onSelect?: () => void
}

/**
 * Figma: 02 — Components → Step Item (State=Active / Inactive). Colors
 * crossfade over 250ms. In the pinned chapter the rail fills with scroll
 * (a CSS scroll timeline on the track, scrubbed, so linear and no duration);
 * without scroll timelines it fills when the step becomes active.
 */
const StepItem = ({step, index, state, onSelect}: StepItemProps) => {
  const Tag = onSelect ? 'button' : 'div'
  return (
    <Tag
      {...(onSelect
        ? {type: 'button' as const, onClick: onSelect, 'aria-current': state === 'active' ? ('step' as const) : undefined}
        : {})}
      data-state={state}
      style={{'--i': index} as React.CSSProperties}
      className={cn(
        'how-step group flex w-full gap-5 text-left',
        onSelect &&
          'cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-400',
      )}
    >
      <span aria-hidden className="how-rail">
        <span className="how-rail__fill" />
      </span>
      <span className="flex flex-col gap-1.5 py-1">
        <span className="text-caption text-text-tertiary transition-colors duration-250 group-data-[state=active]:text-text-accent">
          {step.number}
        </span>
        <span className="text-heading-2 text-text-tertiary transition-colors duration-250 group-data-[state=active]:text-text-primary">
          {step.title}
        </span>
        <span className="text-paragraph text-pretty text-text-disabled transition-colors duration-250 group-data-[state=active]:text-text-secondary">
          {step.description}
        </span>
      </span>
    </Tag>
  )
}

StepItem.displayName = 'StepItem'

const COUNT = STEPS.length

/**
 * Pinned chapter for wide, tall screens with motion allowed (`story:`). The
 * track is 250vh, so the scene holds for 150vh of scroll, 50vh per step.
 * Three sentinels split that travel; an IntersectionObserver on the
 * viewport's center line picks the step, so nothing listens to scroll.
 * The heading sits inside the pin, with the steps.
 */
const Pinned = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [reached, setReached] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const sentinels = track.querySelectorAll<HTMLElement>('[data-step-sentinel]')
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = Number((entry.target as HTMLElement).dataset.stepSentinel)
          setActive(index)
          setReached(prev => Math.max(prev, index))
        }
      },
      {rootMargin: '-49.5% 0px -49.5% 0px'},
    )
    sentinels.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    const top = track.getBoundingClientRect().top + window.scrollY
    const travel = track.offsetHeight - window.innerHeight
    window.scrollTo({top: top + (travel * (index + 0.5)) / COUNT})
  }, [])

  return (
    <div ref={trackRef} className="how-track relative h-[250vh]">
      {STEPS.map((step, i) => (
        <span
          key={step.number}
          aria-hidden
          data-step-sentinel={i}
          className="pointer-events-none absolute inset-x-0 h-[50vh]"
          style={{top: `${50 + i * 50}vh`}}
        />
      ))}
      <div className="sticky top-0 flex h-svh items-center pt-16">
        <div className="container-page grid grid-cols-[400px_1fr] items-center gap-16">
          <div className="flex flex-col gap-12">
            <Heading />
            <ol className="flex flex-col gap-6">
              {STEPS.map((step, i) => (
                <li key={step.number}>
                  <StepItem
                    step={step}
                    index={i}
                    state={i === active ? 'active' : i < active ? 'done' : 'next'}
                    onSelect={() => goTo(i)}
                  />
                </li>
              ))}
            </ol>
          </div>
          <PinnedPicture active={active} reached={reached} />
        </div>
      </div>
    </div>
  )
}

Pinned.displayName = 'Pinned'

/** Phones, short screens and reduced motion: the same story, stacked. */
const Stacked = () => (
  <div className="container-page flex flex-col gap-12">
    <Heading />
    <ol className="flex flex-col gap-14">
      {STEPS.map((step, i) => (
        <li
          key={step.number}
          className="flex flex-col gap-6 lg:grid lg:grid-cols-[400px_1fr] lg:items-center lg:gap-16"
        >
          <StepItem step={step} index={i} state="active" />
          <StepPicture step={i} />
        </li>
      ))}
    </ol>
  </div>
)

Stacked.displayName = 'Stacked'

/** Figma: Landing → How it works (pinned chapter) and its step panels board. */
export const HowItWorks = () => (
  <section id="how-it-works" aria-label="How it works" className="pt-16 pb-16 story:py-0 lg:pt-24">
    <div className="story:hidden">
      <Stacked />
    </div>
    <div className="hidden story:block">
      <Pinned />
    </div>
  </section>
)

HowItWorks.displayName = 'HowItWorks'
