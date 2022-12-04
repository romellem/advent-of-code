const { input } = require('./input');
const { range } = require('./utils');

const containedPairs = input.filter(([a, b]) => {
	const a_range = range(...a);
	const b_range = range(...b);
	const max_size = Math.max(a_range.length, b_range.length);

	const uniques = [...new Set(a_range.concat(b_range))];
	return uniques.length === max_size;
});

console.log(containedPairs.length);
