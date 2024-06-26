import { describe, expect, it } from 'vitest'
import { isRegExp } from '../src/isRegExp'

describe('@xparcai-utils/is', () => {
  it('isRegExp', () => {
    expect(isRegExp(new RegExp('a'))).toBe(true)
  })
})
