const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((v) => {
		let [op, n] = v.split(' ');
		n = parseInt(n, 10);
		return [op, n];
	});

module.exports = {
	input,
};
