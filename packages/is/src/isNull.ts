import { isType } from './isType'

/**
 * 某个数据是否是null类型
 * @param data 某个数据
 * @returns 是否是null类型
 */
export function isNull(data: unknown): data is null {
  return isType(data, 'Null')
}
