const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('')
	.map(v => +v);

const inputTimes10 = [];
for (let i = 0; i < 10; i++) {
	inputTimes10.push(...input);
}

const partTwoInput = [];
for (let i = 0; i < 10000; i++) {
	partTwoInput.push(...input);
}

module.exports = {
	input,
	inputTimes10,
	partTwoInput,
};
