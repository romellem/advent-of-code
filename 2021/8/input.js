const path = require('path');
const fs = require('fs');
const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		let [before, after] = line.split(' | ');
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
