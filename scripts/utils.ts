import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export function resolveRealPath(path: string) {
  const fileName = fileURLToPath(import.meta.url)
  const dirName = dirname(fileName)
  return resolve(dirName, path)
}
