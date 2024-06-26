import { describe, expect, it } from 'vitest'
import { deepCopy } from '../src/deepCopy'

describe('@xparcai-utils/object', () => {
  it('deepCopy: 复制基本类型', () => {
    let data: any = 666
    expect(deepCopy(data)).toBe(data)
    data = 'xparcai'
    expect(deepCopy(data)).toBe(data)
    data = false
    expect(deepCopy(data)).toBe(data)
    data = null
    expect(deepCopy(data)).toBeNull()
    data = undefined
    expect(deepCopy(data)).toBeUndefined()
  })

  it('deepCopy: 复制数组', () => {
    const data: any = ['0.0.1', '0.0.2']
    expect(deepCopy(data)).toEqual(data)
    expect(deepCopy(data)).not.toBe(data)
    data.push(data)
    expect(deepCopy(data)).toEqual(data)
    expect(deepCopy(data)).not.toBe(data)
    expect(deepCopy(data)[2]).toEqual(data[2])
  })

  it('deepCopy: 复制对象', () => {
    const data: any = {
      name: 'xparcai',
      regexp: new RegExp('xparcai'),
      version: 1,
    }
    expect(deepCopy(data)).toEqual(data)
    expect(deepCopy(data)).not.toBe(data)
    data.data = data
    expect(deepCopy(data)).toEqual(data)
    expect(deepCopy(data)).not.toBe(data)
    expect(deepCopy(data).data).toEqual(data.data)
  })

  it('deepCopy: 复制函数', () => {
    let data: any = function () {}
    expect(deepCopy(data)).toBe(data)
    data = () => {}
    expect(deepCopy(data)).toBe(data)
    // ......
  })
})
