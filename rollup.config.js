import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import {uglify} from 'rollup-plugin-uglify';

export default {
  input: 'src/internal/umd.ts',
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ES2015',
          importHelpers: false,
        },
      },
    }),
    resolve(),
    commonjs(),
    uglify(),
  ],
  output: [
    {
      file: 'dist/bundles/shisell.umd.js',
      format: 'umd',
      name: 'shisell',
      sourceMap: true,
    },
  ],
};
