import { toRawType } from '@xparcai-utils/tool'

export function isType(data: unknown, type: string): boolean {
  return toRawType(data).toLowerCase() === type.toLowerCase()
}
