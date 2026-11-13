import {data, isRouteErrorResponse, Link, useRouteError} from 'react-router'

import {ProposalDetail} from '~/components/dashboard/detail'
import {findProposal} from '~/lib/dashboard/data'

import type {Route} from './+types/app.proposal'

export function loader({params, request}: Route.LoaderArgs) {
  const proposal = findProposal(params.id)
  if (!proposal) throw data('Proposal not found', {status: 404})
  return {id: proposal.id, dataset: new URL(request.url).searchParams.get('data')}
}

export const meta: Route.MetaFunction = ({data: loaderData}) => [
  {title: `${findProposal(loaderData?.id ?? '')?.title ?? 'Proposal'} — Nota dashboard (concept prototype)`},
  {name: 'robots', content: 'noindex'},
]

export default function ProposalRoute({loaderData}: Route.ComponentProps) {
  const proposal = findProposal(loaderData.id)!
  return <ProposalDetail p={proposal} dataset={loaderData.dataset} />
}

export function ErrorBoundary() {
  const error = useRouteError()
  const missing = isRouteErrorResponse(error) && error.status === 404
  return (
    <main className="dash-main">
      <div className="table__empty">
        <p className="t-h2">{missing ? "This proposal isn't in the prototype" : 'Something went wrong'}</p>
        <p className="t-body">
          {missing ? 'The link may be old, or the address was typed by hand.' : 'Reload the page, or go back to the list.'}
        </p>
        <Link to="/app/proposals" className="btn btn--secondary t-ui">
          Back to proposals
        </Link>
      </div>
    </main>
  )
}
