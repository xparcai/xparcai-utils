import { isArray, isDate, isObject, isRegExp } from '@xparcai-utils/is'

/**
 * 深拷贝某个数据
 * @param {T} data 某个数据
 * @returns {T} 拷贝后的数据
 */
export function deepCopy<T>(data: T): T

/**
 * 深拷贝某个数据
 * @param {T} data 某个数据
 * @param {H extends object} [hash] 解决循环依赖传入的记录对象
 * @returns {T} 拷贝后的数据
 */
export function deepCopy<T, H extends object>(data: T, hash?: H): T

/**
 * 深拷贝实现
 */
export function deepCopy<T>(data: T, hash: any = new WeakMap()): T {
  // 日期对象直接返回一个新的日期对象
  if (isDate(data)) {
    return new Date(data) as T
  }
  // 正则对象直接返回一个新的正则对象
  if (isRegExp(data)) {
    return new RegExp(data) as T
  }
  // 数组和对象
  if (isArray(data) || isObject(data)) {
    // 如果循环引用,就用 weakMap 来解决
    if (hash.has(data)) {
      return hash.get(data)
    }
    const _data: any = isArray(data) ? [] : {}
    hash.set(data, _data)
    for (const key of Reflect.ownKeys(data as object)) {
      if (isObject((data as any)[key])) {
        _data[key] = deepCopy((data as any)[key], hash)
      }
      else {
        _data[key] = (data as any)[key]
      }
    }
    return _data
  }
  // 基本数据类型
  return data
}
