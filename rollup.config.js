import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import {uglify} from 'rollup-plugin-uglify';

export default {
  input: './dist/_rollup/internal/umd.js',
  plugins: [resolve(), commonjs(), uglify()],
  output: [
    {
      file: 'dist/bundles/shisell.umd.js',
      format: 'umd',
      name: 'shisell',
      exports: 'named',
    },
  ],
};
