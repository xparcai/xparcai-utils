import { isUndefined } from './isUndefined'

/**
 * 某个数据是否是element类型
 * @param data 某个数据
 * @returns 是否是element类型
 */
export function isElement(data: unknown): data is Element {
  if (isUndefined(data))
    return false
  return data instanceof Element
}
