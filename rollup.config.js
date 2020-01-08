import typescript from 'rollup-plugin-typescript'
import babel from 'rollup-plugin-babel'
// import uglify from 'rollup-plugin-uglify';
import sass from 'rollup-plugin-sass';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import ModuleMap from './script/split';

export default {
  input: 'packages/index.ts',
  output: [
    {
      format: 'umd',
      name: 'virus',
      exports: 'named',
      file: 'dist/index.js'
    }
  ],
  external: [],
  // 是否开启代码分割
  experimentalCodeSplitting: true,
  plugins: [
    sass({
      output: false,
      output: true,
      output: 'dist/index.css',
    }),
    commonjs(),
    resolve(),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      runtimeHelpers: true
    }),
    // uglify()
  ]
}
