const Jimp = require('jimp');
const fs = require('fs-extra');

const RED_500 = Jimp.cssColorToHex('#FF206E');
const RED_400 = Jimp.cssColorToHex('#FF0A60');
const RED_300 = Jimp.cssColorToHex('#F50056');
const RED_200 = Jimp.cssColorToHex('#E0004F');
const RED_100 = Jimp.cssColorToHex('#CC0047');

const YELLOW_500 = Jimp.cssColorToHex('#FBFF12');
const YELLOW_400 = Jimp.cssColorToHex('#FBFF0A');
const YELLOW_300 = Jimp.cssColorToHex('#F1F500');
const YELLOW_200 = Jimp.cssColorToHex('#DDE000');
const YELLOW_100 = Jimp.cssColorToHex('#C9CC00');

const { input } = require('./input.js');
const grid = input.split('\n').map((row) => row.split(''));

const clone = (o) => JSON.parse(JSON.stringify(o));

const grid_a = grid;
const grid_b = clone(grid);
const grid_c = clone(grid);
const grids = [grid_a, grid_b, grid_c];

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

		const grid = grids[halfCount++ % grids.length];
		const new_grid = grids[halfCount % grids.length];
		const previous_grid = grids[(halfCount + 1) % grids.length];

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
				} else if (cell !== '.') {
					new_grid[y][x] = cell;
				}

				// Keep the previous grid up to date with the instantaneous changes in the new_grid
				previous_grid[y][x] = new_grid[y][x];
			}
		}

		// console.log(halfCount / 2);
		// print(new_grid);
		// console.log('----------\n');
	}

	return something_moved;
}

function run() {
	// console.log(halfCount / 2);
	// print(grids[halfCount % grids.length]);
	// console.log('----------\n');

	let moved;
	do {
		moved = step();
	} while (moved);

	return halfCount / 2;
}

console.log(run());
