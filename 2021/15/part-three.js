const { green, red } = require('colors/safe');
const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');
const jsnx = require('jsnetworkx');

let grid = new InfiniteGrid({
	load: input,
	parseAs: Number,
});

function increaseGrid(_grid) {
	let new_grid = _grid.clone();
	for (let [id, vvv] of new_grid) {
		let new_vale = vvv + 1;
		if (new_vale > 9) {
			new_vale = 1;
		}

		new_grid.grid.set(id, new_vale);
	}

	return new_grid;
}

let a = grid;
let b = increaseGrid(a); // 1
let c = increaseGrid(b); // 2
let d = increaseGrid(c); // 3
let e = increaseGrid(d); // 4
let f = increaseGrid(e); // 5
let g = increaseGrid(f); // 6
let h = increaseGrid(g); // 7
let i = increaseGrid(h); // 8
// let j = increaseGrid(i); // 9
// let k = increaseGrid(i); // 10 -< orig grid

const concatGrids = (...grids) => {
	let rows = [];
	for (let i = 0; i < grids.length; i++) {
		let g = grids[i];
		let inner_rows = g.toString().split('\n');
		for (let j = 0; j < inner_rows.length; j++) {
			if (rows[j] === undefined) {
				rows[j] = '';
			}
			rows[j] += inner_rows[j];
		}
	}

	return rows.join('\n');
};

let row1 = concatGrids(a, b, c, d, e);
let row2 = concatGrids(b, c, d, e, f);
let row3 = concatGrids(c, d, e, f, g);
let row4 = concatGrids(d, e, f, g, h);
let row5 = concatGrids(e, f, g, h, i);

let GGG = [row1, row2, row3, row4, row5].join('\n');

let giant_grid = new InfiniteGrid({
	load: GGG,
	parseAs: Number,
});

// console.log(giant_grid.toString());

function createDirectedGraphFromGrid() {
	const G = new jsnx.DiGraph();

	for (let [id, vvv] of giant_grid) {
		let [x, y] = InfiniteGrid.toCoords(id);
		for (let [n_id, { coord, value }] of giant_grid.neighbors(x, y)) {
			G.addEdge(id, InfiniteGrid.toId(...coord), { weight: value });
		}
	}

	return G;
}

function getShortestPathToTarget(digraph) {
	return jsnx.dijkstraPath(digraph, {
		// From `0,0 with Torch equipped`, to our `target, also with the torch equipped`
		source: `0,0`,
		target: `${giant_grid.max_x},${giant_grid.max_y}`,
	});
}

const path = getShortestPathToTarget(createDirectedGraphFromGrid()).map((p) =>
	InfiniteGrid.toCoords(p)
);

const points = path.reduce((obj, p) => {
	obj[p] = true;
	return obj;
}, {});

let grid_arr = giant_grid.toGrid();

for (let y = 0; y < grid_arr.length; y++) {
	for (let x = 0; x < grid_arr[y].length; x++) {
		// grid_arr[y][x] = points[`${x},${y}`] ? green('' + grid_arr[y][x]) : '' + grid_arr[y][x];
		grid_arr[y][x] = points[`${x},${y}`] ? `<i>${grid_arr[y][x]}</i>` : '' + grid_arr[y][x];
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
				margin: 30px;
				font-size: 6px;
				line-height: 0.8;

				/* width: 9000px; */
				width: 110%;
			}

			main {
				padding: 2em;
				margin-right: 4em;
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
