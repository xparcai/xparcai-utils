import { isType } from './isType'

/**
 * 某个数据是否是RegExp类型
 * @param data 某个数据
 * @returns 是否是RegExp类型
 */
export function isRegExp(data: unknown): data is RegExp {
  return isType(data, 'RegExp')
}
