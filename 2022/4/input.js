const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((v) => {
		return v.split(',').map((v) => v.split('-').map((v) => parseInt(v)));
	});

module.exports = {
	input,
};
