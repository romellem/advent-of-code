const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n')
	.map((p) => {
		let p1 = p.split('\n');
		p1.shift();

		let nums = p1.map((v) => +v);
		return nums;
	});

module.exports = {
	input,
};
