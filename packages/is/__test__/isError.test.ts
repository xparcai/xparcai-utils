import { describe, expect, it } from 'vitest'
import { isError } from '../src/isError'

describe('@xparcai-utils/is', () => {
  it('isError', () => {
    expect(isError(new Error())).toBe(true)
  })
})
