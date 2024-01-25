import { createHttpLink as apolloCreateHttpLink } from '@apollo/client/core'

const { VITE_API_BASE_URL } = import.meta.env

const base = VITE_API_BASE_URL ?? `${location.origin}/graphql`

export function createHttpLink(serverId: string) {
  return apolloCreateHttpLink({
    uri: `${base}/${serverId}`,
  })
}
