import { isType } from './isType'

/**
 * 某个数据是否是boolean类型
 * @param data 某个数据
 * @returns 是否是boolean类型
 */
export function isBoolean(data: unknown): data is boolean {
  return isType(data, 'Boolean')
}
