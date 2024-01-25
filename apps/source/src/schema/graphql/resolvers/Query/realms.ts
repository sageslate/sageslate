import type { QueryResolvers } from './../../../types.generated.js'

export const realms: NonNullable<QueryResolvers['realms']> = async (_parent, _argument, { models }) => {
  return models.realm.find().toArray()
}
