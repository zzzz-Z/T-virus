import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import sass from 'rollup-plugin-sass'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'packages/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].esm.js',
      chunkFileNames: 'chunks/t-[name]-[hash].esm.js',
    }
  ],
  experimentalCodeSplitting: true,
  plugins: [
    sass({ output: 'dist/index.css' }),
    commonjs(),
    resolve(),
    typescript(),
    babel({
      include: 'packages/**',
      extensions: ['.js', '.ts', '.tsx'],
      runtimeHelpers: true
    }),
    terser()
  ]
}
