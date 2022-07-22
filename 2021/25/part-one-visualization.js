const Jimp = require('jimp');
const fs = require('fs-extra');

const RED_0 = Jimp.cssColorToHex('hsl(339, 100%, 56%)');
const RED_1 = Jimp.cssColorToHex('hsl(339, 100%, 55%)');
const RED_2 = Jimp.cssColorToHex('hsl(339, 100%, 54%)');
const RED_3 = Jimp.cssColorToHex('hsl(339, 100%, 53%)');
const RED_4 = Jimp.cssColorToHex('hsl(339, 100%, 52%)');
const RED_5 = Jimp.cssColorToHex('hsl(339, 100%, 51%)');
const RED_6 = Jimp.cssColorToHex('hsl(339, 100%, 50%)');
const RED_7 = Jimp.cssColorToHex('hsl(339, 100%, 49%)');
const RED_8 = Jimp.cssColorToHex('hsl(339, 100%, 48%)');
const RED_9 = Jimp.cssColorToHex('hsl(339, 100%, 47%)');
const RED_10 = Jimp.cssColorToHex('hsl(339, 100%, 46%)');
const RED_11 = Jimp.cssColorToHex('hsl(339, 100%, 45%)');
const RED_12 = Jimp.cssColorToHex('hsl(339, 100%, 44%)');
const RED_13 = Jimp.cssColorToHex('hsl(339, 100%, 43%)');
const RED_14 = Jimp.cssColorToHex('hsl(339, 100%, 42%)');
const RED_15 = Jimp.cssColorToHex('hsl(339, 100%, 41%)');
const RED_16 = Jimp.cssColorToHex('hsl(339, 100%, 40%)');

const YELLOW_0 = Jimp.cssColorToHex('hsl(61, 100%, 56%)');
const YELLOW_1 = Jimp.cssColorToHex('hsl(61, 100%, 55%)');
const YELLOW_2 = Jimp.cssColorToHex('hsl(61, 100%, 54%)');
const YELLOW_3 = Jimp.cssColorToHex('hsl(61, 100%, 53%)');
const YELLOW_4 = Jimp.cssColorToHex('hsl(61, 100%, 52%)');
const YELLOW_5 = Jimp.cssColorToHex('hsl(61, 100%, 51%)');
const YELLOW_6 = Jimp.cssColorToHex('hsl(61, 100%, 50%)');
const YELLOW_7 = Jimp.cssColorToHex('hsl(61, 100%, 49%)');
const YELLOW_8 = Jimp.cssColorToHex('hsl(61, 100%, 48%)');
const YELLOW_9 = Jimp.cssColorToHex('hsl(61, 100%, 47%)');
const YELLOW_10 = Jimp.cssColorToHex('hsl(61, 100%, 46%)');
const YELLOW_11 = Jimp.cssColorToHex('hsl(61, 100%, 45%)');
const YELLOW_12 = Jimp.cssColorToHex('hsl(61, 100%, 44%)');
const YELLOW_13 = Jimp.cssColorToHex('hsl(61, 100%, 43%)');
const YELLOW_14 = Jimp.cssColorToHex('hsl(61, 100%, 42%)');
const YELLOW_15 = Jimp.cssColorToHex('hsl(61, 100%, 41%)');
const YELLOW_16 = Jimp.cssColorToHex('hsl(61, 100%, 40%)');

const BLACK_100 = Jimp.cssColorToHex('#0C0F0A');

const NEXT_COLOR = new Map([
	[RED_0, RED_1],
	[RED_1, RED_2],
	[RED_2, RED_3],
	[RED_3, RED_4],
	[RED_4, RED_5],
	[RED_5, RED_6],
	[RED_6, RED_7],
	[RED_7, RED_8],
	[RED_8, RED_9],
	[RED_9, RED_10],
	[RED_10, RED_11],
	[RED_11, RED_12],
	[RED_12, RED_13],
	[RED_13, RED_14],
	[RED_14, RED_15],
	[RED_15, RED_16],
	[RED_16, RED_16],
	[YELLOW_0, YELLOW_1],
	[YELLOW_1, YELLOW_2],
	[YELLOW_2, YELLOW_3],
	[YELLOW_3, YELLOW_4],
	[YELLOW_4, YELLOW_5],
	[YELLOW_5, YELLOW_6],
	[YELLOW_6, YELLOW_7],
	[YELLOW_7, YELLOW_8],
	[YELLOW_8, YELLOW_9],
	[YELLOW_9, YELLOW_10],
	[YELLOW_10, YELLOW_11],
	[YELLOW_11, YELLOW_12],
	[YELLOW_12, YELLOW_13],
	[YELLOW_13, YELLOW_14],
	[YELLOW_14, YELLOW_15],
	[YELLOW_15, YELLOW_16],
	[YELLOW_16, YELLOW_16],
	[BLACK_100, BLACK_100],
]);

const NON_ENDING_COLOR = new Set([RED_16, YELLOW_16, BLACK_100]);

const INITIAL_COLOR = new Map([
	['>', RED_0],
	['v', YELLOW_0],
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
				image[y][x] = moved.get(coord) === '>' ? RED_0 : YELLOW_0;
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

	const flushedImageFrames = [];

	function hasNonEndingColor(frame) {
		for (let y = 0; y < frame.length; y++) {
			for (let x = 0; x < frame[y].length; x++) {
				if (!NON_ENDING_COLOR.has(frame[y][x])) {
					return true;
				}
			}
		}
	}

	let nextFrame = clone(imageGrids[imageGrids.length - 1]);
	do {
		for (let y = 0; y < nextFrame.length; y++) {
			for (let x = 0; x < nextFrame[y].length; x++) {
				nextFrame[y][x] = NEXT_COLOR.get(nextFrame[y][x]);
			}
		}
		flushedImageFrames.push(nextFrame);
		nextFrame = clone(nextFrame);
	} while (hasNonEndingColor(flushedImageFrames[flushedImageFrames.length - 1]));

	const allImageGrids = [...imageGrids, ...flushedImageFrames];

	for (let i = 0; i < allImageGrids.length; i++) {
		const imageGrid = allImageGrids[i];
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

		image = image.scale(4, Jimp.RESIZE_NEAREST_NEIGHBOR);
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
