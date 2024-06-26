import { isArray } from './isArray'

/**
 * 某个数组是否为空数组
 * @param arr 某个数组
 * @returns 是否为空数组
 */
export function isEmptyArray(arr: unknown): boolean {
  return isArray(arr) && !arr.length
}
