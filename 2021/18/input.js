const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) =>
		line.split('').map((v) =>
			// Input only has single digit numbers
			/\d/.test(v) ? parseInt(v, 10) : v
		)
	);

module.exports = {
	input,
};
