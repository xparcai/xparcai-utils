import { describe, expect, it } from 'vitest'
import { isArray } from '../src/isArray'

describe('@xparcai-utils/is', () => {
  it('isArray', () => {
    expect(isArray([])).toBe(true)
  })
})
