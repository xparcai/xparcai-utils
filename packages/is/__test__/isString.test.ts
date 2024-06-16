import { describe, expect, it } from 'vitest'
import { isString } from '../index'

describe('@xparcai-utils/is', () => {
  it('isString', () => {
    expect(isString('1')).toBe(true)
  })
})
