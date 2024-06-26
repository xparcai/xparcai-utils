import { toRawType } from '@xparcai-utils/tool'

/**
 * 某个数据是否符合某个类型
 * @param data 某个数据
 * @param type 某个类型
 * @returns 是否符合某个类型
 */
export function isType(data: unknown, type: string): boolean {
  return toRawType(data) === type
}
