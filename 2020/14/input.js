const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		// mask = 010X11X110X1101011101000001XX1000100
		// mem[25292] = 672982926
		if (line.includes('mask')) {
			let [, value] = /mask = (.+)$/.exec(line);
			return {
				type: 'mask',
				value,
			};
		} else {
			let [, address, value] = /mem\[(\d+)\] = (\d+)/.exec(line);
			address = parseInt(address, 10);
			value = parseInt(value, 10);
			return {
				type: 'write',
				address,
				value,
			};
		}
	});

const sampleInput = `mask = 000000000000000000000000000000X1001X
	mem[42] = 100
	mask = 00000000000000000000000000000000X0XX
	mem[26] = 1`
	.toString()
	.trim()
	.split('\n')
	.map((line) => {
		// mask = 010X11X110X1101011101000001XX1000100
		// mem[25292] = 672982926
		if (line.includes('mask')) {
			let [, value] = /mask = (.+)$/.exec(line);
			return {
				type: 'mask',
				value,
			};
		} else {
			let [, address, value] = /mem\[(\d+)\] = (\d+)/.exec(line);
			address = parseInt(address, 10);
			value = parseInt(value, 10);
			return {
				type: 'write',
				address,
				value,
			};
		}
	});
module.exports = {
	input,
	sampleInput,
};
