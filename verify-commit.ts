import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const msgPath = path.resolve('.git/COMMIT_EDITMSG')
const msg = fs.readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(?:revert: )?(?:feat|fix|perf|refactor|test|types|docs|style|ci|build|release|workflow|dx|chore|wip|update|optimize|merge)(?:\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.error('invalid commit message format')
  console.warn('Proper commit message format is required for automated changelog generation.')
  console.warn('Examples:')
  console.warn('feat: added some feature')
  console.warn('fix: fixed some error')
  console.warn('keywords: feat|fix|perf|refactor|test|types|docs|style|ci|build|release|workflow|dx|chore|wip|update|optimize|merge')
  process.exit(1)
}
