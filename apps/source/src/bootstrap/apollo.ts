import { createServer } from 'node:http'

import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import { resolvers } from '../schema/graphql/resolvers.generated.js'
import { typeDefs } from '../schema/typeDefs.generated.js'
import { configurationToolkit } from '../utils/configuration.js'

import type { ApolloContext } from '../types/apollo.js'
import type { Db as Database } from 'mongodb'
import type { AddressInfo } from 'node:net'

export type BootstrapApolloOptions = {
  database: Database
}

export async function bootstrapApollo({ database }: BootstrapApolloOptions) {
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
    context: ({ req, res }) => {
      return {
        req,
        res,
        database,
        configuration,
      }
    },
  })

  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })

  await new Promise<void>(resolve => httpServer.listen({ port: process.env.PORT ?? 4000 }, resolve))
  const { port } = httpServer.address() as AddressInfo
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}
