import {useEffect, useRef, useState, type ReactNode} from 'react'
import {AnimatePresence, LazyMotion, MotionConfig, domAnimation, useReducedMotion, type Transition, type Variants} from 'motion/react'
import * as m from 'motion/react-m'

import {cn} from '~/lib/cn'

import {useDashboard} from './state'

/**
 * Figma: 07 — Dashboard Handoff → Motion
 *
 * The motion pieces the dashboard shares. Every one answers a click, so while
 * the page restores stored state their transitions are instant and nothing
 * moves on load. Motion loads only on /app, with the smaller feature set.
 */

const SPRING: Transition = {type: 'spring', duration: 0.3, bounce: 0}
const HEIGHT: Transition = {duration: 0.27, ease: [0.25, 1, 0.5, 1]}
const INSTANT: Transition = {duration: 0}

export const MotionRoot = ({children}: {children: ReactNode}) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
)

MotionRoot.displayName = 'MotionRoot'

/** The spring for a state swap, or none while the page restores. */
export function useSwapTransition(): Transition {
  const {live} = useDashboard()
  return live ? SPRING : INSTANT
}

/** Height changes move what's below, so reduced motion makes them instant. */
export function useHeightTransition(): Transition {
  const {live} = useDashboard()
  const reduce = useReducedMotion()
  return live && !reduce ? HEIGHT : INSTANT
}

export function useMeasure<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState<{width: number; height: number} | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize[0]
      setSize({width: box.inlineSize, height: box.blockSize})
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, size] as const
}

const FADE: Variants = {
  hidden: {opacity: 0, filter: 'blur(2px)'},
  shown: {opacity: 1, filter: 'blur(0px)'},
}

/** Crossfades its content through a 2px blur whenever `id` changes. */
export const Swap = ({id, className, children}: {id: string; className?: string; children: ReactNode}) => {
  const transition = useSwapTransition()
  return (
    <span className={cn('swap', className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span key={id} className="swap__item" variants={FADE} initial="hidden" animate="shown" exit="hidden" transition={transition}>
          {children}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

Swap.displayName = 'Swap'

const ROLL: Variants = {
  enter: (dir: number) => ({y: dir > 0 ? '60%' : '-60%', opacity: 0, filter: 'blur(2px)'}),
  shown: {y: '0%', opacity: 1, filter: 'blur(0px)'},
  leave: (dir: number) => ({y: dir > 0 ? '-60%' : '60%', opacity: 0, filter: 'blur(2px)'}),
}

/** A count that rolls to its new value: down when it drops, up when it grows. */
export const Roll = ({value, children}: {value: number; children: ReactNode}) => {
  const transition = useSwapTransition()
  const [prev, setPrev] = useState(value)
  const [dir, setDir] = useState(1)
  if (value !== prev) {
    setDir(value > prev ? 1 : -1)
    setPrev(value)
  }
  return (
    <span className="roll">
      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <m.span key={value} custom={dir} variants={ROLL} initial="enter" animate="shown" exit="leave" transition={transition}>
          {children}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

Roll.displayName = 'Roll'

/** A box that eases to its content's height instead of jumping. */
export const AutoHeight = ({className, innerClassName, children, ...rest}: {className?: string; innerClassName?: string; children: ReactNode} & Record<`data-${string}` | `aria-${string}`, string | undefined>) => {
  const [ref, size] = useMeasure<HTMLDivElement>()
  const transition = useHeightTransition()
  return (
    <m.div className={cn('auto-height', className)} animate={{height: size ? size.height : 'auto'}} transition={transition} {...rest}>
      <div ref={ref} className={innerClassName}>
        {children}
      </div>
    </m.div>
  )
}

AutoHeight.displayName = 'AutoHeight'
