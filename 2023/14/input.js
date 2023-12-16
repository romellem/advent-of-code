const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim();

const sampleInput = fs
	.readFileSync(path.join(__dirname, 'sample-input.txt'), 'utf8')
	.toString()
	.trim();

module.exports = {
	input,
	sampleInput,
};
