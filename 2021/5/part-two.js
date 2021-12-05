const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

const grid = new InfiniteGrid();

// All diagonals are `y = x` or `y = -x`
function* range([from_x, from_y], [to_x, to_y]) {
	let step_x = to_x === from_x ? 0 : to_x > from_x ? 1 : -1;
	let step_y = to_y === from_y ? 0 : to_y > from_y ? 1 : -1;
	let steps_x = Math.abs(from_x - to_x) + 1;
	let steps_y = Math.abs(from_y - to_y) + 1;

	// If we are going horizontal or vertical, one of our steps is 0, so take the larger of the two
	let steps = Math.max(steps_x, steps_y);

	// Error checking
	let slope = Math.abs((to_y - from_y) / (to_x - from_x));
	if (!(slope === 1 || slope === 0 || slope === Infinity)) {
		throw new Error(
			`Invalid slope, ${slope}: [${from_x}, ${from_y}] -> [${to_x}, ${to_y}]`
		);
	}

	let value_x = from_x;
	let value_y = from_y;
	while (steps--) {
		yield [value_x, value_y];
		value_x += step_x;
		value_y += step_y;
	}
}

for (let { from, to } of input) {
	for (let [x, y] of range(from, to)) {
		let count = grid.get(x, y);
		grid.set(x, y, count + 1);
	}
}

let two_cells = 0;
for (let [id, value] of grid) {
	if (value >= 2) {
		two_cells++;
	}
}
console.log(two_cells);
