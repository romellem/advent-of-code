const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((v) => {
		let [op, n] = v.split(' ');
		if (op === 'addx') {
			n = parseInt(n, 10);
		}

		if (Number.isNaN(n)) {
			throw v;
		}

		return [op, n];
	});

module.exports = {
	input,
};
