import type { QueryResolvers } from './../../../types.generated.js'

export const isInitialized: NonNullable<QueryResolvers['isInitialized']> = (_parent, _argument, { configuration }) => {
  return configuration.isInitialized()
}
