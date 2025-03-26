import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../yoga/index.js', () => ({
  startYogaServer: vi.fn().mockResolvedValue(undefined),
}))

import { startYogaServer } from '../yoga/index.js'

describe('index', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call startYogaServer without arguments', async () => {
    await import('../index.js')

    expect(startYogaServer).toHaveBeenCalledOnce()
    expect(startYogaServer).toHaveBeenCalledWith()
  })
})
