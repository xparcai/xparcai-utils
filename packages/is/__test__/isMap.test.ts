import { describe, expect, it } from 'vitest'
import { isMap } from '../index'

describe('@xparcai-utils/is', () => {
  it('isMap', () => {
    expect(isMap(new Map())).toBe(true)
  })
})
