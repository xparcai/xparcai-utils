import { describe, expect, it } from 'vitest'
import { template } from '../src/template'

describe('@xparcai-utils/string', () => {
  const nmtp = 'hello {0}, {1}好！'
  const jmtp = 'hello {name}, {time}好！'

  it('template', () => {
    expect(template(nmtp, 'xparcai', '早上')).toBe('hello xparcai, 早上好！')
    expect(template(jmtp, { name: 'xparcai', time: '早上' })).toBe('hello xparcai, 早上好！')
    expect(template(jmtp, { name: 'xparcai' }, '晚上')).toBe('hello xparcai, 晚上好！')
    expect(template(jmtp, key => (key !== 'time' ? { time: '中午' } : { name: 'xparcai' }))).toBe('hello name, time好！')
    expect(template(jmtp, key => (key === 'time' ? { time: '中午' } : {}), '[xparcai]')).toBe('hello [xparcai], 中午好！')
    expect(template(jmtp, () => ({}), 'xparcai')).toBe('hello xparcai, xparcai好！')
  })
})
