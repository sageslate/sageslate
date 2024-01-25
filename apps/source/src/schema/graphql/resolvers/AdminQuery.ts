import { doesExist } from '@sageslate/stone'

import type { AdminQueryResolvers } from '../../types.generated.js'

export const AdminQuery: AdminQueryResolvers = {
  isAuthenticated: (_parent, _argument, { user }) => {
    return doesExist(user) && user.roles.includes('admin')
  },
}
