import { describe, expect, it } from 'vitest'

import { _empty as _empty_ } from '../_empty.js'

const _empty = _empty_ as () => string

describe('_empty', () => {
  it('should return "_empty"', () => {
    const result = _empty()
    expect(result).toBe('_empty')
  })
})
