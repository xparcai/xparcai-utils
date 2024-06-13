import { describe, expect, it } from 'vitest'
import { add } from '..'

describe('index', () => {
  it('add', () => {
    expect(add(1, 2)).toBe(3)
  })
})
