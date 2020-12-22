const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((instruction) => {
		let action = instruction[0];
		let value = parseInt(instruction.slice(1), 10);
		return {
			action,
			value,
		};
	});

const sampleInput = [{ action: 'F', value: 10 },
{ action: 'N', value: 3 },
{ action: 'F', value: 7 },
{ action: 'R', value: 90 },
{ action: 'F', value: 11 }]

module.exports = {
	input,
	sampleInput,
};
