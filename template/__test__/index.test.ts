import { describe, expect, it } from 'vitest'
import { add } from '..'

describe('vitest module', () => {
  it('add', () => {
    expect(add(1, 2)).toBe(3)
  })
})
