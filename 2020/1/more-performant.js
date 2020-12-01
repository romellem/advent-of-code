const { input } = require('./input');

input.sort((a, b) => a - b);
const num_map = input.reduce((obj, v) => ((obj[v] = true), obj), {});

const SUM = 2020;

/**
 * Part One.
 *
 * Loop our list and algebraicially determine if
 * a 2nd number that sums to 2020 exisits
 */

for (let a of input) {
	let b = SUM - a;
	if (num_map[b]) {
		console.log({ a, b });
		console.log('a * b = ', a * b);
		break;
	}
}

/**
 * Part Two.
 *
 * Loop our list again, but this time, first find the _remaining_
 * sum. Then, loop our list again. Skip the numbers we have already checked,
 * and bail if we arrive at a number that already sums greater than 2020
 * (we can do this because the list is sorted). Then, check if a third number
 * exists that sums up to 2020 with those two previously picked numbers.
 *
 * Put another way, pick a number `a`. Find all the numbers for `b` such that
 * they are less than `2020 - a` and greater than `a`. Then, check if a number
 * `c = 2020 - (a + b)` exists. If so, exit the full loop. Otherwise,
 * continue searching for `b` values. If we reach the end of `b`, continue
 * from the start with the next `a`.
 */

outer: for (let i = 0; i < input.length; i++) {
	let a = input[i];
	let b_c = SUM - a;

	for (let j = i + 1; j < input.length; j++) {
		let b = input[j];
		if (b >= b_c) {
			break;
		}

		let c = SUM - (a + b);
		if (num_map[c]) {
			console.log({ a, b, c });
			console.log('a * b * c = ', a * b * c);
			break outer;
		}
	}
}
