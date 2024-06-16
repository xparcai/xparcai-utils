import { describe, expect, it } from 'vitest'
import { isTrue } from '../index'

describe('@xparcai-utils/is', () => {
  it('isTrue', () => {
    expect(isTrue(true)).toBe(true)
    expect(isTrue(1)).toBe(false)
  })
})
