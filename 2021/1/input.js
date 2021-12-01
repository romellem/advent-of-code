const path = require('path');
const fs = require('fs');

const trimmed_input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim();

const input = trimmed_input;

module.exports = {
	input,
};
