const path = require('path');
const fs = require('fs');

const splitLineWithNumbers = (line) =>
	line.split('').map((v) =>
		// Input only has single digit numbers
		/\d/.test(v) ? parseInt(v, 10) : v
	);

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		console.log(`Splitting "${line}"`);
		return splitLineWithNumbers(line);
	});

module.exports = {
	input,
	splitLineWithNumbers,
};
