import { Computer } from './computer.js';
import { InfiniteGrid } from './grid.js';

const VOID = ' ';
const WALL = '#';
const OXY = 'O';
const FLOOR = '.';
const START = 'D';

const NORTH = 1;
const SOUTH = 2;
const WEST = 3;
const EAST = 4;
const INVERSE_DIRECTION = {
	[NORTH]: SOUTH,
	[SOUTH]: NORTH,
	[WEST]: EAST,
	[EAST]: WEST,
};

function isOrigin(x, y) {
	return x === 0 && y === 0;
}

function getToCoord(dir, state) {
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

/**
 * @param {NORTH|SOUTH|EAST|WEST} direction
 * @returns {Boolean} Return true when droid moved, false if it hit a wall (and thus didn't move)
 */
function attemptMovementThenSetGridAndUpdateState(direction, { state, computer, grid }) {
	let [to_x, to_y] = getToCoord(direction, state);
	computer.inputs.push(direction);
	let outputs = computer.run();

	if (!outputs.length) {
		throw new Error(`Computer did not generate an output`);
	}

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

function moveBackAndPopStack(stack, { state, computer, grid }) {
	let last_movement = stack.pop();
	const direction = INVERSE_DIRECTION[last_movement];
	if (!attemptMovementThenSetGridAndUpdateState(direction, { state, computer, grid })) {
		throw new Error(
			`Backtrace failed, state = { x: ${state.x}, y: ${state.y} }, last_movement = ${last_movement}, direction = ${direction}`
		);
	}
}

// @link https://gist.github.com/wkw/462e456b4b89005c611fb519616232c9
export function shuffle(array) {
	var m = array.length,
		t,
		i;

	// While there remain elements to shuffle...
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

export class Game {
	/**
	 * @param {Array<Number>} memory_input
	 * @param {HTMLElement} app
	 */
	constructor(memory_input, app) {
		this.app = app;
		this.setAppCanvasAndContext();

		this.input_copy = [...memory_input];
		this.computer = new Computer({
			memory: [...this.input_copy],
			pause_on: {
				[Computer.OUT]: true,
			},
		});

		this.setGridAndCoords();

		this.removeListeners = this.addListeners();
	}

	setAppCanvasAndContext() {
		this.app.innerHTML = '';
		const canvas = document.createElement('canvas');
		canvas.style = `
			image-rendering: crisp-edges;
			border: 1px solid grey;
			width: 800px;
			height: 800px;
		`;
		canvas.width = 200;
		canvas.height = 200;
		const ctx = canvas.getContext('2d');
		this.app.appendChild(canvas);
		this.ctx = ctx;
	}

	move(dir) {
		if (this.running) {
			return;
		}

		this.running = true;

		let [to_x, to_y] = getToCoord(dir, this.state);
		this.computer.inputs.push(dir);
		let outputs = computer.run();

		if (outputs.length) {
			let output = outputs.shift();
			if (output === 0) {
				this.grid.set(to_x, to_y, WALL);
			} else if (output === 1) {
				this.grid.set(to_x, to_y, FLOOR);
				x = to_x;
				y = to_y;
			} else if (output === 2) {
				this.grid.set(to_x, to_y, OXY);
				x = to_x;
				y = to_y;
			} else {
				throw new Error(`Unknown output, ${output}`);
			}
		}
	}

	draw() {
		// Clear our entire map each time
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let [id, cell] of grid.grid) {
			let [x, y] = InfiniteGrid.toCoords(id);
			switch (cell) {
				case WALL:
					ctx.fillStyle = 'black';
					break;
				case FLOOR:
					ctx.fillStyle = 'yellow';
					break;
				case OXY:
					ctx.fillStyle = 'cyan';
					break;
				case VOID:
				default:
					ctx.fillStyle = 'white';
					break;
			}
			ctx.fillRect(x, y, 1, 1);
		}

		// Draw robot
		ctx.fillStyle = 'red';
		ctx.fillRect(this.state.x, this.state.y, 1, 1);
	}

	addListeners() {
		const handleKeyDown = (event) => {
			if (event.defaultPrevented) {
				return; // Do nothing if event already handled
			}

			switch (event.code) {
				case 'KeyS':
				case 'ArrowDown':
					this.move(SOUTH);
					break;
				case 'KeyW':
				case 'ArrowUp':
					this.move(NORTH);
					break;
				case 'KeyA':
				case 'ArrowLeft':
					this.move(WEST);
					break;
				case 'KeyD':
				case 'ArrowRight':
					this.move(EAST);
					break;
			}

			// Consume the event so it doesn't get handled twice
			event.preventDefault();
		};

		const handleKeyUp = () => {
			this.moving = false;
		};
		document.addEventListener('keyup', handleKeyUp);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keyup', handleKeyUp);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}

	/**
	 * Sets `this.grid` and `this.state` to starting values.
	 */
	setGridAndCoordsState() {
		/**
		 * Solve the entire puzzle, but only to get a nice 2D picture of the grid.
		 * This also helps us center our droid relative to the grid rather than
		 * at the origin.
		 */
		const computer = new Computer({
			memory: [...this.input_copy],
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

		const directions = [NORTH, SOUTH, EAST, WEST];
		do {
			let moved = false;
			// shuffle(directions);
			for (let direction of directions) {
				const [to_x, to_y] = getToCoord(direction, state);
				const cell = grid.get(to_x, to_y);
				if (cell === VOID) {
					// Cell is unknown, try to move to it to determine its status
					const did_move = attemptMovementThenSetGridAndUpdateState(direction, {
						state,
						computer,
						grid,
					});
					if (did_move) {
						stack.push(direction);
						moved = true;
						break;
					}
				}
			}

			if (!moved && stack.length) {
				moveBackAndPopStack(stack, { state, computer, grid });
			}
		} while (stack.length > 0);

		const grid_str = grid.toString();
		const new_grid = new InfiniteGrid({
			defaultFactory: (x, y) => ' ',
			walls: {
				'#': true,
			},
		});
		new_grid.import(grid_str);
		const start_coords = new_grid.findAll(START)[0];
		const [x, y] = start_coords;
		this.state = { x, y };

		// Reset map to all VOID (essentially the same as a grid with 1 point)
		new_grid.setAll(VOID);

		this.grid = new_grid;
	}
}
