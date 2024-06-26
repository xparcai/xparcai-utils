import { isFunction } from './isFunction'
import { isObject } from './isObject'

/**
 * 某个数据/方法是否是Promise
 * @param data 某个数据/方法
 * @returns 是否是Promise
 */
export function isPromise<T>(data: unknown): data is Promise<T> {
  return (
    isObject<{ then: Function, catch: Function }>(data)
    && isFunction(data.then)
    && isFunction(data.catch)
  )
}
