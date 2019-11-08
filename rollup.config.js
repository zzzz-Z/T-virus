import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import resolve from "rollup-plugin-node-resolve";
import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
// import {uglify} from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import path from 'path';
// import ModuleMap from './script/split';
const pkg = require('./package.json')

export default {
  input: 'packages/index.ts',
  output: [{
    format: 'umd',
    name: 'virus',
    exports: 'named',
    file: 'dist/index.js'
  }],
  external: ['vue'],
  // 是否开启代码分割
  // experimentalCodeSplitting: true,
  plugins: [
    postcss({
      extensions: ['.less', '.css'],
      use: [['less', { javascriptEnabled: true }]],
      extract: `dist/index.css`
    }),
    vue(),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      runtimeHelpers: true
    }),
    commonjs(),
    resolve(),
    // uglify()
  ]
}

function resolves(dir) {
  return path.join(__dirname, dir)
}

