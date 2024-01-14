import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { resolvers } from '../schema/graphql/resolvers.generated.js'
import { typeDefs } from '../schema/typeDefs.generated.js'
import { configurationToolkit } from '../utils/configuration.js'

import type { ApolloContext } from '../types/apollo.js'
import type { Db as Database } from 'mongodb'

export type BootstrapApolloOptions = {
  database: Database
}

export async function bootstrapApollo({ database }: BootstrapApolloOptions) {
  const configuration = configurationToolkit(database)

  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    // eslint-disable-next-line @typescript-eslint/require-await
    context: async () => ({ database, configuration }),
  })

  console.log(`🚀  Server ready at: ${url}`)
}
