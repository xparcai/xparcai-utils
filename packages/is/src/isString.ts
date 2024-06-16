import { isType } from './isType'

export function isString(data: unknown): data is string {
  return isType(data, 'String')
}
