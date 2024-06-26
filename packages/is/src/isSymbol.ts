import { isType } from './isType'

/**
 * 某个数据是否是symbol类型
 * @param data 某个数据
 * @returns 是否是symbol类型
 */
export function isSymbol(data: unknown): data is symbol {
  return isType(data, 'Symbol')
}
