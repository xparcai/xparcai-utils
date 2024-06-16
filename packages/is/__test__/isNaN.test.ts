import { describe, expect, it } from 'vitest'
import { isNaN } from '../index'

describe('@xparcai-utils/is', () => {
  it('isNaN', () => {
    expect(isNaN(Number.NaN)).toBe(true)
    expect(isNaN(Number('abc'))).toBe(true)
  })
})
