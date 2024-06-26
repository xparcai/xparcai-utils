import { isType } from './isType'

/**
 * 某个数据是否是array类型
 * @param data 某个数据
 * @returns 是否是array类型
 */
export function isArray<T>(data: unknown): data is T[] {
  return isType(data, 'Array')
}
