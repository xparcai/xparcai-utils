import process from 'node:process'
import { fileURLToPath } from 'node:url'
import prompts from '@posva/prompts'
import { loadSubpackage, runCommand } from './utils'

const [, , ...args] = process.argv

async function create() {
  if (args.length !== 2) {
    const type = (
      await prompts([
        {
          name: 'type',
          type: 'select',
          message: '请选择子包',
          choices: [
            { title: '创建子包', value: 'subpackage' },
            { title: '创建函数', value: 'function' },
          ],
        },
      ])
    ).type

    const dirname = fileURLToPath(new URL('../', import.meta.url))
    runCommand(`pnpm run create:${type}`, dirname)
  }
  else {
    const subpackageName = args[0]
    const functionName = args[1]

    const { dirNames: subpackageDirNames } = loadSubpackage()

    // 校验子包是否存在
    if (!subpackageDirNames.includes(subpackageName)) {
      // 不存在: 创建子包
      const dirname = fileURLToPath(new URL('../', import.meta.url))
      runCommand(`pnpm run create:subpackage ${subpackageName} ${functionName}`, dirname)
    }
    else {
      // 存在: 创建函数
      const dirname = fileURLToPath(new URL('../', import.meta.url))
      runCommand(`pnpm run create:function ${subpackageName} ${functionName}`, dirname)
    }
  }
}

await create()
