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
  | 'WeakMap'
  | 'Map'
  | 'Set'
  | 'RegExp'
  | 'JSON'
  | 'Error'
  | 'Math'
  | 'Argument'
export function isType(data: unknown, type: Types): boolean {
  return toRawType(data) === type
}
