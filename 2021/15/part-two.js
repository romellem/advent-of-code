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

const path = getShortestPathToTarget(createDirectedGraphFromGrid());
const sum = path.map((p) => giant_grid.grid.get(p)).reduce((a, b) => a + b);
const without_upper_left = sum - giant_grid.get(0, 0);

console.log(without_upper_left);

// );
