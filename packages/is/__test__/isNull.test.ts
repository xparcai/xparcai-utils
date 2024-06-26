import { describe, expect, it } from 'vitest'
import { isNull } from '../src/isNull'

describe('@xparcai-utils/is', () => {
  it('isNull', () => {
    expect(isNull(null)).toBe(true)
  })
})
