const manhattan = require('manhattan');

class Wire {
	constructor(wire) {
		this.grid = { '0,0': 0 };
		this.steps = 0;

		// Use an object so we can update by reference
		this.location = { x: 0, y: 0 };

		/**
		 * By encoding our movement map this way, this prevents
		 * me from writing four conditionals so that I can call
		 * `x++, `x--`, `y++`, and `y--` depending on the direction.
		 * Now, I always just add the value to the relevant
		 * `location` key to update our position.
		 */
		this.MOVEMENT_MAP = {
			U: ['y', 1],
			D: ['y', -1],
			L: ['x', -1],
			R: ['x', 1],
		};

		// Fill in our grid
		this.extendWire(wire);
	}

	step(direction) {
		// Update our location up, down, left, or right, according to the `direction`
		let [axis, amount] = this.MOVEMENT_MAP[direction];
		this.location[axis] += amount;

		// Increase our step count
		this.steps++;

		/**
		 * > If a wire visits a position on the grid multiple times, use
		 * > the steps value from the first time it visits that position
		 * > when calculating the total value of a specific intersection.
		 *
		 * That is, only set this value if we haven't been here before.
		 */
		const cell = `${this.location.x},${this.location.y}`;
		if (this.grid[cell] === undefined) {
			// Set it to steps, which will always be truthy, and will enable us to calculate part two
			this.grid[cell] = this.steps;
		}
	}

	move([direction, distance]) {
		for (let i = 0; i < distance; i++) {
			this.step(direction);
		}
	}

	// @param {Array<String, Number>} wire
	extendWire(wire) {
		for (let movement of wire) {
			this.move(movement);
		}
	}
}

class Grid {
	constructor(wire_a_input, wire_b_input) {
		this.wire_a = new Wire(wire_a_input);
		this.wire_b = new Wire(wire_b_input);
	}

	// Part 1
	getMinDistanceToCrossover() {
		const grid_a = this.wire_a.grid;
		const grid_b = this.wire_b.grid;

		// Initial condition is a large number
		let min_distance = Number.MAX_SAFE_INTEGER;
		const origin = [0, 0];

		for (let cell of Object.keys(grid_a)) {
			// If the other grid has a wire at this cell, they cross over!
			if (grid_b[cell]) {
				// Parse out coordinates from our cell key
				let coord = cell.split(',').map(v => parseInt(v, 10));

				// Calculate the distance from the origin to those coords
				let distance = manhattan(origin, coord);

				// If the distance is less than our previous minimum, overwrite the minimum with our new value
				if (distance < min_distance) {
					min_distance = distance;
				}
			}
		}

		return min_distance;
	}

	// Part 2
	getMinStepsToCrossover() {
		const grid_a = this.wire_a.grid;
		const grid_b = this.wire_b.grid;

		// Initial condition is a large number
		let min_steps = Number.MAX_SAFE_INTEGER;

		for (let cell of Object.keys(grid_a)) {
			if (cell === '0,0') {
				continue;
			}

			// If the other grid has a wire at this cell, they cross over!
			if (grid_b[cell]) {
				// Calculate the total steps from wire_a and wire_b to this point
				let total_steps = grid_a[cell] + grid_b[cell];

				// If are steps are less than our previous minimum, overwrite the minimum with our new value
				if (total_steps < min_steps) {
					min_steps = total_steps;
				}
			}
		}

		return min_steps;
	}
}

module.exports = {
	Grid,
	Wire,
};
