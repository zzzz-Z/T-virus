import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import resolve from "rollup-plugin-node-resolve";
import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify'
import scss from 'rollup-plugin-scss'
import alias from 'rollup-plugin-alias';
function resolve (dir) {
  return path.join(__dirname, dir)
}

export default {
  input: 'src/components/index.ts',
  output: [ {
      format: 'umd',
      name:'umbrella',
      file: 'docs/.vuepress/components/umbrella.umd.js'
    },
    {
      format: 'es',
      name:'umbrella',
      file: 'docs/.vuepress/components/umbrella.ed.js'
    }
  ],
  external:['vue'],
  plugins: [
    // uglify(),
    alias({'@': resolve('src')}),
    scss({
      output: 'docs/.vuepress/components/index.css'
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



