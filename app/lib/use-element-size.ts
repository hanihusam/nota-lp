import {useLayoutEffect, useRef, useState} from 'react'

interface Size {
  width: number
  height: number
}

/**
 * Size of an element, kept current with a ResizeObserver. Stageshow stages
 * inside bento tiles draw at 1:1, so they need the slot's real size rather
 * than a scale factor.
 */
export const useElementSize = <T extends HTMLElement>(fallback: Size) => {
  const ref = useRef<T>(null)
  const [size, setSize] = useState(fallback)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    const measure = () =>
      setSize({width: Math.round(node.clientWidth), height: Math.round(node.clientHeight)})
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, size] as const
}
