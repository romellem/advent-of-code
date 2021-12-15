const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');
const jsnx = require('jsnetworkx');

let grid = new InfiniteGrid({
	load: input,
	parseAs: Number,
});

function createDirectedGraphFromGrid() {
	const G = new jsnx.DiGraph();

	for (let [id, vvv] of grid) {
		let [x, y] = InfiniteGrid.toCoords(id);
		for (let [n_id, { coord, value }] of grid.neighbors(x, y)) {
			G.addEdge(id, InfiniteGrid.toId(...coord), { weight: value });
		}
	}

	return G;
}

function getShortestPathToTarget(digraph) {
	return jsnx.dijkstraPath(digraph, {
		// From `0,0 with Torch equipped`, to our `target, also with the torch equipped`
		source: `0,0`,
		target: `${grid.max_x},${grid.max_y}`,
	});
}

const path = getShortestPathToTarget(createDirectedGraphFromGrid());
console.log(path.map((p) => grid.grid.get(p)).reduce((a, b) => a + b));

// );
