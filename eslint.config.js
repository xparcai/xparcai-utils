import defineConfig from '@antfu/eslint-config'

export default defineConfig(
  {
    formatters: true,
  },
  {
    files: ['examples/*/*.*'],
    rules: {
      'no-console': 'off',
      'antfu/no-import-dist': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'no-console': 'off',
      'no-new-func': 'off',
      'prefer-regex-literals': 'off',
      'unicorn/error-message': 'off',
    },
  },
)
