import { createYoga, createSchema } from 'graphql-yoga'

import { resolvers } from './schema/resolvers.generated.js'
import { typeDefs } from './schema/typeDefs.generated.js'

export function createCoreYoga() {
  return createYoga({ schema: createSchema({ typeDefs, resolvers }), graphqlEndpoint: '/graphql/core' })
}
