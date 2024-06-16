import { describe, expect, it } from 'vitest'
import { isPromise } from '../index'

describe('@xparcai-utils/is', () => {
  it('isPromise', () => {
    expect(isPromise(new Promise(() => {}))).toBe(true)
  })
})
