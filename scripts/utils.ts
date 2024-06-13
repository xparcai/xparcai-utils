import type { ProcessEnvOptions } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ExecOptions } from 'shelljs'
import shell from 'shelljs'

export function resolveRealPath(path: string) {
  const fileName = fileURLToPath(import.meta.url)
  const dirName = dirname(fileName)
  return resolve(dirName, path)
}

export function runCommand(command: string, dir: ProcessEnvOptions['cwd'], userOptions: ExecOptions = {}) {
  return new Promise((resolve, reject) => {
    try {
      shell.exec(
        command,
        {
          cwd: dir,
          shell: true,
          encoding: 'GBK',
          async: true,
          silent: userOptions?.silent ?? true,
          ...userOptions,
        } as any,
        (code, output, err) => {
          if (code === 0) {
            resolve(true)
          }
          else if (err) {
            reject(err)
          }

          const outputStr = output.toString()
          if (outputStr && !(userOptions?.silent ?? true)) {
            console.log(outputStr)
          }
        },
      )
    }
    catch (e) {
      reject(e.message)
    }
  })
}
