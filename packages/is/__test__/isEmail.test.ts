import { describe, expect, it } from 'vitest'
import { isEmail } from '../src/isEmail'

describe('@xparcai-utils/is', () => {
  it('isEmail', () => {
    expect(isEmail('abc')).toBe(false)
    expect(isEmail('10667379@qq.com')).toBe(true)
    expect(isEmail('hi@vtrbo.cn')).toBe(true)
  })
})
