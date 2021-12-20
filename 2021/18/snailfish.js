const red = (s) => require('util').format('\x1b[31m%s\x1b[0m', s);
const green = (s) => require('util').format('\x1b[32m%s\x1b[0m', s);
const yellow = (s) => require('util').format('\x1b[33m%s\x1b[0m', s);
const blue = (s) => require('util').format('\x1b[34m%s\x1b[0m', s);
const magenta = (s) => require('util').format('\x1b[35m%s\x1b[0m', s);
const cyan = (s) => require('util').format('\x1b[36m%s\x1b[0m', s);

const OPN = '[';
const CLS = ']';
const SEP = ',';

function add(...pairs) {
	let new_pair_tokens = [OPN];

	for (let i = 0; i < pairs.length; i++) {
		if (i !== 0) {
			// Join pairs on commas
			new_pair_tokens.push(SEP);
		}

		// Push pairs to keep from reparsing out digits
		new_pair_tokens.push(...pairs[i]);
	}
	new_pair_tokens.push(CLS);

	return new_pair_tokens;
}

function lastIndexOfDigit(pair, from_index) {
	for (let i = from_index - 1; i >= 0; i--) {
		let token = pair[i];

		if (typeof token === 'number') {
			return i;
		}
	}

	return -1;
}

function nextIndexOfDigit(pair, from_index) {
	for (let i = from_index + 1; i < pair.length; i++) {
		let token = pair[i];

		if (typeof token === 'number') {
			return i;
		}
	}

	return -1;
}

function reduce(pair, debug = false) {
	let depth;
	let did_reduce;
	let explode_index;
	let split_index;

	do {
		depth = 0;
		did_reduce = false;
		explode_index = null;
		split_index = null;

		for (let index = 0; index < pair.length; index++) {
			let token = pair[index];

			if (token === OPN) {
				depth++;
			} else if (token === CLS) {
				depth--;
			}

			// If we are nested inside 4 pairs, we are at a depth of 5
			if (depth === 5) {
				explode_index = index;

				// We immediately stop searching as soon as we find a pair that explodes
				break;
			}

			// We take the first split we find. Only is used if we aren't also expoding.
			if (split_index === null && typeof token === 'number' && token >= 10) {
				split_index = index;
			}
		}

		if (explode_index !== null || split_index !== null) {
			did_reduce = true;

			if (explode_index !== null) {
				//   0   1   2   3   4
				// ['[', 8, ',', 9, ']']
				// Here, 8 is value `a` at index 1, and `b` is value 9 at index 3.
				let a = pair[explode_index + 1];
				let b = pair[explode_index + 3];

				// "Exploding pairs will always consist of two regular numbers"
				// But just in case, check this. If not, I did something wrong
				if (typeof a !== 'number' || typeof b !== 'number') {
					console.error(`Oh no, found an exploding pair that isn't two digits!`);
					console.error(
						'pair:',
						pair.map((c, i) => (i === explode_index ? red(c) : c)).join('')
					);
					console.error('explode_index:', explode_index);
					console.error('a:', green(a));
					console.error('b:', green(b));
					console.error('depth:', depth);

					process.exit(1);
				}

				let a_left_digit_index = lastIndexOfDigit(pair, explode_index);
				let b_right_digit_index = nextIndexOfDigit(pair, explode_index + 3);
				if (a_left_digit_index > -1) {
					pair[a_left_digit_index] += a;
				}
				if (b_right_digit_index > -1) {
					pair[b_right_digit_index] += b;
				}

				// Remove the pair (5 tokens) and replace with digit 0
				pair.splice(explode_index, 5, 0);
			} else {
				// Split
				const digit_to_explode = pair[split_index];
				let a = Math.floor(digit_to_explode / 2);
				let b = Math.ceil(digit_to_explode / 2);

				// Splice in new pair
				pair.splice(split_index, 1, OPN, a, SEP, b, CLS);
			}
		}
	} while (did_reduce);

	return pair;
}

function magnitude(tokens) {
	while (tokens.includes(CLS)) {
		let close_index = tokens.indexOf(CLS);
		let open_index = tokens.lastIndexOf(OPN, close_index);

		//   0   1   2   3   4
		// ['[', 8, ',', 9, ']']
		let a = tokens[open_index + 1];
		let b = tokens[close_index - 1];

		// The magnitude of a pair is 3 times the magnitude of its left element plus 2 times the magnitude of its right element.
		const inner_magnitude = 3 * a + 2 * b;

		tokens.splice(open_index, 5, inner_magnitude);
	}

	return tokens[0];
}

module.exports = {
	add,
	reduce,
	magnitude,
};
