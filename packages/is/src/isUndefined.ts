import { isType } from './isType'

export function isUndefined(data: unknown): data is undefined {
  return isType(data, 'Undefined')
}
