import { describe, expect, it } from 'vitest'
import { isEmptyArray } from '../src/isEmptyArray'

describe('@xparcai-utils/is', () => {
  it('isEmptyArray', () => {
    expect(isEmptyArray(undefined)).toBe(false)
    expect(isEmptyArray([])).toBe(true)
    expect(isEmptyArray([1])).toBe(false)
  })
})
