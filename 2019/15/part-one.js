const { InfiniteGrid } = require('./infinite-grid');
const grid_str = require('./frontier.js');

let grid = new InfiniteGrid({
	defaultFactory: (x, y) => ' ',
	walls: {
		'#': true,
	},
});
grid.import(grid_str);

let [, start_coords] = grid.findAll('X').pop();
let [, end_coords] = grid.findAll('O').pop();

let distance = grid.shortestDistance(start_coords, end_coords);
console.log(distance);
