export function toRawType(data: unknown): string {
  return Object.prototype.toString.call(data).slice(8, -1)
}
