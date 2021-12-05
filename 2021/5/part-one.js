const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

const grid = new InfiniteGrid();

function* range(from, to) {
	let step = to > from ? 1 : -1;
	let steps = Math.abs(from - to) + 1;

	let value = from;
	while (steps--) {
		yield value;
		value += step;
	}
}

for (let { from, to } of input) {
	let [from_x, from_y] = from;
	let [to_x, to_y] = to;

	// For now, only consider horizontal and vertical lines
	if (!(from_x === to_x || from_y === to_y)) {
		continue;
	}

	if (from_x === to_x) {
		let x = from_x;
		for (let y of range(from_y, to_y)) {
			let count = grid.get(x, y);
			grid.set(x, y, count + 1);
		}
	}

	if (from_y === to_y) {
		let y = from_y;
		for (let x of range(from_x, to_x)) {
			let count = grid.get(x, y);
			grid.set(x, y, count + 1);
		}
	}
}

let two_cells = 0;
for (let [id, value] of grid) {
	if (value >= 2) {
		two_cells++;
	}
}
console.log(two_cells);
