const { input } = require('./input.js');
const grid = input.split('\n').map((row) => row.split(''));

const clone = (o) => JSON.parse(JSON.stringify(o));

const grid_a = grid;
const grid_b = clone(grid);
const grid_c = clone(grid);
const grid_d = clone(grid);

grid_a.name = 'grid_a';
grid_b.name = 'grid_b';
grid_c.name = 'grid_c';
grid_d.name = 'grid_d';

const grids = [grid_a, grid_b, grid_c, grid_d];

let neighborCoord = { x: null, y: null };
function updateNeighborCoord(x, y, direction, grid) {
	let nx = direction === '>' ? x + 1 : x;
	let ny = direction === 'v' ? y + 1 : y;

	nx %= grid[0].length;
	ny %= grid.length;

	neighborCoord.x = nx;
	neighborCoord.y = ny;

	return neighborCoord;
}

let halfCount = 0;
const directions = ['>', 'v'];
function step() {
	let something_moved = false;
	for (let d = 0; d < directions.length; d++) {
		let direction = directions[d];
		const grid = grids[halfCount++ % grids.length];
		const new_grid = grids[halfCount % grids.length];

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				let cell = grid[y][x];
				if (cell === direction) {
					// Try to move
					updateNeighborCoord(x, y, cell, grid);
					const neighbor = grid[neighborCoord.y][neighborCoord.x];
					if (neighbor === '.') {
						something_moved = true;
						new_grid[neighborCoord.y][neighborCoord.x] = cell;
						new_grid[y][x] = '.';
					} else {
						new_grid[y][x] = cell;
					}
				} else {
					new_grid[y][x] = cell;
				}
			}
		}
	}

	return something_moved;
}

function run() {
	let moved;
	do {
		moved = step();
	} while (moved);

	return halfCount / 2;
}

console.log(run());
