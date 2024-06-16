export function isPromise<T = any>(data: unknown): data is Promise<T> {
  return (
    !!data
    && isFunction((data as any).then)
    && isFunction((data as any).catch)
  )
}
