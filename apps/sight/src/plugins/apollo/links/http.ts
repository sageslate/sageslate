import { createHttpLink } from '@apollo/client/core'

export const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_BASE_URL,
})
