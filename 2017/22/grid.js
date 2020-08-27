const colors = require('colors');

// [x, y]
const UP = [0, -1];
const RIGHT = [1, 0];
const DOWN = [0, 1];
const LEFT = [-1, 0];

const INFECTED = '#';
const WEAKENED = 'W';
const FLAGGED = 'F';
const CLEAN = '.';

/**
 *       -y
 *        ^
 *        |
 *        |
 * -x <---+---> +x
 *        |
 *        |
 *        v
 *       +y
 */
class GridComputingCluster {
	/**
	 * @param {String} opt.input - Puzzle input
	 */
	constructor({ x = 0, y = 0 } = {}) {
		// this.maxX = -Infinity;
		// this.minX = Infinity;
		// this.maxY = -Infinity;
		// this.minY = Infinity;

		this.grid = {};

		this.x = x;
		this.y = y;

		this.directions = [UP, RIGHT, DOWN, LEFT];
		this.direction = this.directions.indexOf(UP);

		this.infected = 0;
		this.cleaned = 0;
		this.bursts = 0;
	}

	set(x, y, value) {
		let id = this._getId(x, y);
		this.grid[id] = value;
	}

	_getId(x, y) {
		return `${x},${y}`;
	}

	parseInput(input) {
		let grid = input.split('\n').map((row) => row.split(''));
		this.y = Math.floor(grid.length / 2);
		this.x = Math.floor(grid[0].length / 2);

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				let value = grid[y][x] === '#' ? INFECTED : CLEAN;
				this.set(x, y, value);
			}
		}
	}

	move() {
		let direction = this.directions[this.direction];
		let [x, y] = direction;
		this.x += x;
		this.y += y;
	}

	rotateLeft() {
		if (this.direction === 0) {
			this.direction = this.directions.length - 1;
		} else {
			this.direction--;
		}
	}

	rotateRight() {
		if (this.direction === this.directions.length - 1) {
			this.direction = 0;
		} else {
			this.direction++;
		}
	}

	/**
	 * 1. If the current node is infected, it turns to its right.
	 *    Otherwise, it turns to its left. (Turning is done in-place; the
	 *    current node does not change.)
	 * 2. If the current node is clean, it becomes infected.
	 *    Otherwise, it becomes cleaned. (This is done after the node is
	 *    considered for the purposes of changing direction.)
	 * 3. The virus carrier moves forward one node in the direction it is facing.
	 */
	burst() {
		let current_xy = this._getId(this.x, this.y);
		this.bursts++;
		if (this.grid[current_xy] === INFECTED) {
			this.rotateRight();
			this.grid[current_xy] = CLEAN;
			this.cleaned++;
		} else {
			this.rotateLeft();
			this.grid[current_xy] = INFECTED;
			this.infected++;
		}
		this.move();
	}
}

class EvolvedGridComputingCluster {
	/**
	 * @param {String} opt.input - Puzzle input
	 */
	constructor({ x = 0, y = 0 } = {}) {
		this.max_x = -Infinity;
		this.min_x = Infinity;
		this.max_y = -Infinity;
		this.min_y = Infinity;

		this.grid = {};

		this.x = x;
		this.y = y;

		this.directions = [UP, RIGHT, DOWN, LEFT];
		this.direction = this.directions.indexOf(UP);

		this.infected = 0;
		this.cleaned = 0;
		this.weakened = 0;
		this.flagged = 0;

		// this.bursts = 0;
	}

	set(x, y, value) {
		let id = this._getId(x, y);
		this.grid[id] = value;

		if (x > this.max_x) this.max_x = x;
		if (x < this.min_x) this.min_x = x;
		if (y > this.max_y) this.max_y = y;
		if (y < this.min_y) this.min_y = y;
	}

	_getId(x, y) {
		return `${x},${y}`;
	}

	parseInput(input) {
		let grid = input.split('\n').map((row) => row.split(''));
		this.y = Math.floor(grid.length / 2);
		this.x = Math.floor(grid[0].length / 2);

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				let value = grid[y][x] === '#' ? INFECTED : CLEAN;
				this.set(x, y, value);
			}
		}
	}

	move() {
		let direction = this.directions[this.direction];
		let [x, y] = direction;
		this.x += x;
		this.y += y;

		if (this.x > this.max_x) this.max_x = this.x;
		if (this.x < this.min_x) this.min_x = this.x;
		if (this.y > this.max_y) this.max_y = this.y;
		if (this.y < this.min_y) this.min_y = this.y;
	}

	rotateLeft() {
		if (this.direction === 0) {
			this.direction = this.directions.length - 1;
		} else {
			this.direction--;
		}
	}

	rotateRight() {
		if (this.direction === this.directions.length - 1) {
			this.direction = 0;
		} else {
			this.direction++;
		}
	}

	reverse() {
		this.direction = (this.direction + 2) % this.directions.length;
	}

	/**
	 * - Clean nodes become weakened.
	 * - Weakened nodes become infected.
	 * - Infected nodes become flagged.
	 * - Flagged nodes become clean.
	 *
	 * 1. Decide which way to turn based on the current node:
	 *     a. If it is clean, it turns left.
	 *     b. If it is weakened, it does not turn, and will continue moving in the same direction.
	 *     c. If it is infected, it turns right.
	 *     d. If it is flagged, it reverses direction, and will go back the way it came.
	 * 2. Modify the state of the current node, as described above.
	 * 3. The virus carrier moves forward one node in the direction it is facing.
	 */
	burst() {
		let current_xy = this._getId(this.x, this.y);
		// this.bursts++;
		switch (this.grid[current_xy]) {
			case WEAKENED:
				this.grid[current_xy] = INFECTED;
				this.infected++;
				break;
			case FLAGGED:
				this.reverse();
				this.grid[current_xy] = CLEAN;
				this.cleaned++;
				break;
			case INFECTED:
				this.rotateRight();
				this.grid[current_xy] = FLAGGED;
				this.flagged++;
				break;

			case CLEAN:

			// Importantly, set the `default` to the same as CLEAN,
			// since moving onto an unset cell will be `undefined` at first
			default:
				this.rotateLeft();
				this.grid[current_xy] = WEAKENED;
				this.weakened++;
				break;
		}

		this.move();
	}

	toString() {
		let str = '';
		for (let y = this.min_y; y <= this.max_y; y++) {
			for (let x = this.min_x; x <= this.max_x; x++) {
				let cell = this.grid[this._getId(x, y)] || CLEAN;
				str += this.x === x && this.y === y ? String(cell).red : cell;
			}
			str += '\n';
		}

		return str;
	}
}

module.exports = {
	GridComputingCluster,
	EvolvedGridComputingCluster,
};
