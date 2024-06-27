import process from 'node:process'
import fs from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ora from 'ora'
import MagicString from 'magic-string'
import prompts from '@posva/prompts'
import { loadFunction, loadSubpackage, packagePrefix, resolveRealPath, runCommand, sortJsonObject, spinnersPrefixText, toCamelCase, toLinesCase, writeSubpackageFunction, writeSubpackageFunctionTest } from './utils'

const [, , ...args] = process.argv

// 复制模板
function copyTemplate(templatePath: string, subpackagePath: string, functionName: string) {
  const templateDirPath = resolveRealPath(templatePath)
  const subpackageDirPath = resolveRealPath(subpackagePath)

  const stats = fs.statSync(templateDirPath)
  if (stats.isDirectory()) {
    fs.mkdirSync(subpackageDirPath, { recursive: true })
    for (const file of fs.readdirSync(templateDirPath)) {
      const waitRenameFileNames = ['template.test.ts', 'template.ts']
      let renameFile = file
      if (waitRenameFileNames.includes(file)) {
        renameFile = file.replace(/template/g, functionName)
      }
      copyTemplate(resolve(templateDirPath, file), resolve(subpackageDirPath, renameFile), functionName)
    }
    return
  }

  fs.copyFileSync(templateDirPath, subpackageDirPath)
}

// 写core的index.ts
function writeCoreIndex(subpackageName: string) {
  const filePath = resolveRealPath('../packages/core/index.ts')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const mst = new MagicString(fileContent)
  mst.append(`export * from '${packagePrefix}/${subpackageName}'\n`)
  fs.writeFileSync(filePath, mst.toString())
}

// 写core的package.json
function writeCorePackage(subpackageName: string) {
  const filePath = resolveRealPath('../packages/core/package.json')
  const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  fileContent.dependencies = sortJsonObject({
    ...fileContent.dependencies,
    [`${packagePrefix}/${subpackageName}`]: 'workspace:*',
  })
  fs.writeFileSync(filePath, `${JSON.stringify(fileContent, null, 2)}\n`)
}

// 写子包的tsconfig.json
function writeSubpackageTsconfig(subpackageName: string) {
  const filePath = resolveRealPath(`../packages/${subpackageName}/tsconfig.json`)
  const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  fileContent.extends = '../../tsconfig.json'
  fs.writeFileSync(filePath, `${JSON.stringify(fileContent, null, 2)}\n`)
}

// 写子包的rollup.config.ts
function writeSubpackageRollupconfig(subpackageName: string) {
  const filePath = resolveRealPath(`../packages/${subpackageName}/rollup.config.ts`)
  let fileContent = fs.readFileSync(filePath, 'utf-8')
  fileContent = fileContent.replace('../scripts/rollup-config', '../../scripts/rollup-config')
  fs.writeFileSync(filePath, fileContent)
}

// 写子包的package.json
function writeSubpackagePackage(subpackageName: string) {
  const filePath = resolveRealPath(`../packages/${subpackageName}/package.json`)
  const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  fileContent.name = `${packagePrefix}/${subpackageName}`
  fs.writeFileSync(filePath, `${JSON.stringify(fileContent, null, 2)}\n`)
}

// 写子包的index.ts - 这里侧重的是修改导出名称
function writeSubpackageIndex(subpackageName: string, functionName: string) {
  const filePath = resolveRealPath(`../packages/${subpackageName}/index.ts`)
  let fileContent = fs.readFileSync(filePath, 'utf-8')
  fileContent = fileContent.replace(/template/g, functionName)
  fs.writeFileSync(filePath, fileContent)
}

// 安装依赖
function pnpmInstall() {
  const dirname = fileURLToPath(new URL('../', import.meta.url))
  return runCommand(`pnpm install`, dirname)
}

// 创建子包
export async function createSubpackage(subpackageName?: string, functionName?: string) {
  subpackageName = subpackageName ?? args[0]
  functionName = functionName ?? args[1]

  if (!subpackageName || !functionName) {
    // 无参调起交互式命令行
    const response = await prompts([
      {
        name: 'subpackage',
        type: 'text',
        message: '请输入包名',
        validate: (value) => {
          if (!value.trim()) {
            return '请输入包名'
          }
          return true
        },
      },
      {
        name: 'function',
        type: 'text',
        message: '请输入函数名称',
        validate: (value) => {
          if (!value.trim()) {
            return '请输入函数名称'
          }
          return true
        },
      },
    ])
    subpackageName = response.subpackage.trim()
    functionName = response.function.trim()
  }

  // 转换为短横线
  subpackageName = toLinesCase(subpackageName!)
  // 转换为小驼峰
  functionName = toCamelCase(functionName!)

  const { dirNames: subpackageDirNames } = loadSubpackage()

  // 校验子包是否存在
  if (subpackageDirNames.includes(subpackageName)) {
    return console.error(`子包${subpackageName}已存在`)
  }

  const { dirNames: functionDirNames } = loadFunction(subpackageName)

  // 校验方法是否存在
  if (functionDirNames.includes(functionName)) {
    return console.error(`方法${functionName}已存在`)
  }

  const spinners = ora()
  spinners.text = `${spinnersPrefixText}创建[${packagePrefix}/${subpackageName}]子包中...`
  spinners.start()

  const innerSpinners = ora()
  innerSpinners.text = `${spinnersPrefixText}复制模板...`
  innerSpinners.start()
  copyTemplate('../template', `../packages/${subpackageName}`, functionName)
  writeCoreIndex(subpackageName)
  writeCorePackage(subpackageName)
  writeSubpackageTsconfig(subpackageName)
  writeSubpackageRollupconfig(subpackageName)
  writeSubpackagePackage(subpackageName)
  writeSubpackageIndex(subpackageName, functionName)
  writeSubpackageFunction(subpackageName, functionName)
  writeSubpackageFunctionTest(subpackageName, functionName)
  innerSpinners.succeed(`${spinnersPrefixText}复制模板成功`)

  pnpmInstall().then(() => {
    spinners.succeed(`${spinnersPrefixText}创建[${packagePrefix}/${subpackageName}]子包成功`)
  }).catch(() => {
    spinners.fail(`${spinnersPrefixText}创建[${packagePrefix}/${subpackageName}]子包失败`)
  })
}

await createSubpackage()
