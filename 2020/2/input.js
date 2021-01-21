const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		// @example '9-16 d: dsdddddddrdddddhdbdd'
		let [, low, high, char, pass] = /(\d+)-(\d+) (\w): (.+)/.exec(line);
		low = parseInt(low, 10);
		high = parseInt(high, 10);
		return { low, high, char, pass };
	});

module.exports = {
	input,
};
