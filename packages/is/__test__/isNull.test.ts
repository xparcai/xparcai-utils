import { describe, expect, it } from 'vitest'
import { isNull } from '../index'

describe('@xparcai-utils/is', () => {
  it('isNull', () => {
    expect(isNull(null)).toBe(true)
  })
})
