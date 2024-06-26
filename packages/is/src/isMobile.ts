/**
 * 某个数据是否为手机号
 * @param data 某个数据
 * @returns 是否为手机号
 */
export function isMobile(data: string) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(data)
}
