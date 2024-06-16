import { describe, expect, it } from 'vitest'
import { isUndefined } from '../index'

describe('@xparcai-utils/is', () => {
  it('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true)
  })
})
