import { describe, expect, it } from 'vitest'
import { isType } from '..'

describe('@xparcai-utils/is', () => {
  it('isType', () => {
    expect(isType(1, 'Number')).toBe(true)
  })
})
