import { describe, expect, it } from 'vitest'
import { isUndefined } from '../src/isUndefined'

describe('@xparcai-utils/is', () => {
  it('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(void 0)).toBe(true)
  })
})
