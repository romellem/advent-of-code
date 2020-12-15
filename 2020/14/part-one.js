const { input: raw_input } = require('./input');

// Process the input specifically for Part One
const input = raw_input.map((instruction) => {
	let { type, value } = instruction;
	if (type === 'write') {
		// Convert the value to an array of 1s and 0s
		let binary_num_arr = value
			.toString(2)
			.padStart(36, '0')
			.split('')
			.map((v) => +v);
		return {
			...instruction,
			value: binary_num_arr,
		};
	} else {
		return instruction;
	}
});

/**
 * @param {Array<String>} mask
 * @param {Array<Number>} num
 */
function applyMask(mask, num) {
	for (let i = 0; i < mask.length; i++) {
		let m = mask[i];
		if (m === '1') {
			num[i] = 1;
		} else if (m === '0') {
			num[i] = 0;
		}
	}
	return num;
}

function binaryArrayToDecimal(arr) {
	return parseInt(arr.join(''), 2);
}

function run(input) {
	let memory = {};
	let current_mask;
	for (line of input) {
		const { type, address, value } = line;
		if (type === 'mask') {
			current_mask = value;
		} else {
			applyMask(current_mask, value);
			memory[address] = binaryArrayToDecimal(value);
		}
	}

	return Object.values(memory).reduce((a, b) => a + b, 0);
}

console.log(run(input));
