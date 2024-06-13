import process from 'node:process'
import fs from 'node:fs'
import { basename, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ora from 'ora'
import MagicString from 'magic-string'
import { resolveRealPath, runCommand } from './utils'

const [, , ...args] = process.argv

const subpackageNamePrefix = '@xparcai-utils/'
const packagesDirPath = resolveRealPath('../packages')
const templateDirPath = resolveRealPath('../template')

// 复制模板文件
function copySubpackageTemplate({
  templateDirPath,
  subpackageDirPath,
  subpackageName,
}: {
  templateDirPath: string
  subpackageDirPath: string
  subpackageName: string
}) {
  const stats = fs.statSync(templateDirPath)
  // 创建文件夹
  if (stats.isDirectory()) {
    fs.mkdirSync(subpackageDirPath, { recursive: true })
    for (const file of fs.readdirSync(templateDirPath)) {
      copySubpackageTemplate({
        templateDirPath: resolve(templateDirPath, file),
        subpackageDirPath: resolve(subpackageDirPath, file),
        subpackageName,
      })
    }
    return
  }

  // 写package.json
  if (basename(templateDirPath) === 'package.json') {
    const pkg = JSON.parse(fs.readFileSync(templateDirPath, 'utf-8'))
    pkg.name = `@xparcai-utils/${subpackageName}`
    fs.writeFileSync(subpackageDirPath, `${JSON.stringify(pkg, null, 2)}\n`)
    return
  }

  // 写tsconfig.json
  if (basename(templateDirPath) === 'tsconfig.json') {
    const tsconfig = JSON.parse(fs.readFileSync(templateDirPath, 'utf-8'))
    tsconfig.extends = '../../tsconfig.json'
    fs.writeFileSync(subpackageDirPath, `${JSON.stringify(tsconfig, null, 2)}\n`)
    return
  }

  // 改rollup.config.ts
  if (basename(templateDirPath) === 'rollup.config.ts') {
    let rollupConfig = fs.readFileSync(templateDirPath, 'utf-8')
    rollupConfig = rollupConfig.replace('../scripts/rollup-config', '../../scripts/rollup-config')
    fs.writeFileSync(subpackageDirPath, rollupConfig)
    return
  }

  // 改index.test.ts
  if (basename(templateDirPath) === 'index.test.ts') {
    let testContent = fs.readFileSync(templateDirPath, 'utf-8')
    testContent = testContent.replace('vitest module', `@xparcai-utils/${subpackageName}`)
    fs.writeFileSync(subpackageDirPath, testContent)
    return
  }

  fs.copyFileSync(templateDirPath, subpackageDirPath)
}

// 排序package.json dependencies
function sortPackageDependencies(obj: Record<string, string>) {
  const keys = Object.keys(obj).sort()
  return keys.reduce((acc: Record<string, string>, key) => {
    acc[key] = obj[key]
    return acc
  }, {})
}

// 添加到core包依赖
function insertCorePackageDependencies(subpackageNameFull: string) {
  const coreDirPath = resolveRealPath(`${packagesDirPath}/core/package.json`)
  const pkg = JSON.parse(fs.readFileSync(coreDirPath, 'utf-8'))
  pkg.dependencies = sortPackageDependencies({
    ...pkg.dependencies,
    [subpackageNameFull]: 'workspace:*',
  })
  fs.writeFileSync(coreDirPath, `${JSON.stringify(pkg, null, 2)}\n`)
}

// 添加到core包主入口导出
function insertCorePackageExport(subpackageNameFull: string) {
  const coreDirPath = resolveRealPath(`${packagesDirPath}/core/index.ts`)
  const coreExport = fs.readFileSync(coreDirPath, 'utf-8')
  const mst = new MagicString(coreExport)
  mst.append(`export * from '${subpackageNameFull}'`)
  fs.writeFileSync(coreDirPath, `${mst.toString()}\n`)
}

// 安装依赖
function installDependencies() {
  const dirname = fileURLToPath(new URL('../', import.meta.url))
  return runCommand(`pnpm install`, dirname)
}

// 转换为_-连接的字符
function toLinesCase(str: string, isUnder: boolean = false): string {
  return str
    .replace(/^[-|_]+|[-|_]+$/g, '')
    .replace(/^[A-Z]/g, key => key.toLowerCase())
    .replace(/[A-Z]/g, key => `${isUnder ? '_' : '-'}${key.toLowerCase()}`)
}

// 创建子包
function createSubpackage() {
  let subpackageName = args[0]
  if (!subpackageName) {
    return console.log('未提供子包的名称')
  }

  // 转换为短横线连接
  subpackageName = toLinesCase(subpackageName)

  // 子包全名
  const subpackageNameFull = `${subpackageNamePrefix}${subpackageName}`

  // 校验子包是否存在
  const subpackageDirPath = resolveRealPath(`${packagesDirPath}/${subpackageName}`)
  if (fs.existsSync(subpackageDirPath)) {
    return console.log(`子包[${subpackageNameFull}]已存在`)
  }

  const spinnersPrefixText = '[xparcai-utils]: '
  const spinners = ora()

  spinners.text = `${spinnersPrefixText}创建[${subpackageNameFull}]子包中...`
  spinners.start()

  // 复制模板文件
  copySubpackageTemplate({ templateDirPath, subpackageDirPath, subpackageName })
  // 添加到core的生产依赖中
  insertCorePackageDependencies(subpackageNameFull)
  // 添加到core包主入口导出
  insertCorePackageExport(subpackageNameFull)

  spinners.succeed(`${spinnersPrefixText}创建[${subpackageNameFull}]子包成功`)

  spinners.text = `${spinnersPrefixText}依赖安装中...`
  spinners.start()

  // 安装依赖
  installDependencies().then(() => {
    spinners.succeed(`${spinnersPrefixText}安装依赖成功`)
  }).catch(() => {
    spinners.fail(`${spinnersPrefixText}安装依赖失败`)
  })
}

createSubpackage()
