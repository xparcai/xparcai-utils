/**
 * 某个数据是否为false
 * @param data 某个数据
 * @returns 是否为false
 */
export function isFalse(data: unknown): data is false {
  return data === false
}
