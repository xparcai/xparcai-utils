import { describe, expect, it } from 'vitest'
import { isBrowser } from '../src/isBrowser'

describe('@xparcai-utils/is', () => {
  it('isBrowser', () => {
    expect(isBrowser()).toBe(undefined)
  })
})
