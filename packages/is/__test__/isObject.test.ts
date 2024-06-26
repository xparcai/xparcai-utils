import { describe, expect, it } from 'vitest'
import { isObject } from '../src/isObject'

describe('@xparcai-utils/is', () => {
  it('isObject', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject(null)).toBe(false)
  })
})
