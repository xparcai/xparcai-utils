import { describe, expect, it } from 'vitest'
import { isMap } from '../src/isMap'

describe('@xparcai-utils/is', () => {
  it('isMap', () => {
    expect(isMap(new Map())).toBe(true)
    expect(isMap(new WeakMap())).toBe(false)
  })
})
