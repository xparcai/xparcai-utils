import { isType } from './isType'

export function isFunction<T extends Function>(data: unknown): data is T {
  return isType(data, 'Function')
}
