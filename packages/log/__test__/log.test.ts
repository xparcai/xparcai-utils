import { describe, expect, it } from 'vitest'
import { log } from '../src/log'

describe('@xparcai-utils/log', () => {
  it('log.info', () => {
    expect(log.info('info头部', 'info内容'))
  })
  it('log.warning', () => {
    expect(log.warning('warning头部', 'warning内容'))
  })
  it('log.success', () => {
    expect(log.success('success头部', 'success内容'))
  })
  it('log.picture', () => {
    expect(log.picture('https://cdn.wwads.cn/creatives/g8PYzZVx4gEYWkNxKb1ncQWxYas6WJFIsuu29iT5.png', 1))
  })
  it('log.table', () => {
    const data = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 }
    ]
    const columns = [
      {
          title: 'ID',
          key: 'id'
      },
      {
          title: '名字',
          key: 'name'
      },
      {
          title: '年龄',
          key: 'age'
      },
    ]
    expect(log.table(data, columns))
  })
})
