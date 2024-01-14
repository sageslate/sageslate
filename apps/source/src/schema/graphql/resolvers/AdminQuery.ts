import type { AdminQueryResolvers } from './../../types.generated'
export const AdminQuery: AdminQueryResolvers = {
  isAuthenticated: () => {
    /* AdminQuery.isAuthenticated resolver is required because AdminQuery.isAuthenticated exists but AdminQueryMapper.isAuthenticated does not */
  },
  isInitialized: async (_, __, { database }) => {
    return database.listCollections({ name: 'configuration' }).hasNext()
  },
}
