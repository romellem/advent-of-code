const path = require('path');
const fs = require('fs');
const { InfiniteGrid } = require('./infinite-grid');

const grid_str = fs
	.readFileSync(path.join(__dirname, 'grid.txt'), 'utf8')
	.toString();

let grid = new InfiniteGrid({
	defaultFactory: (x, y) => ' ',
	walls: {
		'#': true,
	},
});
grid.import(grid_str);

let [found] = grid.findAll('X');
let [,[start_x, start_y]] = found;
let frontier = grid.buildFrontierFrom(start_x, start_y);

let grid_clone = grid.clone();
for (let [id, came_from] of frontier) {
	let [id_x, id_y] = InfiniteGrid.toCoords(id);
	let distance_ones = came_from.distance % 10;
	grid_clone.set(id_x, id_y, distance_ones);
}
grid_clone.set(start_x, start_y, 'X');


let max_cell = { distance: 0};
for (let cell of frontier.values()) {
	if (cell.distance > max_cell.distance) {
		max_cell = cell;
	}
}
grid_clone.set(max_cell.coord[0], max_cell.coord[1], '@');

console.log(grid_clone.toString());