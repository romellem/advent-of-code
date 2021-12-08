const path = require('path');
const fs = require('fs');
const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		let [before, after] = line.split(' | ');
		return {
			before: before.split(' '),
			after: after.split(' '),
		};
	});

module.exports = {
	input,
};
