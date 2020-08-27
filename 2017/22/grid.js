// [x, y]
const UP = [0, -1];
const RIGHT = [1, 0];
const DOWN = [0, 1];
const LEFT = [-1, 0];

const INFECTED = 1;
const CLEAN = 0;

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

module.exports = {
	GridComputingCluster,
};
