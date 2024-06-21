import { describe, expect, it } from 'vitest'
import { deepCopy } from '..'

describe('@xparcai-utils/object', () => {
  it('deepCopy: 复制基本类型', () => {
    let data: any = 666
    expect(deepCopy(data)).toStrictEqual(data)
    data = 'xparcai'
    expect(deepCopy(data)).toStrictEqual(data)
    data = false
    expect(deepCopy(data)).toStrictEqual(data)
    // ......
  })

  it('deepCopy: 复制数组', () => {
    const data: any = ['0.0.1', '0.0.2']
    expect(deepCopy(data)).toStrictEqual(data)
    data.push([...data])
    expect(deepCopy(data)).toStrictEqual(data)
    data.push({
      name: 'xparcai',
      data: new Date(),
      regexp: new RegExp('xparcai'),
      version: 1,
      changeLog: ['0.0.1', '0.0.2'],
    })
    // ......
  })

  it('deepCopy: 复制对象', () => {
    const data: any = {
      name: 'xparcai',
      data: new Date(),
      regexp: new RegExp('xparcai'),
      version: 1,
      changeLog: ['0.0.1', '0.0.2'],
    }
    expect(deepCopy(data)).toStrictEqual(data)
    data.inner = { ...data }
    expect(deepCopy(data)).toStrictEqual(data)
    // ......
  })

  it('deepCopy: 复制函数', () => {
    let data: any = function () {
      return ''
    }
    expect(deepCopy(data)).toStrictEqual(data)
    data = () => {}
    expect(deepCopy(data)).toStrictEqual(data)
    // ......
  })
})
