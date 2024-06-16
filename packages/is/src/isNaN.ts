export function isNaN(data: unknown): data is number {
  return Number.isNaN(data)
}
