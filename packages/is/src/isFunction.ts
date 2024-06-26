import { isType } from './isType'

/**
 * 某个数据/方法是否是function类型
 * @param data 某个数据/方法
 * @returns 是否是function类型
 */
export function isFunction<T>(data: unknown): data is T extends Function ? T : Function {
  return isType(data, 'Function')
}
