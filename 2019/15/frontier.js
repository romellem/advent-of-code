const { input } = require('./input.js');
const { Computer } = require('./intcode-computer-optimized.js');
const { InfiniteGrid } = require('./infinite-grid.js');

const VOID = ' ';
const WALL = '#';
const OXY = 'O';
const FLOOR = '.';
const START = 'X';

const NORTH = 1,
	SOUTH = 2,
	WEST = 3,
	EAST = 4;
const INVERSE_DIRECTION = {
	[NORTH]: SOUTH,
	[SOUTH]: NORTH,
	[WEST]: EAST,
	[EAST]: WEST,
};

const computer = new Computer({
	memory: input,
	pause_on: {
		[Computer.OUT]: true,
	},
});

const grid = new InfiniteGrid({
	defaultFactory: (x, y) => VOID,
});
grid.set(0, 0, START);

const state = { x: 0, y: 0 };
const stack = [];

function getToCoord(dir) {
	const { x, y } = state;
	switch (dir) {
		case NORTH:
			return [x, y - 1];
		case SOUTH:
			return [x, y + 1];
		case EAST:
			return [x + 1, y];
		case WEST:
			return [x - 1, y];
		default:
			throw new Error(`Unknown direction: ${dir}`);
	}
}

function isOrigin(x, y) {
	return x === 0 && y === 0;
}

/**
 * @param {NORTH|SOUTH|EAST|WEST} direction
 * @returns {Boolean} Return true when droid moved, false if it hit a wall (and thus didn't move)
 */
function attemptMovementThenSetGridAndUpdateState(direction) {
	let [to_x, to_y] = getToCoord(direction);
	computer.inputs.push(direction);
	let outputs = computer.run();

	if (outputs.length) {
		let output = outputs.shift();
		if (output === 0) {
			grid.set(to_x, to_y, WALL);
			return false;
		} else if (output === 1) {
			if (!isOrigin(to_x, to_y)) {
				grid.set(to_x, to_y, FLOOR);
			}
			state.x = to_x;
			state.y = to_y;
			return true;
		} else if (output === 2) {
			grid.set(to_x, to_y, OXY);
			state.x = to_x;
			state.y = to_y;
			return true;
		} else {
			throw new Error(`Unknown output, ${output}`);
		}
	}
}

function moveBackAndPopStack() {
	let last_movement = stack.pop();
	const direction = INVERSE_DIRECTION[last_movement];
	if (!attemptMovementThenSetGridAndUpdateState(direction)) {
		throw new Error(
			`Backtrace failed, state = { x: ${state.x}, y: ${state.y} }, last_movement = ${last_movement}, direction = ${direction}`
		);
	}
}

do {
	let moved = false;
	for (let direction of [NORTH, SOUTH, EAST, WEST]) {
		const [to_x, to_y] = getToCoord(direction);
		const cell = grid.get(to_x, to_y);
		if (cell === VOID) {
			// Cell is unknown, try to move to it to determine its status
			const did_move = attemptMovementThenSetGridAndUpdateState(direction);
			if (did_move) {
				stack.push(direction);
				moved = true;
				break;
			}
		}
	}

	if (!moved && stack.length) {
		moveBackAndPopStack();
	}
} while (stack.length > 0);

const GRID_STR = grid.toString();

module.exports = GRID_STR;
