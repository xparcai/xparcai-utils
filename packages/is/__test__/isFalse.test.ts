import { describe, expect, it } from 'vitest'
import { isFalse } from '../index'

describe('@xparcai-utils/is', () => {
  it('isFalse', () => {
    expect(isFalse(false)).toBe(true)
    expect(isFalse(0)).toBe(false)
    expect(isFalse(void 0)).toBe(false)
    expect(isFalse(null)).toBe(false)
    expect(isFalse(undefined)).toBe(false)
  })
})
