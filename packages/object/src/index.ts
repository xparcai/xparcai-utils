/**
 * @func deepCopy
 * @param {object} obj 将要复制的对象
 * @param {string} hash  哈希值
 * @returns {object} 复制后的对象
 * @desc 深拷贝对象
 */
export function deepCopy(obj: object, hash: any = new WeakMap()): object {
  // 日期对象直接返回一个新的日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }
  // 正则对象直接返回一个新的正则对象
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  // 如果循环引用,就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  // 获取对象所有自身属性的描述
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
  hash.set(obj, cloneObj)
  for (let key of Reflect.ownKeys(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      cloneObj[key] = deepCopy(obj[key], hash);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj
}
