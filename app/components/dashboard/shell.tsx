import type {ReactNode} from 'react'
import {Link, NavLink, useSearchParams} from 'react-router'

import {cn} from '~/lib/cn'

import {useDashboard, usePreference} from './state'

/**
 * Figma: 06 — Dashboard → top bar
 *
 * The app frame: a concept notice, the top bar and the page. Only Proposals
 * is built; the other tabs say where they live instead of going nowhere.
 */
export const AppShell = ({children}: {children: ReactNode}) => {
  const {toast} = useDashboard()
  const [theme, setTheme] = usePreference<'dark' | 'light'>('theme', 'dark')
  const [params] = useSearchParams()
  const stress = params.get('data') === 'stress'
  const swap = new URLSearchParams(params)
  if (stress) swap.delete('data')
  else swap.set('data', 'stress')

  return (
    <div className="dash-shell">
      <p className="dash-banner t-caption">
        <span>
          Concept prototype. Proposals and proposal detail are clickable; the
          data is made up and today is Mar 10, 2026.
        </span>
        <span className="dash-banner__links">
          <Link to={{pathname: '/app/proposals', search: swap.toString()}}>
            {stress ? 'Back to normal data' : 'Try worst-case data'}
          </Link>
          <Link to="/">Back to the landing page</Link>
        </span>
      </p>
      <header className="dash-top">
        <Link to={{pathname: '/app/proposals', search: stress ? '?data=stress' : ''}} className="dash-top__mark" aria-label="Nota, Proposals">
          nota
        </Link>
        <nav className="dash-top__nav" aria-label="Main">
          {(['Overview', 'Proposals', 'Clients', 'Settings'] as const).map((label) =>
            label === 'Proposals' ? (
              <NavLink key={label} to={{pathname: '/app/proposals', search: stress ? '?data=stress' : ''}} className={({isActive}) => cn('dash-tab t-ui', isActive && 'is-active')} end={false}>
                {label}
              </NavLink>
            ) : (
              <button
                key={label}
                type="button"
                className="dash-tab t-ui"
                aria-disabled
                onClick={() => toast(`${label} is designed in the Figma file, not built in this prototype.`)}
              >
                {label}
              </button>
            ),
          )}
        </nav>
        <div className="dash-top__end">
          <div className="seg-toggle" role="radiogroup" aria-label="Theme">
            {(['dark', 'light'] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={theme === t}
                data-theme={t}
                className="seg-toggle__option t-caption"
                onClick={() => setTheme(t)}
              >
                {t === 'dark' ? 'Dark' : 'Light'}
              </button>
            ))}
          </div>
          <span className="avatar t-caption" aria-hidden>
            JD
          </span>
          <span className="t-ui-regular dash-top__studio">Jordan Doe Studio</span>
        </div>
      </header>
      {children}
    </div>
  )
}

AppShell.displayName = 'AppShell'
