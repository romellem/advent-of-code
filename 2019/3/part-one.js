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
}

const calculateShortestCrossoverFromOrigin = (wire_a, wire_b) => {
	let grid = new Grid();
	let crosses = {};

	[wire_a, wire_b].forEach((wire, wire_num) => {
		let x = 0;
		let y = 0;

		// Could DRY this section up a bit... but this seems fairly clear
		wire.forEach(movement => {
			let [dir, distance] = movement;
			if (dir === 'R') {
				for (let i = x + 1; i <= x + distance; i++) {
					if (grid.increment(i, y)) {
						crosses[i + ',' + y] = true;
					}
				}
				x += distance;
			} else if (dir === 'L') {
				for (let i = x - 1; i >= x - distance; i--) {
					if (grid.increment(i, y)) {
						crosses[i + ',' + y] = true;
					}
				}
				x -= distance;
			} else if (dir === 'U') {
				for (let i = y + 1; i <= y + distance; i++) {
					if (grid.increment(x, i)) {
						crosses[x + ',' + i] = true;
					}
				}
				y += distance;
			} else if (dir === 'D') {
				for (let i = y - 1; i >= y - distance; i--) {
					if (grid.increment(x, i)) {
						crosses[x + ',' + i] = true;
					}
				}
				y -= distance;
			} else {
				throw move_str;
			}
		});
	});

	let closest_distance = Number.MAX_SAFE_INTEGER;
	for (let cross of Object.keys(crosses)) {
		let [x, y] = cross.split(',').map(v => parseInt(v, 10));
		console.log(x, y);
		let distance = manhattan([x, y], [0, 0]);

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

