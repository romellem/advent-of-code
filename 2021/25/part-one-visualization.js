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

const BLACK_100 = Jimp.cssColorToHex('#0C0F0A');

const NEXT_COLOR = new Map([
	[RED_500, RED_400],
	[RED_400, RED_300],
	[RED_300, RED_200],
	[RED_200, RED_100],
	[RED_100, RED_100],
	[YELLOW_500, YELLOW_400],
	[YELLOW_400, YELLOW_300],
	[YELLOW_300, YELLOW_200],
	[YELLOW_200, YELLOW_100],
	[YELLOW_100, YELLOW_100],
	[BLACK_100, BLACK_100],
]);

const INITIAL_COLOR = new Map([
	['>', RED_100],
	['v', YELLOW_100],
	['.', BLACK_100],
]);

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

function getImageArray(imageGrid, moved) {
	// const image = await new Promise((resolve, reject) => {
	// 	new Jimp(grid[0].length, grid.length, '#FFFFFF', (err, image) =>
	// 		err ? reject(err) : resolve(image)
	// 	);
	// });
	const image = clone(imageGrid);
	for (let y = 0; y < imageGrid.length; y++) {
		for (let x = 0; x < imageGrid[y].length; x++) {
			const coord = `${x},${y}`;
			const cell = imageGrid[y][x];
			if (moved.has(coord)) {
				image[y][x] = moved.get(coord) === '>' ? RED_500 : YELLOW_500;
			} else {
				image[y][x] = NEXT_COLOR.get(cell);
			}
		}
	}

	return image;
}

async function writeImages(imageGrids) {
	const frames_length = String(imageGrids.length).length;
	fs.emptyDirSync('frames');

	for (let i = 0; i < imageGrids.length; i++) {
		const imageGrid = imageGrids[i];
		let image = await new Promise((resolve, reject) => {
			new Jimp(imageGrid[0].length, imageGrid.length, '#FFFFFF', (err, image) =>
				err ? reject(err) : resolve(image)
			);
		});

		for (let y = 0; y < imageGrid.length; y++) {
			for (let x = 0; x < imageGrid[y].length; x++) {
				image.setPixelColor(imageGrid[y][x], x, y);
			}
		}

		image = image.scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR);
		const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

		const fileName = `frames/frame_${i.toString().padStart(frames_length, '0')}.png`;
		fs.writeFileSync(fileName, buffer);
	}
}

function step() {
	const moved = new Map();
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
						new_grid[neighborCoord.y][neighborCoord.x] = cell;
						new_grid[y][x] = '.';

						moved.set(`${neighborCoord.x},${neighborCoord.y}`, cell);
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

	return moved;
}

async function run() {
	let lastImageGrid = clone(grids[0]);
	for (let y = 0; y < lastImageGrid.length; y++) {
		for (let x = 0; x < lastImageGrid[y].length; x++) {
			lastImageGrid[y][x] = INITIAL_COLOR.get(lastImageGrid[y][x]);
		}
	}
	let imageGrids = [lastImageGrid];

	let moved;
	do {
		moved = step();
		let newImageGrid = getImageArray(imageGrids[imageGrids.length - 1], moved);
		imageGrids.push(newImageGrid);
	} while (moved.size);

	await writeImages(imageGrids);

	return halfCount / 2;
}

run().then((count) => console.log(count));
