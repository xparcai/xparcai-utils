/**
 * 某个字符串是否为纯大写
 * @param str 某个字符串
 * @returns 是否为纯大写
 */
export function isUpperCase(str: string): boolean {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}
