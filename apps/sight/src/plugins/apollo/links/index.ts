import { from } from '@apollo/client/core'

import { authenticationLink } from './authentication'
import { errorLink } from './error'
import { httpLink } from './http'

export const link = from([authenticationLink, errorLink, httpLink])
