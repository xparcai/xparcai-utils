/**
 * 某个字符串是否为数字字符串
 * @param str 某个字符串
 * @returns 是否为数字字符串
 */
export function isNumberString(str: string): boolean {
  return /^[+-]?(?:0|[1-9]\d*)(?:\.\d+)?$/.test(str)
}
