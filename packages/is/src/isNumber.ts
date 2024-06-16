import { isType } from './isType'

export function isNumber(data: unknown): data is number {
  return isType(data, 'Number')
}
