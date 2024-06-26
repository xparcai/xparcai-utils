import { describe, expect, it } from 'vitest'
import { isIDCard } from '../src/isIDCard'

describe('@xparcai-utils/is', () => {
  it('isIDCard', () => {
    expect(isIDCard('410224950512034')).toBe(true)
    expect(isIDCard('4102249505120')).toBe(false)
    expect(isIDCard('410224199803120318')).toBe(false)
  })
})
