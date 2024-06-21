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
  // let _desc: any
  // let _data: any
  if (isArray(data) || isObject(data)) {
    // 如果循环引用,就用 weakMap 来解决
    if (hash.has(data)) {
      return hash.get(data)
    }
    // // 获取对象所有自身属性的描述
    // _desc = Object.getOwnPropertyDescriptors(data)
    // // 遍历传入参数所有键的特性
    // _data = Object.create(Object.getPrototypeOf(data), _desc)
    // hash.set(data, _data)
  }
  // 数组对象返回一个深拷贝的数组对象
  if (isArray(data)) {
    const _arr: any = []
    for (const key in data)
      _arr.push(deepCopy(data[key], hash))
    return _arr
  }
  // 对象返回深拷贝的对象
  if (isObject(data)) {
    const _obj: any = {}
    for (const key in data)
      _obj[key] = deepCopy(data[key], hash)
    return _obj
  }
  // 基本数据类型
  return data
}
