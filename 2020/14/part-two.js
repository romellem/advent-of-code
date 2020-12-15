const { input: raw_input } = require('./input');

// Process the input specifically for Part Two
const input = raw_input.map((instruction) => {
	let { type, address } = instruction;
	if (type === 'write') {
		// Convert the address to an array of 1s and 0s
		let address_as_binary_num_arr = address
			.toString(2)
			.padStart(36, '0')
			.split('')
			.map((v) => +v);
		return {
			...instruction,
			address: address_as_binary_num_arr,
		};
	} else {
		return instruction;
	}
});

/**
 * @param {Array} val
 * @returns {Array<String>}
 */
function floatingToPossibilites(vals) {
	let pushed = false;
	let new_vals = [];
	for (let val of vals) {
		let x = val.indexOf('X');
		if (x > -1) {
			let a = `${val.slice(0, x)}0${val.slice(x + 1)}`;
			let b = `${val.slice(0, x)}1${val.slice(x + 1)}`;
			new_vals.push(a, b);
			pushed = true;
		}
	}

	if (pushed) {
		return floatingToPossibilites(new_vals);
	} else {
		return vals;
	}
}

function applyMaskOverMemoryAddress(mask, _address) {
	let address = _address.slice(0);
	for (let i = 0; i < mask.length; i++) {
		let m = mask[i];
		if (m === '1' || m === 'X') {
			address[i] = m;
		}
	}

	return address.join('');
}

function run(input) {
	let memory = {};
	let current_mask;
	for (line of input) {
		const { type, address, value } = line;
		if (type === 'mask') {
			current_mask = value;
		} else {
			let masked_address = applyMaskOverMemoryAddress(current_mask, address);
			let current_addresses_to_write_to = floatingToPossibilites([masked_address]).map((a) =>
				parseInt(a, 2)
			);
			for (let addr of current_addresses_to_write_to) {
				memory[addr] = value;
			}
		}
	}

	return Object.values(memory).reduce((a, b) => a + b, 0);
}

console.log(run(input));
