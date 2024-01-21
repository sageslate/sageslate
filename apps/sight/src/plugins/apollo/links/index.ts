import { from } from '@apollo/client/core'

import { errorLink } from './error'
import { httpLink } from './http'

export const link = from([errorLink, httpLink])
