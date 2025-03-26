import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('graphql-yoga', () => ({
  createYoga: vi.fn().mockReturnValue({ mock: 'yoga-instance' }),
  createSchema: vi.fn().mockReturnValue({ mock: 'schema' }),
}))

vi.mock('../schema/resolvers.generated.js', () => ({
  resolvers: { mock: 'resolvers' },
}))

vi.mock('../schema/typeDefs.generated.js', () => ({
  typeDefs: { mock: 'typeDefs' },
}))

import { createYoga, createSchema } from 'graphql-yoga'

import { createCoreYoga } from '../index.js'
import { resolvers } from '../schema/resolvers.generated.js'
import { typeDefs } from '../schema/typeDefs.generated.js'

describe('createCoreYoga', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create a yoga instance with the correct configuration', () => {
    const result = createCoreYoga()

    expect(createSchema).toHaveBeenCalledOnce()
    expect(createSchema).toHaveBeenCalledWith({ typeDefs, resolvers })

    expect(createYoga).toHaveBeenCalledOnce()
    expect(createYoga).toHaveBeenCalledWith({
      schema: { mock: 'schema' },
      graphqlEndpoint: '/graphql/core',
    })

    expect(result).toEqual({ mock: 'yoga-instance' })
  })
})
