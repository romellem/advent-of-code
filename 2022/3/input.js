const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((v) => {
		return [v.slice(0, v.length / 2), v.slice(v.length / 2)];
	});

module.exports = {
	input,
};
