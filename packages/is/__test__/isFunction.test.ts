import { describe, expect, it, vi } from 'vitest'
import { isFunction } from '../src/isFunction'

describe('@xparcai-utils/is', () => {
  it('isFunction', () => {
    expect(isFunction(vi.fn())).toBe(true)
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(new Function())).toBe(true)
  })
})
