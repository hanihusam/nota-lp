import {redirect} from 'react-router'

import type {Route} from './+types/app._index'

export function loader({request}: Route.LoaderArgs) {
  return redirect(`/app/proposals${new URL(request.url).search}`)
}
