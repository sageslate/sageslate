import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { resolvers } from '../schema/resolvers.generated'
import { typeDefs } from '../schema/typeDefs.generated'

import type { ApolloContext } from '../types/apollo'

export async function bootstrapApollo() {
  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    // eslint-disable-next-line @typescript-eslint/require-await
    context: async () => ({ hello: 'world' }),
  })

  console.log(`🚀  Server ready at: ${url}`)
}
