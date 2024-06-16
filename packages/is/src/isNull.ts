import { isType } from './isType'

export function isNull(data: unknown): data is null {
  return isType(data, 'Null')
}
