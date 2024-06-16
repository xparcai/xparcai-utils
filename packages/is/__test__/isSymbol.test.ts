import { describe, expect, it } from 'vitest'
import { isSymbol } from '../index'

describe('@xparcai-utils/is', () => {
  it('isSymbol', () => {
    expect(isSymbol(Symbol(1))).toBe(true)
  })
})
