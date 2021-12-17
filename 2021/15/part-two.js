const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');
const jsnx = require('jsnetworkx');
const { concat } = require('lodash');

let grid = new InfiniteGrid({
	load: input,
	parseAs: Number,
});

function increaseGrid(grid) {
	let new_grid = new InfiniteGrid();
	for (let [id, value] of grid) {
		let new_vale = value + 1;
		if (new_vale > 9) {
			new_vale = 1;
		}

		new_grid.grid.set(id, new_vale);
	}

	return new_grid;
}

function concatGrids(...grids) {
	let rows = [];
	for (let i = 0; i < grids.length; i++) {
		let grid = grids[i];
		let inner_rows = grid.toString().split('\n');
		for (let j = 0; j < inner_rows.length; j++) {
			if (rows[j] === undefined) {
				rows[j] = '';
			}
			rows[j] += inner_rows[j];
		}
	}

	return rows.join('\n');
}

function buildGridOutDiagonally(grid, copies = 5) {
	let rows = [];
	for (let y = 0; y < copies; y++) {
		let first_col = rows.length ? rows[rows.length - 1][1] : grid;
		let row_of_grids = [first_col];

		// a b c d e
		// b c d e f
		// c d e f g
		// d e f g h
		// e f g h i
		for (let x = 1; x < copies; x++) {
			let current_col = row_of_grids[row_of_grids.length - 1];
			row_of_grids.push(increaseGrid(current_col));
		}

		rows.push(row_of_grids);
	}

	console.log(
		'new subgrids',
		rows.map((v) => v.length).reduce((a, b) => a + b)
	);
	process.exit(1);

	// [[a, b, c, d, e]];

	const rows_strs = rows.map((row) => concatGrids(...row));
	console.log();
	const giant_grid_input = rows.map((row) => concatGrids(...row)).join('\n');
	console.log(giant_grid_input);
	process.exit(1);

	return new InfiniteGrid({
		load: giant_grid_input,
		parseAs: Number,
	});
}

const giant_grid = buildGridOutDiagonally(grid, 5);
const path = giant_grid.getShortestWeightedPath(0, 0, giant_grid.max_x, giant_grid.max_y, {
	include_from: false,
});
const path_sum = path.reduce((sum, cell_id) => sum + giant_grid.grid.get(cell_id), 0);

console.log(path_sum);
