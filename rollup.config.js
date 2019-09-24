import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import resolve from "rollup-plugin-node-resolve";
import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import alias from 'rollup-plugin-alias';
import path from 'path';

export default {
  input: 'package/components/index.ts',
  output: [ {
      format: 'umd',
      name:'t',
      file: 'dist/t.umd.js'
    },
    {
      format: 'es',
      name:'t',
      file: 'dist/t.es.js'
    }
  ],
  external:['vue'],
  plugins: [
    alias({'@': resolves('src')}),
    postcss({
      // modules: true, // 增加 css-module 功能
      extensions: ['.less', '.css'],
      use: [  ['less', {  javascriptEnabled: true  }] ],
      // 样式输出到 createModuleConfig 创建的模块文件夹下
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
  ]
}

function resolves (dir) {
  return path.join(__dirname, dir)
}

