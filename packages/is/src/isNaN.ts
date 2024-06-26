/**
 * 某个数据是否是NaN
 * @param data 某个数据
 * @returns 是否是NaN
 */
export function isNaN(data: unknown): data is number {
  return Number.isNaN(data)
}
