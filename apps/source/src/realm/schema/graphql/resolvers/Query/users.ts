import type { QueryResolvers } from './../../../types.generated.js'

export const users: NonNullable<QueryResolvers['users']> = (_parent, _argument, _context) => {
  return [
    {
      id: 'id',
      username: 'username',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}
