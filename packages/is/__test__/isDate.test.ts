import { describe, expect, it } from 'vitest'
import { isDate } from '../index'

describe('@xparcai-utils/is', () => {
  it('isDate', () => {
    expect(isDate(new Date())).toBe(true)
  })
})
