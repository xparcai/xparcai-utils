import { isType } from './isType'

/**
 * 某个数据是否是bigint类型
 * @param data 某个数据
 * @returns 是否是bigint类型
 */
export function isBigInt(data: unknown): data is bigint {
  return isType(data, 'BigInt')
}
