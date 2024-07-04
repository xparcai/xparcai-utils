/**
 * 是否是浏览器环境
 * @returns 是否是浏览器环境
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}
