import { describe, expect, it } from 'vitest'
import { toRawType } from '../index'

describe('@xparcai-utils/tool', () => {
  it('toRawType', () => {
    expect(toRawType(1)).toBe('Number')
    expect(toRawType('1')).toBe('String')
  })
})
