const { input } = require('./input');

// Memoized
const fuelCostFrom = (() => {
	const cache = new Map();

	return (position) => {
		if (!cache.has(position)) {
			let distance = 0;
			for (let other_position of input) {
				distance += Math.abs(position - other_position);
			}
			cache.set(position, distance);
		}

		return cache.get(position);
	};
})();

let min_position = -1;
let min_distance = Number.MAX_SAFE_INTEGER;
for (let position of input) {
	let distance = fuelCostFrom(position);

	if (distance < min_distance) {
		min_position = position;
		min_distance = distance;
	}
}

console.log(min_distance, `(At position ${min_position})`);
