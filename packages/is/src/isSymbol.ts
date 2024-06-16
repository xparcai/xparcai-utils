import { isType } from './isType'

export function isSymbol(data: unknown): data is symbol {
  return isType(data, 'Symbol')
}
