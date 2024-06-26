/**
 * 某个数据是否为邮箱
 * @param email 某个数据
 * @returns 是否为邮箱
 */
export function isEmail(email: string) {
  const reg
    = /^(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*|".+")@(?:\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]|(?:[a-z\-0-9]+\.)+[a-z]{2,})$/i
  return reg.test(email)
}
