const { InfiniteGrid } = require('./infinite-grid');
const grid_str = require('./frontier.js');

let grid = new InfiniteGrid({
	defaultFactory: (x, y) => ' ',
	walls: {
		'#': true,
	},
});
grid.import(grid_str);

let [, [start_x, start_y]] = grid.findAll('O').pop();
let frontier = grid.buildFrontierFrom(start_x, start_y);

let max_cell = { distance: 0 };
for (let cell of frontier.values()) {
	if (cell.distance > max_cell.distance) {
		max_cell = cell;
	}
}

console.log(max_cell.distance);
