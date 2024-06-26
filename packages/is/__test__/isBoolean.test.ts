import { describe, expect, it } from 'vitest'
import { isBoolean } from '../src/isBoolean'

describe('@xparcai-utils/is', () => {
  it('isBoolean', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(!!0)).toBe(true)
    expect(isBoolean(!!1)).toBe(true)
    expect(isBoolean(!undefined)).toBe(true)
    expect(isBoolean(!null)).toBe(true)
  })
})
