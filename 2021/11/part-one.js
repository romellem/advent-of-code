const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

let grid = new InfiniteGrid({
	load: input,
	parseAs: Number,
});

function doFlashing(flashed) {
	let new_flashes = [];
	for (let id of flashed) {
		let neighbors = grid.neighbors(...InfiniteGrid.toCoords(id), true);

		for (let { coord, value } of neighbors.values()) {
			let [x, y] = coord;
			let new_value = value + 1;

			// Only flash once when we are at 10 energy
			if (new_value === 10) {
				new_flashes.push(InfiniteGrid.toId(x, y));
			}

			grid.set(x, y, new_value);
		}
	}

	return new_flashes;
}

let count = 0;
for (let i = 0; i < 100; i++) {
	let flashed = [];

	// Initially increment all octo's energy by `1` and flash those that are greater than 9
	for (let [id, value] of grid) {
		let new_value = value + 1;
		grid.grid.set(id, new_value);
		if (new_value === 10) {
			flashed.push(id);
		}
	}

	count += flashed.length;

	// Keep flashing until we stop creating more flashes
	while (flashed.length > 0) {
		flashed = doFlashing(flashed);
		count += flashed.length;
	}

	// Reset all flashed octos back to `0`
	for (let [id, value] of grid) {
		if (value > 9) {
			grid.grid.set(id, 0);
		}
	}
}

console.log(count);
