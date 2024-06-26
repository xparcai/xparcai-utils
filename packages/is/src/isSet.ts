import { isType } from './isType'

/**
 * 某个数据是否是Set类型
 * @param data 某个数据
 * @returns 是否是Set类型
 */
export function isSet<T>(data: unknown): data is Set<T> {
  return isType(data, 'Set')
}
