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
	 * @param {String} [opt.evolved=false] - Where or not virus is "evolved" or not
	 */
	constructor({ evolved = false } = {}) {
		this.evolved = evolved;

		this.max_x = -Infinity;
		this.min_x = Infinity;
		this.max_y = -Infinity;
		this.min_y = Infinity;

		this.grid = {};

		this.x = 0;
		this.y = 0;

		this.directions = [UP, RIGHT, DOWN, LEFT];
		this.direction = this.directions.indexOf(UP);

		this.count = {
			[CLEAN]: 0,
			[INFECTED]: 0,
			[WEAKENED]: 0,
			[FLAGGED]: 0,
			bursts: 0,
		};

		/**
		 * Evolved:
		 * - Clean nodes become weakened.
		 * - Weakened nodes become infected.
		 * - Infected nodes become flagged.
		 * - Flagged nodes become clean.
		 *
		 * Non-evolved:
		 * - Clean nodes become infected.
		 * - Infected nodes become clean.
		 */
		this.transition_map = this.evolved
			? {
					[CLEAN]: WEAKENED,
					[WEAKENED]: INFECTED,
					[INFECTED]: FLAGGED,
					[FLAGGED]: CLEAN,
			  }
			: {
					[CLEAN]: INFECTED,
					[INFECTED]: CLEAN,
			  };
	}

	set(x, y, value) {
		let id = this._getId(x, y);
		this.grid[id] = value;

		if (x > this.max_x) this.max_x = x;
		if (x < this.min_x) this.min_x = x;
		if (y > this.max_y) this.max_y = y;
		if (y < this.min_y) this.min_y = y;

		return this.grid[id];
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
				this.set(x, y, grid[y][x]);
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
		this.count.bursts++;

		// Importantly, set undefined values to `CLEAN`
		let current_cell = this.grid[current_xy] || CLEAN;
		switch (current_cell) {
			case WEAKENED:
				// Do nothing
				break;

			case FLAGGED:
				this.reverse();
				break;

			case INFECTED:
				this.rotateRight();
				break;

			case CLEAN:
			default:
				this.rotateLeft();
				break;
		}

		// 2. Modify current node based on the transformation map
		let new_value = this.set(this.x, this.y, this.transition_map[current_cell]);

		// Increment count for what we just changed
		this.count[new_value]++;

		// Move forward in the direction we are facing
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
	CLEAN,
	INFECTED,
	WEAKENED,
	FLAGGED,
};
