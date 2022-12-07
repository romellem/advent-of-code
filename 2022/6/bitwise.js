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
