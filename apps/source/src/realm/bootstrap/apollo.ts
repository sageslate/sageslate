import { doesExist } from '@sageslate/stone'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'

import { verifyToken } from '../../utils/jsonWebToken.js'
import { resolvers } from '../schema/graphql/resolvers.generated.js'
import { typeDefs } from '../schema/typeDefs.generated.js'

import type { ConfigurationToolkit } from '../../utils/configuration.js'
import type { UserInfo } from '../../utils/jsonWebToken.js'
import type { ApolloContext, ConnectedCoreModels } from '../types/apollo.js'
import type express from 'express'
import type { Db as Database } from 'mongodb'
import type { Server } from 'node:http'

export type BootstrapRealmApolloOptions = {
  app: express.Application
  configuration: ConfigurationToolkit
  coreModels: ConnectedCoreModels
  database: Database
  httpServer: Server
  realmId: string
}

export async function bootstrapRealmApollo({
  app,
  configuration,
  coreModels,
  database,
  httpServer,
  realmId,
}: BootstrapRealmApolloOptions) {
  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: async ({ req, res }) => {
      let user: UserInfo | undefined

      if (doesExist(req?.headers.authorization) && req.headers.authorization.startsWith('Bearer ')) {
        try {
          const token = req.headers.authorization.split(' ')[1]
          user = await verifyToken(await configuration.get('jsonWebTokenSecret'), token)
        } catch {
          /* do nothing */
        }
      }
      return {
        req,
        res,
        database,
        configuration,
        coreModels,
        user,
      }
    },
  })

  await server.start()
  server.applyMiddleware({ app, path: `/graphql/${realmId}` })

  return server
}
