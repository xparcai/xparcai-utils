import type { ProcessEnvOptions } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import type { ExecOptions } from 'shelljs'
import fg from 'fast-glob'
import shell from 'shelljs'

export const packagePrefix = '@xparcai-utils'
export const spinnersPrefixText = '[xparcai-utils]: '

export function resolveRealPath(...args: string[]) {
  const fileName = fileURLToPath(import.meta.url)
  const dirName = dirname(fileName)
  return resolve(dirName, ...args)
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

// 加载子包
export function loadSubpackage() {
  const packageFiles = fg.globSync(['packages/*/package.json', '!packages/core/package.json'])
  return {
    dirs: packageFiles.map(m => m.split('/').slice(0, 2).join('/')),
    dirNames: packageFiles.map(m => m.split('/')[1]),
    subpackages: packageFiles.map(m => `${packagePrefix}/${m.split('/')[1]}`),
    choices: packageFiles.map((m) => {
      const title = `${packagePrefix}/${m.split('/')[1]}`
      const value = m.split('/')[1]
      return {
        title,
        value,
      }
    }),
  }
}

// 加载方法
export function loadFunction(subpackage: string) {
  const functionFiles = fg.globSync(`packages/${subpackage}/src/*.ts`)
  return {
    dirs: functionFiles.map(m => m.split('/').slice(0, 3).join('/')),
    dirNames: functionFiles.map(m => m.split('/')[3].replace(/\.ts/g, '')),
    subpackages: functionFiles.map(m => `${packagePrefix}/${m.split('/')[1]}`),
  }
}

// 转换为_-连接的字符
export function toLinesCase(str: string, isUnder: boolean = false): string {
  return str
    .replace(/^[-|_]+|[-|_]+$/g, '')
    .replace(/^[A-Z]/g, key => key.toLowerCase())
    .replace(/[A-Z]/g, key => `${isUnder ? '_' : '-'}${key.toLowerCase()}`)
}

// 首字母大写
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 转驼峰
export function toCamelCase(str: string, isUpper: boolean = false): string {
  const camelCase = str
    .replace(/^[-|_]+|[-|_]+$/g, '')
    .replace(/[-|_]+([a-z])/g, (_, key) => key.toUpperCase())
    .replace(/[-|_]+/g, '')
  return isUpper ? capitalize(camelCase) : camelCase
}

// json 对象排序
export function sortJsonObject(obj: Record<string, string>) {
  const keys = Object.keys(obj).sort()
  return keys.reduce((acc: Record<string, string>, key) => {
    acc[key] = obj[key]
    return acc
  }, {})
}

// 写子包函数
export function writeSubpackageFunction(subpackageName: string, functionName: string) {
  const implPath = resolveRealPath(`../packages/${subpackageName}/src/${functionName}.ts`)
  const templatePath = resolveRealPath('../template/src/template.ts')
  let implContent = fs.readFileSync(templatePath, 'utf-8')
  implContent = implContent.replace(/template/g, functionName)
  fs.writeFileSync(implPath, implContent)
}

// 写子包函数单测
export function writeSubpackageFunctionTest(subpackageName: string, functionName: string) {
  const testPath = resolveRealPath(`../packages/${subpackageName}/__test__/${functionName}.test.ts`)
  const templatePath = resolveRealPath('../template/__test__/template.test.ts')
  let testContent = fs.readFileSync(templatePath, 'utf-8')
  testContent = testContent.replace('vitest module', `${packagePrefix}/${subpackageName}`).replace(/template/g, functionName)
  fs.writeFileSync(testPath, testContent)
}
