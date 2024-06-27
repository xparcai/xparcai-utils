import process from 'node:process'
import prompts from '@posva/prompts'
import { loadSubpackage } from './utils'
import { createSubpackage } from './create-subpackage'
import { createFunction } from './create-function'

const [, , ...args] = process.argv

async function create() {
  if (args.length !== 2) {
    const type: 'subpackage' | 'function' = (
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

    const typeCreateFn = {
      subpackage: createSubpackage,
      function: createFunction,
    }

    typeCreateFn[type]()
  }
  else {
    const subpackageName = args[0]
    const functionName = args[1]

    const { dirNames: subpackageDirNames } = loadSubpackage()

    // 校验子包是否存在
    if (!subpackageDirNames.includes(subpackageName)) {
      // 不存在: 创建子包
      createSubpackage(subpackageName, functionName)
    }
    else {
      // 存在: 创建函数
      createFunction(subpackageName, functionName)
    }
  }
}

await create()
