import { describe, expect, it } from 'vitest'
import { isEmptyString } from '../src/isEmptyString'

describe('@xparcai-utils/is', () => {
  it('isEmptyString', () => {
    expect(isEmptyString(1)).toBe(false)
    // 这里的单测没有通过，预期应该是true，但得到了false
    expect(isEmptyString('')).toBe(true)
  })
})
