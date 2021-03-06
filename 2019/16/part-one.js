const { input } = require('./input');

var fillPattern = (function () {
	let cachedPatterns = {};

	return (n) => {
		if (cachedPatterns[n]) {
			return cachedPatterns[n];
		}

		let pattern = [];
		for (let num of [0, 1, 0, -1]) {
			for (let i = 0; i < n; i++) {
				pattern.push(num);
			}
		}

		// Offset the whole pattern left by one
		let first_digit = pattern.shift();
		pattern.push(first_digit);

		cachedPatterns[n] = pattern;

		return pattern;
	};
})();

let current = input;

for (let phase = 1; phase <= 100; phase++) {
	let new_arr = [];
	for (let n = 0; n < current.length; n++) {
		let pattern = fillPattern(n + 1);
		let sum = 0;
		for (let i = 0; i < current.length; i++) {
			let v = current[i];
			let index = i % pattern.length;
			let new_val = v * pattern[index];

			sum += new_val;
		}

		let last_char = String(sum).substr(-1, 1);
		let last_digit = parseInt(last_char, 10);

		new_arr.push(last_digit);
	}

	current = new_arr;
}

let first_eight_digits = current.slice(0, 8).join('');
console.log(first_eight_digits);
