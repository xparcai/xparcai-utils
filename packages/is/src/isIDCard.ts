/**
 * 身份证15位编码规则：dddddd yymmdd xx p
 * dddddd：6位地区编码
 * yymmdd: 出生两位年月日
 * xx: 顺序编码，系统产生，无法确定
 * p: 性别，奇数为男，偶数为女
 *
 * 身份证18位编码规则：dddddd yyyymmdd xxx y
 * dddddd：6位地区编码
 * yyyymmdd: 出生年月日
 * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
 * y: 校验码，通过前17位计算
 *
 * 前17位加权因子wi: [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ] 验证位
 * 余数Y: [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ] 10为X代替
 * 校验位计算公式：Y_P = mod( ∑(Ai × Wi), 11 ) i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
 */
export function isIDCard(idCard: string): boolean {
  const reg = /^[1-9]\d{7}(?:0\d|1[0-2])(?:[0|12]\d|3[01])\d{3}$|^[1-9]\d{5}[1-9]\d{3}(?:0\d|1[0-2])(?:[0|12]\d|3[01])(?:\d{4}|\d{3}X)$/i

  if (!reg.test(idCard)) {
    return false
  }

  if (idCard.length === 15) {
    return true
  }

  if (idCard.length !== 18) {
    return false
  }

  // 前17位加权因子
  const wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  // 除11后可能产生的余数
  const y = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]

  let wiSum = 0
  for (let i = 0; i < 17; i++) {
    wiSum += +idCard.substring(i, i + 1) * wi[i]
  }

  const mod = wiSum % 11
  const last = idCard.substring(17)

  // 处理X
  if (mod === 2 && !['X', 'x'].includes(last)) {
    return false
  }
  else {
    return +last === y[mod]
  }
}
