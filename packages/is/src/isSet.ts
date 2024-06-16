import { isType } from './isType'

export function isSet<T>(data: unknown): data is Set<T> {
  return isType(data, 'Set')
}
