/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest'
import { isElement } from '../src/isElement'

describe('@xparcai-utils/is', () => {
  it('isElement', () => {
    const div = document.createElement('div')
    const span = document.createElement('span')
    expect(isElement('abc')).toBe(false)
    expect(isElement(div)).toBe(true)
    expect(isElement(span)).toBe(true)
  })
})
