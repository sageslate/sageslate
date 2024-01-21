import { createServer } from 'node:http'

import { doesExist } from '@sageslate/stone'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import { resolvers } from '../schema/graphql/resolvers.generated.js'
import { typeDefs } from '../schema/typeDefs.generated.js'
import { configurationToolkit } from '../utils/configuration.js'
import { verifyToken } from '../utils/jsonWebToken.js'

import type { ApolloContext, ConnectedModels } from '../types/apollo.js'
import type { UserInfo } from '../utils/jsonWebToken.js'
import type { Db as Database } from 'mongodb'
import type { AddressInfo } from 'node:net'

export type BootstrapApolloOptions = {
  database: Database
  models: ConnectedModels
}

export async function bootstrapApollo({ database, models }: BootstrapApolloOptions) {
  const configuration = configurationToolkit(database)

  const app = express()
  const httpServer = createServer(app)

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
        models,
        user,
      }
    },
  })

  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })

  await new Promise<void>(resolve => httpServer.listen({ port: process.env.PORT ?? 4000 }, resolve))
  const { port } = httpServer.address() as AddressInfo
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}
