const path = require('path');
const fs = require('fs');

// 2D array of 1s and 0s
const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((row) => row.split('').map((v) => (v === '#' ? 1 : 0)));

const sampleInput = `....#
#..#.
#..##
..#..
#....`
	.split('\n')
	.map((row) => row.split('').map((v) => (v === '#' ? 1 : 0)));

module.exports = {
	input,
	sampleInput,
};
