const { input, sampleInputs } = require('./input');
const manhattan = require('manhattan');
const assert = require('assert');

let { wire_a, wire_b } = input;

class Grid {
	constructor() {
		this.grid = { '0,0': 0 };
	}

	increment(x, y) {
		const cell = `${x},${y}`;
		if (this.grid[cell] == null) {
			this.grid[cell] = 0;
		}

		this.grid[cell]++;

		// Return true if more than 1 (crossover), false otherwise
		if (this.grid[cell] > 1) {
			return true;
		} else {
			return false;
		}
	}

	// While the wires do technically cross right at the central port where they both start, this point does not count, nor does a wire count as crossing with itself.
	set(x, y) {
		const cell = `${x},${y}`;
		if (this.grid[cell] == null) {
			this.grid[cell] = 1;
		}
	}

	getCrossesWithOtherGrid(other_grid) {
		let crosses = [];
		for (let cell of Object.keys(this.grid)) {
			if (other_grid.grid[cell]) {
				let coord = cell.split(',').map(v => parseInt(v, 10));
				crosses.push(coord);
			}
		}

		return crosses;
	}
}

const calculateShortestCrossoverFromOrigin = (wire_a, wire_b) => {
	let grid_a = new Grid();
	let grid_b = new Grid();

	[wire_a, wire_b].forEach((wire, wire_num) => {
		let x = 0;
		let y = 0;

		let grid = wire_num === 0 ? grid_a : grid_b;

		// Could DRY this section up a bit... but this seems fairly clear
		wire.forEach(movement => {
			let [dir, distance] = movement;
			if (dir === 'R') {
				for (let i = 0; i < distance; i++) {
					grid.set(++x, y);
				}
			} else if (dir === 'L') {
				for (let i = 0; i < distance; i++) {
					grid.set(--x, y);
				}
			} else if (dir === 'U') {
				for (let i = 0; i < distance; i++) {
					grid.set(x, ++y);
				}
			} else if (dir === 'D') {
				for (let i = 0; i < distance; i++) {
					grid.set(x, --y);
				}
			} else {
				throw move_str;
			}
		});
	});

	let closest_distance = Number.MAX_SAFE_INTEGER;
	for (let coord of grid_a.getCrossesWithOtherGrid(grid_b)) {
		let distance = manhattan([0, 0], coord);

		if (distance < closest_distance) {
			closest_distance = distance;
		}
	}

	return closest_distance;
};

for (let { wire_a, wire_b, closest } of sampleInputs) {
	assert.strictEqual(calculateShortestCrossoverFromOrigin(wire_a, wire_b), closest);
}

console.log(calculateShortestCrossoverFromOrigin(wire_a, wire_b));
