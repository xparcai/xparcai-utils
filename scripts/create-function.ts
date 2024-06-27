import process from 'node:process'
import fs from 'node:fs'
import prompts from '@posva/prompts'
import ora from 'ora'
import { loadFunction, loadSubpackage, packagePrefix, resolveRealPath, spinnersPrefixText, toCamelCase, writeSubpackageFunction, writeSubpackageFunctionTest } from './utils'

const [, , ...args] = process.argv

// 写子包的index.ts - 这里侧重的是增加导出
function writeSubpackageIndex(subpackageName: string, functionName: string) {
  const exportPath = resolveRealPath(`../packages/${subpackageName}/index.ts`)
  let exportContent = fs.readFileSync(exportPath, 'utf-8').trim().split('\n').sort().join('\n')
  exportContent += '\n' + `export * from './src/${functionName}'` + '\n'
  fs.writeFileSync(exportPath, exportContent)
}

// 创建函数
export async function createFunction(subpackageName?: string, functionName?: string) {
  subpackageName = subpackageName ?? args[0]
  functionName = functionName ?? args[1]
  const { choices } = loadSubpackage()
  if (!subpackageName || !functionName) {
    // 无参调起交互式命令行
    const response = await prompts([
      {
        name: 'subpackage',
        type: 'select',
        message: '请选择子包',
        choices,
      },
      {
        name: 'name',
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
    functionName = response.name.trim()
  }

  // 转换为小驼峰
  functionName = toCamelCase(functionName!)

  const { dirNames: functionDirNames } = loadFunction(subpackageName!)

  // 校验方法是否存在
  if (functionDirNames.includes(functionName)) {
    return console.error(`方法${functionName}已存在`)
  }

  const spinners = ora()
  spinners.text = `${spinnersPrefixText}创建[${packagePrefix}/${subpackageName}] => ${functionName}中...`
  spinners.start()
  writeSubpackageIndex(subpackageName!, functionName)
  writeSubpackageFunction(subpackageName!, functionName)
  writeSubpackageFunctionTest(subpackageName!, functionName)
  spinners.succeed(`${spinnersPrefixText}创建[${packagePrefix}/${subpackageName}] => ${functionName}成功`)
}

await createFunction()
