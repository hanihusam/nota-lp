import {useCallback, useEffect, useRef, useState} from 'react'

import type {Act} from '~/lib/stageshow'

/**
 * One step of a product story: wait, then type into a string field and/or
 * merge a patch. The same list drives a Stageshow script (stacked layout,
 * played when the picture is in view) and the pinned chapter, where scroll
 * picks the step and each step's beats play once on their own clock.
 */
export interface Beat<S> {
  wait: number
  type?: {key: keyof S & string; text: string}
  set?: Partial<S>
}

const TYPE_INTERVAL = 40

export const finalState = <S extends object>(start: S, ...groups: Beat<S>[][]): S =>
  groups.flat().reduce<S>(
    (s, b) => ({...s, ...(b.type ? {[b.type.key]: b.type.text} : null), ...b.set}),
    start,
  )

export const toScript =
  <S extends object>(beats: Beat<S>[]) =>
  async (a: Act<S>) => {
    for (const b of beats) {
      await a.wait(b.wait)
      if (b.type) await a.type(b.type.key, b.type.text, {interval: TYPE_INTERVAL})
      if (b.set) await a.set(b.set)
    }
  }

/** Scene state plus `play(beats)`, which schedules a group of beats from now. */
export const useBeatPlayer = <S extends object>(start: S) => {
  const [state, setState] = useState(start)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(id => window.clearTimeout(id)), [])

  const play = useCallback((beats: Beat<S>[]) => {
    let at = 0
    const later = (ms: number, patch: Partial<S>) =>
      timers.current.push(window.setTimeout(() => setState(prev => ({...prev, ...patch})), ms))
    for (const b of beats) {
      at += b.wait
      if (b.type) {
        const {key, text} = b.type
        for (let i = 1; i <= text.length; i++) {
          later(at + i * TYPE_INTERVAL, {[key]: text.slice(0, i)} as Partial<S>)
        }
        at += text.length * TYPE_INTERVAL
      }
      if (b.set) later(at, b.set)
    }
  }, [])

  return [state, play] as const
}
