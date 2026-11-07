import {useEffect} from 'react'

/**
 * One IntersectionObserver for the whole page: marks every `[data-reveal]`
 * element with `data-revealed` the first time 20% of it is visible. The
 * transition itself lives in app.css, so this file never animates anything.
 */
export const RevealObserver = () => {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      '[data-reveal]:not([data-revealed]):not(.ss-stage *)',
    )
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.setAttribute('data-revealed', ''))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', '')
          observer.unobserve(entry.target)
        }
      },
      {threshold: 0.2, rootMargin: '0px 0px -10% 0px'},
    )

    targets.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}

RevealObserver.displayName = 'RevealObserver'
