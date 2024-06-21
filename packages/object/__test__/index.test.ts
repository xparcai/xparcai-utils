import { describe, expect, it } from 'vitest'
import { deepCopy } from '..'

describe('@xparcai-utils/object', () => {
  it('deepCopy', () => {
    // const obj = { asd: 'zxc', qwe: '123' }
    const arr = [1,2,4]
    expect(deepCopy(arr)).toMatchInlineSnapshot(`
      Array {
        "0": 1,
        "1": 2,
        "2": 4,
      }
    `)
  })
})
