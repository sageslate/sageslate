import { ApolloClient } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

import { cache } from './cache'
import { link } from './links'

import type { App } from 'vue'

const apolloClient = new ApolloClient({
  link,
  cache,
})

export function apollo(app: App) {
  app.provide(DefaultApolloClient, apolloClient)
}
