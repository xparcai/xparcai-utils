import { isType } from './isType'

export function isRegExp(data: unknown): data is RegExp {
  return isType(data, 'RegExp')
}
