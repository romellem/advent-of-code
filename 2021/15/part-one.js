const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

const grid = new InfiniteGrid({
	load: input,
	parseAs: Number,
});

const path = grid.getShortestWeightedPath(0, 0, grid.max_x, grid.max_y, { include_from: false });
const path_sum = path.reduce((sum, cell_id) => sum + grid.grid.get(cell_id), 0);

console.log(path_sum);
