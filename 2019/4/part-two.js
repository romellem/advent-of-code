const matchAll = require('string.prototype.matchall');
const { uniq } = require('lodash');

let count = 0;
for (let n = 138241; n <= 674034; n++) {
	let n_str = String(n);
	let n_arr = n_str.split('').map(v => +v);

	const has_double_digit = /(\d)\1/g.test(n_str);
	const all_increasing_digits = n_arr.every((c, i, a) =>
		i === a.length - 1 ? true : c <= a[i + 1]
	);

	if (has_double_digit && all_increasing_digits) {
		// Test that the double digit isn't a part of a larger group

		// '111122' -> [["11", "1"], ["11", "1"], ["22", "2"]]
		let full_matches = [...matchAll(n_str, /(\d)\1/g)];

		// ["11", "11", "22"]
		let full_matches_mapped = full_matches.map(v => v[0]);

		// ["11", "22"]
		let matches = uniq(full_matches_mapped);

		let all_matches_are_not_a_part_of_larger_group = matches.some(run => {
			let start = n_str.indexOf(run);
			let end = n_str.lastIndexOf(run);

			return start === end;
		});

		if (all_matches_are_not_a_part_of_larger_group) {
			count++;
		}
	}
}

console.log(count);
