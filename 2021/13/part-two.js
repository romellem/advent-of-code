const { input, folds } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

let grid = new InfiniteGrid({
	defaultFactory: () => 0,
	string_map: {
		0: ' ',
		1: '#',
	},
});

for (let [x, y] of input) {
	grid.set(x, y, 1);
}

for (let { axis, line } of folds) {
	let points_to_fold_across = [];
	for (let [id, cell] of grid) {
		// This shouldn't happen, but just in case
		if (cell === 0) {
			continue;
		}

		let [x, y] = InfiniteGrid.toCoords(id);
		const compare = axis === 'x' ? x : y;

		if (compare < line) {
			// This point is above / to the left of the line, it stays
			continue;
		}

		// This point is below the line (if folding along y) or to the right (if folding along x)
		points_to_fold_across.push([x, y]);
	}

	for (let [x, y] of points_to_fold_across) {
		if (axis === 'x') {
			let new_x = line - Math.abs(x - line);
			grid.set(new_x, y, 1);
		} else {
			let new_y = line - Math.abs(y - line);
			grid.set(x, new_y, 1);
		}

		// Remove point from grid map directly. Don't worry about resizing just yet, we can do that at the very end.
		grid.grid.delete(InfiniteGrid.toId(x, y));
	}
}

grid.resize();

console.log(grid.toString());
