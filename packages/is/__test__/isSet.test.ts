import { describe, expect, it } from 'vitest'
import { isSet } from '../index'

describe('@xparcai-utils/is', () => {
  it('isSet', () => {
    expect(isSet(new Set())).toBe(true)
  })
})
