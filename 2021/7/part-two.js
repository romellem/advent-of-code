const { input } = require('./input');

const fuelCostFrom = (from, to) => {
	const range = Math.abs(from - to);

	// Thank you Gauss
	// @see https://en.wikipedia.org/wiki/Triangular_number
	return (range * (range + 1)) / 2;
}

let min_position = -1;
let min_distance = Number.MAX_SAFE_INTEGER;
for (let position_a of input) {
	let distance = 0;
	for (let position_b of input) {
		distance += fuelCostFrom(position_a, position_b);
	}

	if (distance < min_distance) {
		min_position = position_a;
		min_distance = distance;
	}
}

console.log(min_distance, `(At position ${min_position})`);
