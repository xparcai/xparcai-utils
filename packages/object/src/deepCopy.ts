import { isArray, isDate, isObject, isRegExp } from '@xparcai-utils/is'

/**
 * @func deepCopy
 * @param {T} data 将要复制的对象
 * @returns {T} 复制后的对象
 * @desc 深拷贝对象
 */
export function deepCopy<T>(data: T): T
/**
 * @func deepCopy
 * @param {T} data 将要复制的对象
 * @param {H extends object} [hash]  记录已复制过对象的哈希值
 * @returns {T} 复制后的对象
 * @desc 深拷贝对象
 */
export function deepCopy<T, H extends object>(data: T, hash?: H): T
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
    // 获取对象所有自身属性的描述
    const _desc = Object.getOwnPropertyDescriptors(data)
    // 遍历传入参数所有键的特性
    const _data = Object.create(Object.getPrototypeOf(data), _desc)
    hash.set(data, _data)
    for (const key of Reflect.ownKeys(data as object)) {
      if (isArray((data as any)[key]) || isObject((data as any)[key])) {
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
