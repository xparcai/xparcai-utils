import process from 'node:process'
import prompts from '@posva/prompts'
import { loadSubpackage, runCommand } from './utils'

const [, , ...args] = process.argv

async function create() {
  console.log('--------')
  console.log(args.length, process.cwd())
  if (args.length !== 2) {
    const response = await prompts([
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
    const type: 'subpackage' | 'function' = response.type
    runCommand(`pnpm run create:${type}`, process.cwd(), { silent: false })
  }
  else {
    const subpackageName = args[0]
    const functionName = args[1]

    const { dirNames: subpackageDirNames } = loadSubpackage()

    // 校验子包是否存在
    if (!subpackageDirNames.includes(subpackageName)) {
      // 不存在: 创建子包
      runCommand(`pnpm run create:subpackage ${subpackageName} ${functionName}`, process.cwd(), { silent: false })
    }
    else {
      // 存在: 创建函数
      runCommand(`pnpm run create:function ${subpackageName} ${functionName}`, process.cwd(), { silent: false })
    }
  }
}

await create()
