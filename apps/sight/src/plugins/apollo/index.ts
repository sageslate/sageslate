import { ApolloClient } from '@apollo/client/core'
import { ApolloClients } from '@vue/apollo-composable'

import { RealmsDocument } from '@/graphql/core'

import { cache } from './cache'
import { createLink } from './links'

import type { RealmsQuery } from '@/graphql/core'
import type { NormalizedCacheObject } from '@apollo/client/core'
import type { App } from 'vue'

const coreApolloClient = new ApolloClient({
  link: createLink('core'),
  cache,
})

const { data } = await coreApolloClient.query<RealmsQuery>({
  query: RealmsDocument,
})

export function apollo(app: App) {
  const clients: Record<string, ApolloClient<NormalizedCacheObject>> = { default: coreApolloClient }

  for (const realm of data.realms) {
    clients[realm.id] = new ApolloClient({
      link: createLink(realm.id),
      cache,
      name: realm.name,
    })
  }

  app.provide(ApolloClients, clients)
}
