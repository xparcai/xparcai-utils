import { describe, expect, it } from 'vitest'
import { isDate } from '../src/isDate'

describe('@xparcai-utils/is', () => {
  it('isDate', () => {
    expect(isDate(new Date())).toBe(true)
  })
})
