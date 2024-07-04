import { defineConfig } from 'rollup'
import { resolveRollupConfig } from '../../scripts/rollup-config'

const rollupConfig = resolveRollupConfig('xparcai-utils')

export default defineConfig(rollupConfig)
