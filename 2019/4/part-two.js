const { uniq } = require('lodash');
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
	if (!all_increasing_digits) {
		// Skip checking for double digits being a part of a larger group, we already have a failure
		continue;
	}

	/**
	 * Test that the double digit isn't a part of a larger group
	 */

	// '111122'.matchAll(re) -> [["11", "1"], ["11", "1"], ["22", "2"]]
	let full_matches = [...n_str.matchAll(/(\d)\1/g)];

	// [["11", "1"], ["11", "1"], ["22", "2"]] -> ["11", "11", "22"]
	let full_matches_mapped = full_matches.map(v => v[0]);

	// ["11", "11", "22"] -> ["11", "22"]
	let matches = uniq(full_matches_mapped);

	/**
	 * Look at all double matches. If the first occurance of that
	 * double match is the same as the last occurance, then we know
	 * it isn't a part of a larger group.
	 *
	 * '11122'.indexOf('11') === 0
	 * '11122'.lastIndexOf('11') === 1
	 * 0 !== 1
	 *
	 * So '11' is a part of a larger group ('111' in this case)
	 *
	 * However, by using the `.some` method, we only need 1 of the matches
	 * to not be a part of a larger group
	 *
	 * '11122'.indexOf('22') === 3
	 * '11122'.lastIndexOf('22') === 3
	 * 3 === 3
	 *
	 * So '22' is _not_ a part of a larger group
	 */
	let all_matches_are_not_a_part_of_larger_group = matches.some(run => {
		let start = n_str.indexOf(run);
		let end = n_str.lastIndexOf(run);

		return start === end;
	});

	if (all_matches_are_not_a_part_of_larger_group) {
		count++;
	}
}

console.log(count);
