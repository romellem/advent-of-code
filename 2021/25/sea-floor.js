const { InfiniteGrid } = require('./infinite-grid.js');

const EAST = '>';
const SOUTH = 'v';
const EMPTY = '.';

class SeaFloor {
	constructor(input) {
		this.raw_input = input;
		this.grid = new InfiniteGrid({
			load: this.raw_input,
			defaultFactory: () => '.',
			parseAs: (value) => {
				if (value === EAST) {
					return 'E';
				} else if (value === SOUTH) {
					return 'S';
				} else {
					return EMPTY;
				}
			},
		});
	}

	halfStep(direction) {
		let some_cell_has_moved = false;

		let new_grid = this.grid.clone();
		for (let [cell, [x, y]] of this.grid.findAll(direction)) {
			const [neighbor_value, neighbor_coord] = this.grid.getNeighbor(x, y, direction, {
				wrap_around: true,
			});

			if (neighbor_value === EMPTY) {
				some_cell_has_moved = true;
				new_grid.set(x, y, EMPTY);
				new_grid.set(...neighbor_coord, cell);
			}
		}

		this.grid = new_grid;

		return some_cell_has_moved;
	}

	step() {
		let east_moved = this.halfStep('E');
		let south_moved = this.halfStep('S');

		return east_moved || south_moved;
	}

	run() {
		let count = 0;
		let moved;
		do {
			count++;
			moved = this.step();
		} while (moved);

		return count;
	}
}

module.exports = {
	SeaFloor,
};
