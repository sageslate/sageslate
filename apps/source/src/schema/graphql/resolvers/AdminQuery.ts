import type { AdminQueryResolvers } from './../../types.generated.js'

export const AdminQuery: AdminQueryResolvers = {
  /* Implement AdminQuery resolver logic here */
  isAuthenticated: () => {
    /* AdminQuery.isAuthenticated resolver is required because AdminQuery.isAuthenticated exists but AdminQueryMapper.isAuthenticated does not */
  },
  isInitialized: (_, __, { configuration }) => {
    return configuration.isInitialized()
  },
}
