import { describe, expect, it } from 'vitest'
import { isUpperCase } from '../src/isUpperCase'

describe('@xparcai-utils/is', () => {
  it('isUpperCase', () => {
    expect(isUpperCase('http://xparcai.com')).toBe(false)
    expect(isUpperCase('XPARCAI')).toBe(true)
  })
})
