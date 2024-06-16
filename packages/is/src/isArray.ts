import { isType } from './isType'

export function isArray<T>(data: unknown): data is T[] {
  return isType(data, 'Array')
}
