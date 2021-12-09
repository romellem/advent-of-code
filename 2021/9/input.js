const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		return line.split('').map((v) => parseInt(v, 10));
	});

module.exports = {
	input,
};
