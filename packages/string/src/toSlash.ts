/**
 * 反 \ 转换为 /
 * @param str 字符串
 * @returns 转换后的字符串
 */
export function toSlash(str: string): string {
  return str.replace(/\\/g, '/')
}
