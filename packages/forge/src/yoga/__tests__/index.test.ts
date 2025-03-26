import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('node:http', () => {
  const mockServer = {
    listen: vi.fn((port, callback: () => any) => {
      callback()
      return mockServer
    }),
    handler: undefined as any,
  }

  const createServer = vi.fn(handler => {
    // Store the handler for testing
    mockServer.handler = handler
    return mockServer
  }) as any

  createServer.mockServer = mockServer

  return {
    createServer,
  }
})

vi.mock('../core/index.js', () => {
  const handle = vi.fn()
  const createCoreYoga = vi.fn(() => ({
    handle,
  }))

  return {
    createCoreYoga,
  }
})

import { createServer } from 'node:http'
import { startYogaServer } from '../index.js'
import { createCoreYoga } from '../core/index.js'

describe('startYogaServer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create and start a server on port 3000', async () => {
    const promise = startYogaServer()

    // Test should complete when the server starts listening
    await promise

    expect(createCoreYoga).toHaveBeenCalledOnce()
    expect(createServer).toHaveBeenCalledOnce()
    expect((createServer as any).mockServer.listen).toHaveBeenCalledWith(3000, expect.any(Function))
  })

  it('should route /graphql/core requests to the yoga handler', async () => {
    await startYogaServer()

    const mockReq = { url: '/graphql/core' }
    const mockRes = { writeHead: vi.fn(), end: vi.fn() }

    await (createServer as any).mockServer.handler(mockReq, mockRes)

    expect(createCoreYoga().handle).toHaveBeenCalledWith(mockReq, mockRes)
  })

  it('should return 404 for non-graphql requests', async () => {
    await startYogaServer()

    const mockReq = { url: '/some-other-path' }
    const mockRes = { writeHead: vi.fn(), end: vi.fn() }

    await (createServer as any).mockServer.handler(mockReq, mockRes)

    expect(mockRes.writeHead).toHaveBeenCalledWith(404)
    expect(mockRes.end).toHaveBeenCalledWith('Not Found')
    expect(createCoreYoga().handle).not.toHaveBeenCalled()
  })
})
