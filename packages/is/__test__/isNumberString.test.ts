import { describe, expect, it } from 'vitest'
import { isNumberString } from '../src/isNumberString'

describe('@xparcai-utils/is', () => {
  it('isNumberString', () => {
    expect(isNumberString('abc')).toBe(false)
    expect(isNumberString('0.95')).toBe(true)
    expect(isNumberString('255')).toBe(true)
    expect(isNumberString('255.323928392')).toBe(true)
    expect(isNumberString('0000')).toBe(false)
    expect(isNumberString('0.00')).toBe(true)
    expect(isNumberString('00.00')).toBe(false)
  })
})
