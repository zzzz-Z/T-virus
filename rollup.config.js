import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import sass from 'rollup-plugin-sass'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'


const fs = require('fs-extra')
const path = require('path')
const dir = path.join(__dirname, './packages')
const files = fs.readdirSync(dir)
function isDir(dir) {
  return fs.lstatSync(dir).isDirectory()
}

const plugins = [
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
function createRollupConfig() {
  return files
    .filter(name => isDir(path.join(dir, name)) && !['styles', 'utils'].includes(name))
    .map(file => ({
      input: `packages/${file}/index.ts`,
      output: [{
        format: 'es',
        name: file,
        file: `dist/es/${file}/index.js`,
      }],
      plugins
    }))
}

export default [{
  input: `packages/index.ts`,
  output: [{ format: 'es', name: 'index', file: `dist/index.js` }],
  plugins: [
    commonjs(),
    resolve(),
    typescript({ tsconfig: 'tsconfig.type.json' }),
    babel({
      include: 'packages/**',
      extensions: ['.js', '.ts', '.tsx'],
      runtimeHelpers: true
    }),
    terser()
  ]
},
  ...createRollupConfig()
]
