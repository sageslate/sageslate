import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { resolvers } from '../schema/resolvers.generated'
import { typeDefs } from '../schema/typeDefs.generated'

import type { ApolloContext } from '../types/apollo'
import type { Db as Database } from 'mongodb'

export type BootstrapApolloOptions = {
  database: Database
}

export async function bootstrapApollo({ database }: BootstrapApolloOptions) {
  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    // eslint-disable-next-line @typescript-eslint/require-await
    context: async () => ({ database }),
  })

  console.log(`🚀  Server ready at: ${url}`)
}