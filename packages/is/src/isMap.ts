import { isType } from './isType'

export function isMap<K, V>(data: unknown): data is Map<K, V> {
  return isType(data, 'Map')
}
