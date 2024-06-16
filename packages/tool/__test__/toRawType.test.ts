import { describe, expect, it } from 'vitest'
import { toRawType } from '../src/toRawType'

describe('@xparcai-utils/tool', () => {
  it('toRawType', () => {
    expect(toRawType(1)).toBe('Number')
    expect(toRawType('1')).toBe('String')
  })
})
