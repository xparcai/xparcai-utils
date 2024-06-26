import { isType } from './isType'

/**
 * 某个数据是否是number类型
 * @param data 某个数据
 * @returns 是否是number类型
 */
export function isNumber(data: unknown): data is number {
  return isType(data, 'Number')
}
