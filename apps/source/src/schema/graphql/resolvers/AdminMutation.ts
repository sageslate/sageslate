import { createAdminToken } from '../../../utils/jsonWebToken.js'

import type { AdminMutationResolvers } from './../../types.generated.js'

export const AdminMutation: AdminMutationResolvers = {
  login: () => {
    /* AdminMutation.login resolver is required because AdminMutation.login exists but AdminMutationMapper.login does not */
  },
  setup: async (_, { input }, { configuration }) => {
    await configuration.initialize(input.password)

    return { token: await createAdminToken(await configuration.get('jsonWebTokenSecret')) }
  },
}
