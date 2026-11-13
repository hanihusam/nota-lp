import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {Toaster, toast as showToast} from 'sonner'

/**
 * Figma: Dashboard → Proposals (prototype state)
 *
 * What the prototype remembers while you click around: which proposals got a
 * reminder or a longer expiry. Kept in sessionStorage so list and detail
 * agree; nothing leaves the browser. Toasts are Sonner's, styled with tokens.
 */

interface DashboardState {
  reminded: ReadonlySet<string>
  extended: ReadonlySet<string>
  remind: (ids: string[], message: string) => void
  extend: (id: string, message: string) => void
  toast: (message: string) => void
  /** False until stored state is restored, so restoring doesn't animate. */
  live: boolean
}

const DashboardContext = createContext<DashboardState | null>(null)

const STORE_KEY = 'nota-prototype'

function readStore(): {reminded: string[]; extended: string[]} {
  try {
    const raw = sessionStorage.getItem(STORE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // Private mode or blocked storage: start fresh.
  }
  return {reminded: [], extended: []}
}

export const DashboardProvider = ({children}: {children: ReactNode}) => {
  const [reminded, setReminded] = useState<ReadonlySet<string>>(new Set())
  const [extended, setExtended] = useState<ReadonlySet<string>>(new Set())
  const [phase, setPhase] = useState<'server' | 'restored' | 'live'>('server')

  useEffect(() => {
    const stored = readStore()
    setReminded(new Set(stored.reminded))
    setExtended(new Set(stored.extended))
    setPhase('restored')
  }, [])

  // One commit after the restore, so anything it mounted stays still.
  useEffect(() => {
    if (phase === 'restored') setPhase('live')
  }, [phase])

  useEffect(() => {
    if (phase === 'server') return
    try {
      sessionStorage.setItem(
        STORE_KEY,
        JSON.stringify({reminded: [...reminded], extended: [...extended]}),
      )
    } catch {
      // Not saved; the prototype still works for this page view.
    }
  }, [reminded, extended, phase])

  const toast = useCallback((next: string) => {
    showToast(next)
  }, [])

  const remind = useCallback(
    (ids: string[], note: string) => {
      setReminded((prev) => new Set([...prev, ...ids]))
      toast(note)
    },
    [toast],
  )

  const extend = useCallback(
    (id: string, note: string) => {
      setExtended((prev) => new Set([...prev, id]))
      toast(note)
    },
    [toast],
  )

  const live = phase === 'live'
  const value = useMemo(
    () => ({reminded, extended, remind, extend, toast, live}),
    [reminded, extended, remind, extend, toast, live],
  )

  return (
    <DashboardContext.Provider value={value}>
      <div className="nota-app" data-live={live || undefined}>
        {children}
        <Toaster
          position="bottom-center"
          duration={3200}
          gap={8}
          offset={24}
          mobileOffset={16}
          toastOptions={{unstyled: true, classNames: {toast: 'dash-toast t-ui'}}}
        />
      </div>
    </DashboardContext.Provider>
  )
}

DashboardProvider.displayName = 'DashboardProvider'

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard needs DashboardProvider')
  return ctx
}

type Pref = 'theme' | 'density'

/**
 * Theme and density live on <html> as data attributes, set before paint by
 * `PREFS_SCRIPT`, so CSS can pick the layout without a flash on load.
 */
export function usePreference<T extends string>(name: Pref, fallback: T) {
  const [value, setValue] = useState<T>(fallback)
  useEffect(() => {
    const root = document.documentElement
    let current = root.dataset[prefKey(name)] as T | undefined
    if (!current) {
      // Arrived by client navigation, so PREFS_SCRIPT didn't run.
      try {
        current = (localStorage.getItem(`nota-${name}`) as T | null) ?? undefined
      } catch {
        current = undefined
      }
      if (current) root.dataset[prefKey(name)] = current
    }
    if (current) setValue(current)
  }, [name])
  const update = useCallback(
    (next: T) => {
      setValue(next)
      const root = document.documentElement
      if (name === 'theme') {
        // Every token changes at once; without this, anything with a colour
        // transition would trail the rest of the page by 200ms.
        root.dataset.notaSwitching = ''
        requestAnimationFrame(() => requestAnimationFrame(() => delete root.dataset.notaSwitching))
      }
      root.dataset[prefKey(name)] = next
      try {
        localStorage.setItem(`nota-${name}`, next)
      } catch {
        // Remembered for this page view only.
      }
    },
    [name],
  )
  return [value, update] as const
}

const prefKey = (name: Pref) => (name === 'theme' ? 'notaTheme' : 'notaDensity')

export const PREFS_SCRIPT = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('nota-theme');var n=localStorage.getItem('nota-density');d.dataset.notaTheme=t==='light'?'light':'dark';d.dataset.notaDensity=n==='compact'?'compact':'detailed';}catch(e){}})()`
