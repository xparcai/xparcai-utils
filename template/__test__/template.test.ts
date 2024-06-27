import { describe, expect, it } from 'vitest'
import { template } from '../src/template'

describe('vitest module', () => {
  it('template', () => {
    expect(template()).toBe(undefined)
  })
})
