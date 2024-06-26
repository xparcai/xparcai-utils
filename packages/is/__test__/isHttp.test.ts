import { describe, expect, it } from 'vitest'
import { isHttp } from '../src/isHttp'

describe('@xparcai-utils/is', () => {
  it('isHttp', () => {
    expect(isHttp('http://xparcai.com')).toBe(true)
    expect(isHttp('https://xparcai.com', 's')).toBe(true)
    expect(isHttp('http://xparcai.com', '||')).toBe(true)
    expect(isHttp('https://xparcai.com', '||')).toBe(true)

    // 更改默认值
    isHttp.setCondition('s')
    expect(isHttp('http://xparcai.com')).toBe(false)
    expect(isHttp('https://xparcai.com')).toBe(true)

    // 设置默认值调用
    expect(isHttp.setCondition('s')('http://xparcai.com')).toBe(false)
    expect(isHttp.setCondition('s')('https://xparcai.com')).toBe(true)
  })
})
