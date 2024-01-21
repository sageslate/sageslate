import { doesExist } from '@sageslate/stone'

import { assertIsAdmin } from '../../../utils/assertions.js'

import type { AdminQueryResolvers } from './../../types.generated.js'

export const AdminQuery: AdminQueryResolvers = {
  isAuthenticated: (_parent, _argument, { user }) => {
    return doesExist(user) && user.roles.includes('admin')
  },
  realms: async (_parent, _argument, { models, user }) => {
    assertIsAdmin(user)
    return models.realm.find().toArray()
  },
}
