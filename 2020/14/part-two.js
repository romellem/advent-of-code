const { input } = require('./input');

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
			let a = val.slice(0, x) + '0' + val.slice(x + 1);
			let b = val.slice(0, x) + '1' + val.slice(x + 1);
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

function applyMaskOverMemoryAddress(_mask, _addr) {
	let mask = _mask.split('');
	let address = _addr.toString(2).padStart(36, '0').split('');
	for (let i = 0; i < mask.length; i++) {
		let m = mask[i];
		if (m === '1') {
			address[i] = '1';
		} else if (m === 'X') {
			address[i] = '1';
		}
	}

	return address.join('');
}

function run(input) {
	let memory = {};
	// let current_addresses_to_write_to;
	let current_mask;
	for (line of input) {
		const { type, address, value } = line;
		if (type === 'mask') {
			current_mask = value;
			// current_addresses_to_write_to = floatingToPossibilites([value]).map(a => parseInt(a, 2));
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
