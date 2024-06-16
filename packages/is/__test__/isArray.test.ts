import { describe, expect, it } from 'vitest'
import { isArray } from '../index'

describe('@xparcai-utils/is', () => {
  it('isArray', () => {
    expect(isArray([])).toBe(true)
  })
})
