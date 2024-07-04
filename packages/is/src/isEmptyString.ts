import { isString } from './isString'

/**
 * 某个字符串是否为空字符串
 * @param str 某个字符串
 * @returns 是否为空字符串
 */
export function isEmptyString(str: unknown): boolean {
  return isString(str) && str !== ''
}
