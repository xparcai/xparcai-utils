/**
 * 某个数据是否为true
 * @param data 某个数据
 * @returns 是否为true
 */
export function isTrue(data: unknown): data is true {
  return data === true
}
