import type { RollupOptions } from 'rollup'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'
import eslint from '@rollup/plugin-eslint'
import terser from '@rollup/plugin-terser'
import { resolveRealPath } from './utils'

export function resolveRollupConfig(packageName: string): RollupOptions[] {
  return [
    {
      input: './index.ts',
      plugins: [
        babel({
          presets: ['@babel/preset-env'],
          exclude: 'node_modules/**',
          babelHelpers: 'bundled',
        }),
        commonjs(),
        resolve(),
        typescript({
          tsconfig: resolveRealPath('../tsconfig.json'),
        }),
        json(),
        eslint({
          throwOnError: true,
          throwOnWarning: true,
          include: ['packages/**'],
          exclude: ['node_modules/**', 'dist/**'],
        }),
        terser(),
      ],
      output: [
        { file: 'dist/index.mjs', format: 'es' },
        { file: 'dist/index.cjs', format: 'cjs' },
        {
          format: 'umd',
          file: 'dist/index.js',
          name: packageName,
        },
      ],
    },
    {
      input: './index.ts',
      plugins: [
        dts(),
      ],
      output: {
        format: 'esm',
        file: 'dist/index.d.ts',
      },
    },
  ]
}
