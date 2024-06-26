import { isFunction } from './isFunction'

/**
 * 某个数据/方法是否是Promise
 * @param data 某个数据/方法
 * @returns 是否是Promise
 */
export function isPromise<T>(data: unknown): data is Promise<T> {
  return (
    !!data
    && isFunction((data as any).then)
    && isFunction((data as any).catch)
  )
}
