const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => line.split(' ').map((v) => parseInt(v, 10)));

const sampleInput = fs
	.readFileSync(path.join(__dirname, 'sample.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => line.split(' ').map((v) => parseInt(v, 10)));

module.exports = {
	input,
	sampleInput,
};
