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
	let points_below_right = [];
	let points_above_left = [];
	for (let [id, cell] of grid) {
		if (cell === 0) continue;

		let [x, y] = InfiniteGrid.toCoords(id);
		const compare = axis === 'x' ? x : y;
		if (compare < line) {
			points_above_left.push([x, y]);
		} else if (compare > line) {
			points_below_right.push([x, y]);
		} else {
			console.log('err');
		}
	}

	for (let [x, y] of points_below_right) {
		if (axis === 'x') {
			let new_x = line - Math.abs(x - line);
			grid.set(new_x, y, 1);
			grid.grid.delete(InfiniteGrid.toId(x, y));
		} else {
			let new_y = line - Math.abs(y - line);
			grid.set(x, new_y, 1);
			grid.grid.delete(InfiniteGrid.toId(x, y));
		}
	}
}

grid.resize();

console.log(grid.toString());
