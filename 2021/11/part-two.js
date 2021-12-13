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

let all_flashed = false;
let step = 0;
while (!all_flashed) {
	let flashed = [];
	for (let [id, value] of grid) {
		let new_value = value + 1;
		grid.grid.set(id, new_value);
		if (value <= 9 && new_value > 9) {
			flashed.push(id);
		}
	}

	while (flashed.length > 0) {
		flashed = doFlashing(flashed);
	}

	// Count and reset all flashed octos back to `0`
	let total_flashed = 0;
	for (let [id, value] of grid) {
		if (value > 9) {
			total_flashed++;
			grid.grid.set(id, 0);
		}
	}

	// The step is finished, increment
	step++;

	if (total_flashed === 100) {
		// We can break our loop, we have our answer
		all_flashed = true;
	}
}

console.log(step);
