import { describe, expect, it } from 'vitest'
import { isPromise } from '../src/isPromise'

describe('@xparcai-utils/is', () => {
  it('isPromise', () => {
    expect(isPromise(new Promise(() => {}))).toBe(true)
  })
})
