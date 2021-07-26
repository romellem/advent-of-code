import { Computer } from './computer.js';
import { InfiniteGrid } from './grid.js';
import { input } from './input.js';

const input_ele = document.getElementById('input');
const canvas = document.getElementById('canvas');
const start = document.getElementById('start');
const ctx = canvas.getContext('2d');

let computer;
let grid;

input_ele.value = input.join(',');

const VOID = ' ';
const WALL = '#';
const OXY = 'O';
const FLOOR = '.';

const NORTH = 1,
	SOUTH = 2,
	WEST = 3,
	EAST = 4;
let running = false;
let x = 0;
let y = 0;
let oxy_coord = [null, null];

start.addEventListener('click', function loadComputer(e) {
	let memory = String(input_ele.value)
		.split(',')
		.map((v) => parseInt(v, 10));

	// constructor({
	// 	memory,
	// 	inputs = [],
	// 	defaultInput(computer),
	// 	pause_on = { [OUT]: true },
	// 	clone_memory = false,
	// })
	computer = new Computer({
		memory,
		pause_on: {
			[Computer.OUT]: true,
			// [Computer.INP]: true,
		},
	});
	grid = new InfiniteGrid({
		defaultFactory: (x, y) => VOID,
	});
	grid.set(0, 0, FLOOR);

	draw();
});

function getToCoord(dir) {
	switch (dir) {
		case NORTH:
			return [x, y - 1];
		case SOUTH:
			return [x, y + 1];
		case EAST:
			return [x + 1, y];
		case WEST:
			return [x - 1, y];
	}
}

function setCellColor(cell) {
	switch (cell) {
		case WALL:
			return (ctx.fillStyle = 'black');
		case FLOOR:
			return (ctx.fillStyle = 'yellow');
		case OXY:
			return (ctx.fillStyle = 'cyan');
		case VOID:
		default:
			return (ctx.fillStyle = 'white');
	}
}

function draw(offset = 50) {
	if (!grid) {
		return;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Use offset to account for negatives, just a bounds guess
	for (let [id, cell] of grid.grid) {
		let [px, py] = InfiniteGrid.toCoords(id);
		setCellColor(cell);
		ctx.fillRect(px + offset, py + offset, 1, 1);
	}

	// Draw robot
	ctx.fillStyle = 'red';
	ctx.fillRect(x + offset, y + offset, 1, 1);

	console.log(grid.toString());
}

function move(dir) {
	if (!running) {
		running = true;

		let [to_x, to_y] = getToCoord(dir);
		computer.inputs.push(dir);
		let outputs = computer.run();

		if (outputs.length) {
			let output = outputs.shift();
			if (output === 0) {
				grid.set(to_x, to_y, WALL);
			} else if (output === 1) {
				grid.set(to_x, to_y, FLOOR);
				x = to_x;
				y = to_y;
			} else if (output === 2) {
				grid.set(to_x, to_y, OXY);
				x = to_x;
				y = to_y;
			} else {
				throw new Error(`Unknown output, ${output}`);
			}
		}
	}
}

document.addEventListener('keyup', function (e) {
	running = false;
});

document.addEventListener(
	'keydown',
	function (event) {
		if (event.defaultPrevented) {
			return; // Do nothing if event already handled
		}

		switch (event.code) {
			case 'KeyS':
			case 'ArrowDown':
				move(SOUTH);
				break;
			case 'KeyW':
			case 'ArrowUp':
				move(NORTH);
				break;
			case 'KeyA':
			case 'ArrowLeft':
				move(WEST);
				break;
			case 'KeyD':
			case 'ArrowRight':
				move(EAST);
				break;
		}

		draw();

		// Consume the event so it doesn't get handled twice
		event.preventDefault();
	},
	true
);
