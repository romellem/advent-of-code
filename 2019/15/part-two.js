const path = require('path');
const fs = require('fs');
const { InfiniteGrid } = require('./infinite-grid');

const grid_str = fs.readFileSync(path.join(__dirname, 'grid.txt'), 'utf8').toString();

let grid = new InfiniteGrid({
	defaultFactory: (x, y) => ' ',
	walls: {
		'#': true,
	},
});
grid.import(grid_str);

let [found] = grid.findAll('O');
let [, [start_x, start_y]] = found;
let frontier = grid.buildFrontierFrom(start_x, start_y);

let max_cell = { distance: 0 };
for (let cell of frontier.values()) {
	if (cell.distance > max_cell.distance) {
		max_cell = cell;
	}
}

console.log(max_cell);
