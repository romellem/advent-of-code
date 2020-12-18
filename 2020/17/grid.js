class InfiniteNDimensionalGrid {
	constructor(initial_grid_state) {
		this.original_grid_str = JSON.stringify(initial_grid_state);
		this.grid = JSON.parse(JSON.stringify(initial_grid_state));
	}

	reset() {
		this.grid = JSON.parse(this.original_grid_str);
	}
}

module.exports = { InfiniteNDimensionalGrid };
