import { isType } from './isType'

export function isObject<T>(data: unknown): data is T {
  return isType(data, 'Object')
}
