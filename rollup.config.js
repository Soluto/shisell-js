import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import {uglify} from 'rollup-plugin-uglify';

export default {
  input: './src/internal/umd.ts',
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext',
        },
      },
    }),
    uglify(),
  ],
  output: [
    {
      file: 'dist/bundles/shisell.umd.js',
      format: 'umd',
      name: 'shisell',
      exports: 'named',
    },
  ],
};
