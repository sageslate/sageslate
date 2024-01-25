import { from } from '@apollo/client/core'

import { authenticationLink } from './authentication'
import { errorLink } from './error'
import { createHttpLink } from './http'

export function createLink(realmId: string) {
  return from([authenticationLink, errorLink, createHttpLink(realmId)])
}
