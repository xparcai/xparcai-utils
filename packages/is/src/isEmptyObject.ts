import { isObject } from './isObject'

/**
 * 某个对象是否为空对象
 * @param object 某个对象
 * @returns 是否为空对象
 */
export function isEmptyObject(obj: unknown): boolean {
  return isObject(obj) && Reflect.ownKeys(obj as object).length === 0
}
