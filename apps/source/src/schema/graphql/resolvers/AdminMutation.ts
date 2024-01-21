import { z } from 'zod'

import { createAdminToken } from '../../../utils/jsonWebToken.js'
import { rules } from '../../../utils/validation.js'

import type { AdminMutationResolvers } from './../../types.generated.js'

const inputSchemas = {
  setup: z.object({
    input: z.object({
      password: rules.password,
    }),
  }),
}

export const AdminMutation: AdminMutationResolvers = {
  login: () => {
    /* AdminMutation.login resolver is required because AdminMutation.login exists but AdminMutationMapper.login does not */
  },
  setup: async (_, input, { configuration }) => {
    const {
      input: { password },
    } = inputSchemas.setup.parse(input)

    await configuration.initialize(password)

    return { token: await createAdminToken(await configuration.get('jsonWebTokenSecret')) }
  },
}
