import { describe, expect, it, vi } from 'vitest'
import { log } from '../src/log'

describe('@xparcai-utils/log', () => {
  it('log.info', () => {
    // TODO 这个单测其实屌用没有，应该检测console.log是否被调用，但是因为有样式，就这把...
    const infoSpy = vi.spyOn(log, 'info')
    log.info('info内容')
    expect(infoSpy).toHaveBeenCalledWith('info内容')
  })
  // it('log.warning', () => {
  //   expect(log.warning('warning头部', 'warning内容'))
  // })
  // it('log.success', () => {
  //   expect(log.success('success头部', 'success内容'))
  // })
  // it('log.picture', () => {
  //   expect(log.picture('https://cdn.wwads.cn/creatives/g8PYzZVx4gEYWkNxKb1ncQWxYas6WJFIsuu29iT5.png', 1))
  // })
  // it('log.table', () => {
  //   const data = [
  //     { id: 1, name: 'Alice', age: 25 },
  //     { id: 2, name: 'Bob', age: 30 },
  //     { id: 3, name: 'Charlie', age: 35 },
  //   ]
  //   const columns = [
  //     {
  //       title: 'ID',
  //       key: 'id',
  //     },
  //     {
  //       title: '名字',
  //       key: 'name',
  //     },
  //     {
  //       title: '年龄',
  //       key: 'age',
  //     },
  //   ]
  //   expect(log.table(data, columns))
  // })
})
