import { isType } from './isType'

export function isBigInt(data: unknown): data is bigint {
  return isType(data, 'BigInt')
}
