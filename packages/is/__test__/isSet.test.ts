import { describe, expect, it } from 'vitest'
import { isSet } from '../src/isSet'

describe('@xparcai-utils/is', () => {
  it('isSet', () => {
    expect(isSet(new Set())).toBe(true)
  })
})
