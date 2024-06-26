import { describe, expect, it } from 'vitest'
import { isMobile } from '..'

describe('@xparcai-utils/is', () => {
  it('isMobile', () => {
    expect(isMobile('12345678910')).toBe(false)
    expect(isMobile('13523456789')).toBe(true)
  })
})
