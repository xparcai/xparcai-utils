import { describe, expect, it } from 'vitest'
import { isSymbol } from '../src/isSymbol'

describe('@xparcai-utils/is', () => {
  it('isSymbol', () => {
    expect(isSymbol(Symbol(1))).toBe(true)
  })
})
