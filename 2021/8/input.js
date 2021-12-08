const path = require('path');
const fs = require('fs');
const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		let [before, after] = line.split(' | ');

		// Sort our wires while parsing.
		// e.g. wire 'abcd' is the same as 'dcba', so by sorting we can more easily compare them later.
		let wires = before.split(' ').map((wire) => wire.split('').sort().join(''));
		let outputs = after.split(' ').map((wire) => wire.split('').sort().join(''));

		return {
			wires,
			wiresAsArrays: wires.map((wire) => wire.split('')),
			outputs,
			outputsAsArrays: outputs.map((wire) => wire.split('')),
		};
	});

module.exports = {
	input,
};
