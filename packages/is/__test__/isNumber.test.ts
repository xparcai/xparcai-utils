import { describe, expect, it } from 'vitest'
import { isNumber } from '../src/isNumber'

describe('@xparcai-utils/is', () => {
  it('isNumber', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(Number.NaN)).toBe(true)
    expect(isNumber(BigInt(1))).toBe(false)
    expect(isNumber(1n)).toBe(false)
  })
})
