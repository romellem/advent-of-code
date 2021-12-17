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

const path = giant_grid
	.getShortestWeightedPath(0, 0, giant_grid.max_x, giant_grid.max_y)

// Create a lookup of the points within our path
const points = path.reduce((obj, p) => {
	obj[p] = true;
	return obj;
}, {});

let grid_arr = giant_grid.toGrid();

for (let y = 0; y < grid_arr.length; y++) {
	for (let x = 0; x < grid_arr[y].length; x++) {
		// If this point is in our path, wrap it in `<i>` tags 
		if (points[`${x},${y}`]) {
			grid_arr[y][x] = `<i>${grid_arr[y][x]}</i>`;
		}
	}
}

let main_html = grid_arr.map((row) => row.join('')).join('\n<br>\n');
console.log(/* html */ `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
			@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600;700&display=swap');

			*,
			*::before,
			*::after {
				box-sizing: border-box;
			}
			body {
				font-family: 'Source Code Pro', monospace;
				background: #0f0f23;
				color: #cccccc;
				margin: 0;
				font-size: 6px;
				line-height: 0.8;

				/* Needed because our content is super wide, otherwise body would be as wide as the viewport */
				width: fit-content;
			}

			main {
				padding: 2em;
			}

			i {
				font-style: normal;
				color: #00cc00;
				text-shadow: 0 0 2px #00cc00, 0 0 5px #00cc00;
			}
		</style>
	</head>
	<body>
		<main>
			${main_html}
		</main>
	</body>
</html>
`);
