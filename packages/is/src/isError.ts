import { isType } from './isType'

/**
 * 某个数据是否为Error类型
 * @param data 某个数据
 * @returns 是否为Error类型
 */
export function isError(data: unknown): boolean {
  return isType(data, 'Error')
}
