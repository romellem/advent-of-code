const path = require('path');
const fs = require('fs');

/** @type Array<[Array<string>, number]> */
const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		// 3T3TT 332
		return line.split(' ').map((v, i) => {
			if (i === 0) return v.split('');
			else return parseInt(v);
		});
	});

module.exports = {
	input,
};
