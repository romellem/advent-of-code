const { InfiniteGrid } = require('./sea-floor.js');

const EAST = '>';
const SOUTH = 'v';

class SeaFloor {
	constructor(input) {
		this.raw_input = input;
		this.grid = new InfiniteGrid({
			load: this.raw_input,
		});
	}

	step(direction) {
		let new_grid = this.grid.clone();
	}
}
