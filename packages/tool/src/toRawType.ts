/**
 * 获取某个数据的原始类型
 * @param data 某个数据
 * @returns 原始类型
 */
export function toRawType(data: unknown): string {
  return Object.prototype.toString.call(data).slice(8, -1)
}
