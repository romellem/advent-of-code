const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

let grid = new InfiniteGrid({
	load: input,
	parseAs: Number,
});

function increaseGrid(grid) {
	let new_grid = grid.clone({ empty: true });
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
			// Concat individual rows across
			rows[j] += inner_rows[j];
		}
	}

	// Finally join all rows together
	return rows.join('\n');
}

/**
 * If I have a grid `a`, and if I "increase that grid by 1" to give me `b`, and increasing
 * `b` by 1 gives me `c`, etc., then expanding a grid to be 3x3 gives me a
 * new grid that looks like:
 *
 *     a b c
 *     b c d
 *     c d e
 *
 * You can see that subgrid `b` is copied "diagonally," and similarly for `c` and `d`.
 *
 * So I don't have to make unique grids for each cell. In this 3x3 expanded grid, I only have
 * 5 unique grids [a, b, c, d, e ] among the 9 cells.
 */
function buildGridOutDiagonally(grid, copies = 5) {
	let row_of_grids = [grid];
	// The first row requires the most amount of work, because we only get to reuse the first cell
	for (let x = 1; x < copies; x++) {
		let last_col = row_of_grids[row_of_grids.length - 1];
		row_of_grids.push(increaseGrid(last_col));
	}

	let rows = [row_of_grids];

	// After that, we can reuse all except 1 of the previously generated grids in the next row
	for (let y = 1; y < copies; y++) {
		let last_row = rows[rows.length - 1];
		let last_col = last_row[last_row.length - 1];

		// Copy all grids except the first one
		row_of_grids = last_row.slice(1);
		row_of_grids.push(increaseGrid(last_col));

		rows.push(row_of_grids);
	}

	/**
	 * Now concatenate all rows to create wide "1 col" row strings,
	 * then join on '\n' to create a GIANT grid we can load into a new grid.
	 */
	const giant_grid_input = rows.map((row) => concatGrids(...row)).join('\n');

	// Load this new input to create our new larger grid to pathfind on
	return new InfiniteGrid({
		load: giant_grid_input,
		parseAs: Number,
	});
}

const giant_grid = buildGridOutDiagonally(grid, 5);

// Same steps as before
const path = giant_grid.getShortestWeightedPath(0, 0, giant_grid.max_x, giant_grid.max_y, {
	include_from: false,
});
const path_sum = path.reduce((sum, cell_id) => sum + giant_grid.grid.get(cell_id), 0);

console.log(path_sum);
