import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

let outfile = path.resolve(
	__dirname,
	'../../../docs/assets/js/2017/23/js/',
	'main.bundle.js'
);

export default {
	input: 'src/index.js',
	output: {
		globals: {
			'react': 'React',
			'react-dom': 'ReactDOM',
		},
		file: outfile,
		format: 'iife',
		sourcemap: true,
	},
	plugins: [
		resolve(),
		babel({ babelHelpers: 'bundled' }),
		commonjs(),
	],
	external: [
		'react',
		'react-dom',
	],
};
