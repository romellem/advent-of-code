const { input } = require('./input.js');
const grid = input.split('\n').map((row) => row.split(''));

const clone = (o) => JSON.parse(JSON.stringify(o));

const grid_a = grid;
const grid_b = clone(grid);
const grids = [grid_a, grid_b];

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
function halfStep(direction) {
	const grid = grids[halfCount++ % 2];
	const new_grid = grids[halfCount % 2];

	let something_moved = false;
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			let cell = grid[y][x];
			if (cell === '.') {
				new_grid[y][x] = '.';
			} else {
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
			}
		}
	}

	return something_moved;
}

function step() {
	let east = halfStep('>');
	let west = halfStep('v');

	return east || west;
}

function run() {
	let moved;
	do {
		moved = step();
	} while (moved);

	return halfCount / 2;
}

console.log(run());
