const { sampleInput: input } = require('./input.js');
const grid = input.split('\n').map((row) => row.split(''));

const clone = (o) => JSON.parse(JSON.stringify(o));

const grid_a = grid;
const grid_b = clone(grid);
const grid_c = clone(grid);
const grid_d = clone(grid);

grid_a.name = 'grid_a';
grid_b.name = 'grid_b';
grid_c.name = 'grid_c';
// grid_d.name = 'grid_d';

const grids = [grid_a, grid_b, grid_c /*, grid_d*/];

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

function print(grid) {
	console.log(grid.map((row) => row.join('')).join('\n'));
}

let halfCount = 0;
const directions = ['>', 'v'];
function step() {
	let something_moved = false;
	for (let d = 0; d < directions.length; d++) {
		let direction = directions[d];
		const previous_grid =
			halfCount === 0 ? grids[grids.length - 1] : grids[(halfCount - 1) % grids.length];
		const grid = grids[halfCount++ % grids.length];
		const new_grid = grids[halfCount % grids.length];

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				let cell = grid[y][x];

				previous_grid[y][x] = cell;
				if (cell === direction) {
					// Try to move
					updateNeighborCoord(x, y, cell, grid);
					// console.log(`${cell}: ${x},${y} -> ${neighborCoord.x},${neighborCoord.y}`);
					const neighbor = grid[neighborCoord.y][neighborCoord.x];
					if (neighbor === '.') {
						something_moved = true;
						new_grid[neighborCoord.y][neighborCoord.x] = cell;
						new_grid[y][x] = '.';
					} else {
						new_grid[y][x] = cell;
					}
				} else if (cell !== '.') {
					new_grid[y][x] = cell;
				}
			}
		}

		console.log(halfCount / 2);
		print(new_grid);
		console.log('----------\n');
	}

	return something_moved;
}

function run() {
	console.log(halfCount / 2);
	print(grids[halfCount % grids.length]);
	console.log('----------\n');

	let moved;
	do {
		moved = step();
	} while (moved);

	return halfCount / 2;
}

console.log(run());
