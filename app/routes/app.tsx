import {Outlet} from 'react-router'

import {MotionRoot} from '~/components/dashboard/motion'
import {AppShell} from '~/components/dashboard/shell'
import {DashboardProvider, PREFS_SCRIPT} from '~/components/dashboard/state'
import '~/components/dashboard/dashboard.css'

import type {Route} from './+types/app'

export const meta: Route.MetaFunction = () => [
  {name: 'robots', content: 'noindex'},
]

/**
 * Figma: 06 — Dashboard
 *
 * The clickable prototype of the app behind the landing page: a concept with
 * made-up data. See docs/dashboard.md.
 */
export default function AppLayout() {
  return (
    <>
      <script dangerouslySetInnerHTML={{__html: PREFS_SCRIPT}} />
      <MotionRoot>
        <DashboardProvider>
          <AppShell>
            <Outlet />
          </AppShell>
        </DashboardProvider>
      </MotionRoot>
    </>
  )
}
