const { input } = require('./input');
const [range_start, range_end] = input;

let count = 0;
for (let n = range_start; n <= range_end; n++) {
	let n_str = String(n);

	const has_double_digit = /(\d)\1/.test(n_str);
	if (!has_double_digit) {
		// Skip checking for increasing digits, we already have a failure
		continue;
	}

	let n_arr = n_str.split('').map(v => +v);
	const all_increasing_digits = n_arr.every((c, i, a) =>
		i === a.length - 1 ? true : c <= a[i + 1]
	);

	// If we are here, we know we have a double digit
	if (all_increasing_digits) {
		count++;
	}
}

console.log(count);
