import { isType } from './isType'

/**
 * 某个数据是否是undefined类型
 * @param data 某个数据
 * @returns 是否是undefined类型
 */
export function isUndefined(data: unknown): data is undefined {
  return isType(data, 'Undefined')
}
