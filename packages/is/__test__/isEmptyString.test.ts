import { describe, expect, it } from 'vitest'
import { isEmptyString } from '../src/isEmptyString'

describe('@xparcai-utils/is', () => {
  it('isEmptyString', () => {
    expect(isEmptyString()).toBe(undefined)
  })
})
