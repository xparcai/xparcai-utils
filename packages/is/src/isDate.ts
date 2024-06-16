import { isType } from './isType'

export function isDate(data: unknown): data is Date {
  return isType(data, 'Date')
}
