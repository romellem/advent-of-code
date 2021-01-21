const path = require('path');
const fs = require('fs');

const strsToInts = (...nums) => nums.map((n) => parseInt(n, 10));

/**
 * @example [[1, 2, 3], [-1, -2, -3], ...]
 */
const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		// @example <x=-16, y=-1, z=-12>
		let [, x, y, z] = /^\<x=(-?\d+), y=(-?\d+), z=(-?\d+)\>$/.exec(line);
		[x, y, z] = strsToInts(x, y, z);
		return [x, y, z];
	});

module.exports = {
	sampleInput: {
		positions: [
			[-8, -10, 0],
			[5, 5, 10],
			[2, -7, 3],
			[9, -8, -3],
		],
		energy: 1940, // After 100 steps, (29 * 10) + (32 * 19) + (41 * 14) + (52 * 9)
	},
	input,
};
