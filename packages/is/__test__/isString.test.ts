import { describe, expect, it } from 'vitest'
import { isString } from '../src/isString'

describe('@xparcai-utils/is', () => {
  it('isString', () => {
    expect(isString('1')).toBe(true)
  })
})
