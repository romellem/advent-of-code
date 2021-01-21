const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('-')
	.map((v) => parseInt(v, 10));

// Input is a range, inclusive
module.exports = {
	input,
};
