import { isType } from './isType'

/**
 * 某个数据是否是string类型
 * @param data 某个数据
 * @returns 是否是string类型
 */
export function isString(data: unknown): data is string {
  return isType(data, 'String')
}
