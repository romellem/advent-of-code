// Performs much better for larger inputs because:
// - We don't generate long arrays for patterns
const { input } = require('./input');

const base_pattern = [0, 1, 0, -1];
let current = input;

for (let phase = 1; phase <= 100; phase++) {
	let new_arr = [];
	for (let n = 0; n < current.length; n++) {
		let sum = 0;

		let index = 0;
		let position = n + 1;
		for (let i = 0; i < current.length; i++) {
			position--;
			if (position <= 0) {
				position = n + 1;
				index = (index + 1) % base_pattern.length;
			}

			let v = current[i];
			let scalar = base_pattern[index];
			let new_val = v * scalar;

			sum += new_val;
		}

		let last_digit = Math.abs(sum % 10);

		new_arr.push(last_digit);
	}

	current = new_arr;
}

let first_eight_digits = current.slice(0, 8).join('');
console.log(first_eight_digits);
