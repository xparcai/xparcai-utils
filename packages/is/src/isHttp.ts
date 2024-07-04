type Condition = '' | 's' | '||'

let _condition: Condition = ''

/**
 * 某个地址是否是http(s)
 * @param url 某个地址
 * @param condition 条件, 默认''; '': 仅http; 's': 仅https; '||': http或https
 * @returns 是否是http(s)
 */
export function isHttp(url: string, condition: Condition = _condition): boolean {
  const conditionMap: Record<Condition, () => boolean> = {
    '': () => url.includes('http://'),
    's': () => url.includes('https://'),
    '||': () => url.includes('http://') || url.includes('https://'),
  }
  return conditionMap[condition]()
}

/**
 * 设置isHttp函数的默认条件
 * @param condition 条件, 默认'';
 */
isHttp.setCondition = function (condition: Condition = _condition) {
  _condition = condition
}
