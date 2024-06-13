import process from 'node:process'
import fs from 'node:fs'
import { basename, resolve } from 'node:path'
import { resolveRealPath } from './utils'

const [, , ...args] = process.argv

const packagesDirPath = resolveRealPath('../packages')
const templateDirPath = resolveRealPath('../template')

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
  if (stats.isDirectory()) {
    // 创建文件夹
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
    console.log(rollupConfig)
    rollupConfig = rollupConfig.replace('../scripts/rollup-config', '../../scripts/rollup-config')
    fs.writeFileSync(subpackageDirPath, rollupConfig)
    return
  }

  fs.copyFileSync(templateDirPath, subpackageDirPath)
}

function createSubpackage() {
  const subpackageName = args[0]
  if (!subpackageName) {
    return console.log('未提供子包的名称')
  }

  // TOTO 这里需要规范一下子包的类型，短横线连接
  const subpackageDirPath = resolveRealPath(`${packagesDirPath}/${subpackageName}`)

  if (fs.existsSync(subpackageDirPath)) {
    return console.log(`子包[${subpackageName}]已存在`)
  }

  // TODO 这里思考到底是以一个模块为蓝本还是设置好一套固定的模板
  copySubpackageTemplate({ templateDirPath, subpackageDirPath, subpackageName })

  console.log(`创建[${subpackageName}]子包成功！`)
}

createSubpackage()
