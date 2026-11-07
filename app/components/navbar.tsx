import {useCallback, useEffect, useRef, useState} from 'react'

import {cn} from '~/lib/cn'
import {APP_URL, NAV_LINKS} from '~/lib/site'

import {ButtonLink} from './ui/button'
import {Icon} from './ui/icon'

/**
 * Figma: 02 — Components → Navbar (State=Top / State=Scrolled).
 * Top → Scrolled once an 8px sentinel at the top of the document leaves the
 * viewport (an IntersectionObserver, so no scroll listener): page fill at
 * 72%, 16px backdrop blur and a border/subtle hairline, 250ms ease. Below lg
 * the links move into a sheet.
 */
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const sentinelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const closeMenu = useCallback(() => setOpen(false), [])
  const toggleMenu = useCallback(() => setOpen(prev => !prev), [])

  const solid = scrolled || open

  return (
    <>
    <span ref={sentinelRef} aria-hidden className="pointer-events-none absolute top-0 left-0 h-2 w-px" />
    <header
      data-scrolled={solid || undefined}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-transparent',
        'transition-[background-color,border-color,backdrop-filter] duration-250 ease-out motion-reduce:transition-none',
        'data-scrolled:border-border-subtle data-scrolled:bg-background-primary/72 data-scrolled:backdrop-blur-lg',
      )}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-14 items-center justify-between lg:h-16"
      >
        <div className="flex items-center gap-8">
          <a
            href="#top"
            onClick={closeMenu}
            className="rounded-sm font-serif text-[24px] leading-none tracking-[-0.02em] text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-400"
          >
            nota
          </a>
          <ul className="hidden items-center lg:flex">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md px-3 py-1.5 text-paragraph text-text-secondary transition-colors duration-(--duration-fast) hover:text-text-primary focus-visible:outline-2 focus-visible:outline-sage-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1 lg:gap-2">
          <a
            href={APP_URL}
            className="hidden rounded-md px-3 py-1.5 text-paragraph text-text-secondary transition-colors duration-(--duration-fast) hover:text-text-primary focus-visible:outline-2 focus-visible:outline-sage-400 lg:block"
          >
            Sign in
          </a>
          <ButtonLink href={APP_URL} size="sm">
            Get started
          </ButtonLink>
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 grid size-11 cursor-pointer place-items-center rounded-lg text-icon-primary focus-visible:outline-2 focus-visible:outline-sage-400 lg:hidden"
          >
            <Icon name={open ? 'x-mark' : 'bars-2'} size={20} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        data-open={open || undefined}
        inert={!open}
        className={cn(
          'pointer-events-none absolute inset-x-0 top-full border-b border-border-subtle bg-background-primary/95 opacity-0 backdrop-blur-lg lg:hidden',
          '-translate-y-2 transition-[opacity,translate] duration-250 ease-standard motion-reduce:translate-y-0',
          'data-open:pointer-events-auto data-open:translate-y-0 data-open:opacity-100',
        )}
      >
        <ul className="container-page flex flex-col py-4">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              style={{transitionDelay: open ? `${i * 30}ms` : '0ms'}}
              className={cn(
                'translate-y-1 opacity-0 transition-[opacity,translate] duration-250 ease-standard motion-reduce:translate-y-0',
                open && 'translate-y-0 opacity-100',
              )}
            >
              <a
                href={link.href}
                onClick={closeMenu}
                className="flex h-12 items-center text-body text-text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={APP_URL}
              onClick={closeMenu}
              className="flex h-12 items-center text-body text-text-secondary"
            >
              Sign in
            </a>
          </li>
        </ul>
      </div>
    </header>
    </>
  )
}

Navbar.displayName = 'Navbar'
