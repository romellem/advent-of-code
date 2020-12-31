const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('')
	.map((v) => parseInt(v, 10));

const inputPartTwo = input.concat(
	Array(1000000 - input.length)
		.fill()
		.map((v, i) => i + input.length + 1)
);

module.exports = {
	input,
	inputPartTwo,
};
