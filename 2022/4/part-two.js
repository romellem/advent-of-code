const { input } = require('./input');
const { intersection, range } = require('./utils');

const intersectingPairs = input.filter(([a, b]) => {
	const a_range = range(...a);
	const b_range = range(...b);
	const overlapping = intersection(a_range, b_range);

	return overlapping.length > 0;
});

console.log(intersectingPairs.length);
