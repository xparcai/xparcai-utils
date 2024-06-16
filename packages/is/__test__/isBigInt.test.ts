import { describe, expect, it } from 'vitest'
import { isBigInt } from '../index'

describe('@xparcai-utils/is', () => {
  it('isBigInt', () => {
    expect(isBigInt(BigInt(1))).toBe(true)
    expect(isBigInt(1)).toBe(false)
    expect(isBigInt(1n)).toBe(true)
  })
})
