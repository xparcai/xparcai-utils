/**
 * 某个字符串是否为纯小写
 * @param str 某个字符串
 * @returns 是否为纯小写
 */
export function isLowerCase(str: string): boolean {
  const reg = /^[a-z]+$/
  return reg.test(str)
}
