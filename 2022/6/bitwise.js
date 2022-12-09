/**
 * Was trying to think if there was a way to reduce the `O(n)` operation
 * of looking at your "sliding window," and was wondering if you could do
 * some bitwise magic. Looking at unique characters, there are 18 (at least
 * in my input), so if you had 18 numbers, each with a single 1 bit present
 * at positions 1-18, you don't get too large of numbers (largest is 262144).
 * Could you then `AND` them and count the on bits until you have 4 or 14?
 * Counting the on bits may be your `O(n)` operation though, unless you just
 * hard coded a map of 2^18 values, and marked the ones that had at least 4
 * and 14 bits.
 *
 * Saving this partial work just for fun.
 */

const { input } = require('./input');

const chars = [...new Set(input)];
const chars_lookup = chars.sort().reduce((acc, char, i) => {
	acc[char] = 1 << i;
	return acc;
}, {});

function findFirstIndexOfUniqueLastN(n) {
	const stack = [];
	let total = 0;
	for (let i = 0; i < input.length; i++) {
		const char = input[i];
		const char_num = chars_lookup[char];
		stack.push(chars_lookup[char]);
		total = total | char_num;
		if (stack.length === n) {
		}
	}
}
