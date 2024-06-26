import { describe, expect, it } from 'vitest'
import { isEmptyObject } from '../src/isEmptyObject'

describe('@xparcai-utils/is', () => {
  it('isEmptyObject', () => {
    expect(isEmptyObject(undefined)).toBe(false)
    expect(isEmptyObject({})).toBe(true)
  })
})
