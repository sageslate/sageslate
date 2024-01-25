import { Errors, doesNotExist } from '@sageslate/stone'
import { compare } from 'bcrypt'
import { ObjectId } from 'mongodb'
import { z } from 'zod'

import { assertIsAdmin } from '../../../utils/assertions.js'
import { createToken } from '../../../utils/jsonWebToken.js'
import { rules } from '../../../utils/validation.js'

import type { AdminMutationResolvers } from './../../types.generated.js'

const argumentSchemas = {
  login: z.object({
    password: z.string(),
  }),
  setup: z.object({
    input: z.object({
      password: rules.password,
    }),
  }),
  createRealm: z.object({
    input: z.object({
      id: rules.objectId,
      name: rules.realmName,
    }),
  }),
}

export const AdminMutation: AdminMutationResolvers = {
  login: async (_parent, argument, { configuration }) => {
    const { password } = argumentSchemas.login.parse(argument)

    const hash = await configuration.get('adminPassword')
    const isCorrectPassword = await compare(password, hash)

    if (!isCorrectPassword) {
      throw new Errors.InvalidPassword()
    }

    return { token: await createToken(await configuration.get('jsonWebTokenSecret'), { roles: ['admin'] }) }
  },
  setup: async (_parent, argument, { configuration }) => {
    const {
      input: { password },
    } = argumentSchemas.setup.parse(argument)

    await configuration.initialize(password)

    return { token: await createToken(await configuration.get('jsonWebTokenSecret'), { roles: ['admin'] }) }
  },
  createRealm: async (_parent, argument, { models, user }) => {
    assertIsAdmin(user)
    const {
      input: { id, ...rest },
    } = argumentSchemas.createRealm.parse(argument)

    await models.realm.insertOne({
      _id: new ObjectId(id),
      ...rest,
      isRunning: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const createdRealm = await models.realm.findOne({ _id: new ObjectId(id) })

    if (doesNotExist(createdRealm)) {
      throw new Errors.UnknownError()
    }

    return createdRealm
  },
}
