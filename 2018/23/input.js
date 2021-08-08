const path = require('path');
const fs = require('fs');

/**
 * @typedef {Object} NanoBot
 * @property {Array<Number, Number, Number>} pos
 * @property {Number} r
 */

/**
 * @type {Array<NanoBot>}
 */
const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		// line == 'pos=<1,-1,0>, r=4'
		let [, x, y, z, r] = /pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(-?\d+)/.exec(line);
		x = parseInt(x, 10);
		y = parseInt(y, 10);
		z = parseInt(z, 10);
		r = parseInt(r, 10);
		return {
			pos: [x, y, z],
			r,
		};
	});

module.exports = {
	input,
};
