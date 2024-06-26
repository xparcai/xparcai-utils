import { toRawType } from '@xparcai-utils/tool'

type Types =
  | 'Number'
  | 'String'
  | 'Boolean'
  | 'Object'
  | 'Function'
  | 'Undefined'
  | 'Array'
  | 'Null'
  | 'Date'
  | 'BigInt'
  | 'Symbol'
  | 'WeakMap'
  | 'Map'
  | 'Set'
  | 'RegExp'
  | 'JSON'
  | 'Error'
  | 'Math'
  | 'Argument'

/**
 * 某个数据是否符合某个类型
 * @param data 某个数据
 * @param type 某个类型
 * @returns 是否符合某个类型
 */
export function isType(data: unknown, type: Types): boolean {
  return toRawType(data) === type
}
