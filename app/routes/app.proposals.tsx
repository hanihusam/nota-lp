import {ProposalsPage} from '~/components/dashboard/proposals'

import type {Route} from './+types/app.proposals'

export const meta: Route.MetaFunction = () => [
  {title: 'Proposals — Nota dashboard (concept prototype)'},
  {name: 'robots', content: 'noindex'},
]

export default function Proposals() {
  return <ProposalsPage />
}
