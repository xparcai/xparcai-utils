import process from 'node:process'
import prompts from '@posva/prompts'
import { log } from '../packages/log'
import { loadSubpackage } from './utils'
import { createSubpackage } from './create-subpackage'
import { createFunction } from './create-function'

log.setPrefix('[xparcai-utils]: ')

const [, , ...args] = process.argv

const choices = [
  { title: '创建子包', value: 'subpackage' },
  { title: '创建函数', value: 'function' },
]

const fnMap = {
  subpackage: createSubpackage,
  function: createFunction,
}

async function create() {
  if (args.length !== 2) {
    const response = await prompts([
      {
        name: 'type',
        type: 'select',
        message: '请选择子包',
        choices,
      },
    ])
    if (!response?.type) {
      log.error('未能获取明确的创建类型，终止创建！')
      process.exit(1)
    }
    const type: 'subpackage' | 'function' = response.type
    await fnMap[type]()
  }
  else {
    const subpackageName = args[0]
    const functionName = args[1]
    const { dirNames: subpackageDirNames } = loadSubpackage()
    const type = !subpackageDirNames.includes(subpackageName) ? 'subpackage' : 'function'
    await fnMap[type](subpackageName, functionName)
  }
}

await create()
