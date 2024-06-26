import { isType } from './isType'

/**
 * 某个数据是否是Date类型
 * @param data 某个数据
 * @returns 是否是Date类型
 */
export function isDate(data: unknown): data is Date {
  return isType(data, 'Date')
}
