import { Errors } from '@sageslate/stone'
import { hash } from 'bcrypt'

import type { AdminMutationResolvers } from './../../types.generated.js'

export const AdminMutation: AdminMutationResolvers = {
  /* Implement AdminMutation resolver logic here */
  login: () => {
    /* AdminMutation.login resolver is required because AdminMutation.login exists but AdminMutationMapper.login does not */
  },
  setup: async (_, { input }, { database }) => {
    const isInitialized = await database.listCollections({ name: 'configuration' }).hasNext()
    if (isInitialized) {
      throw new Errors.AppAlreadyInitialized()
    }

    const configurationCollection = await database.createCollection('configuration')
    await configurationCollection.insertOne({
      key: 'adminPassword',
      value: await hash(input.password, 10),
    })
    return { token: 'token' }
  },
}
