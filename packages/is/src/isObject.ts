import { isType } from './isType'

/**
 * 某个数据是否是object类型
 * @param data 某个数据
 * @returns 是否是object类型
 */
export function isObject<T>(data: unknown): data is T {
  return isType(data, 'Object')
}
