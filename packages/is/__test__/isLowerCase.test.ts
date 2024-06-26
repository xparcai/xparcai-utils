import { describe, expect, it } from 'vitest'
import { isLowerCase } from '../src/isLowerCase'

describe('@xparcai-utils/is', () => {
  it('isLowerCase', () => {
    expect(isLowerCase('http://xparcai.com')).toBe(false)
    expect(isLowerCase('xparcai')).toBe(true)
  })
})
