import { isType } from './isType'

/**
 * 某个数据是否是Map类型
 * @param data 某个数据
 * @returns 是否是Map类型
 */
export function isMap<K, V>(data: unknown): data is Map<K, V> {
  return isType(data, 'Map')
}
