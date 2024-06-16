import { isType } from './isType'

export function isBoolean(data: unknown): data is boolean {
  return isType(data, 'Boolean')
}
