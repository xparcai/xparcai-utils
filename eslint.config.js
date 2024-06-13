import defineConfig from '@antfu/eslint-config'

export default defineConfig(
  {
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
  },
  {
    files: ['examples/*/*.*'],
    rules: {
      'no-console': 'off',
      'antfu/no-import-dist': 'off',
    },
  },
)
