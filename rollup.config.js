import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import {minify} from 'uglify-es';

export default {
    entry: 'index.js',
    plugins: [
        commonjs(),
        uglify({}, minify)
    ],
    targets: [
        { dest: 'dist/shisell.umd.js', format: 'umd', moduleName: 'shisell' },
        { dest: 'dist/shisell.es.js', format: 'es' }
    ]
}