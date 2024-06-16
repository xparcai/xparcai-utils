import { describe, expect, it } from 'vitest'
import { isNumber } from '../index'

describe('@xparcai-utils/is', () => {
  it('isNumber', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(Number.NaN)).toBe(true)
  })
})
