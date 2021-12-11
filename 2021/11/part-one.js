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
			let v = value;
			let new_v = v + 1;
			if (v <= 9 && new_v > 9) {
				new_flashes.push(InfiniteGrid.toId(...coord));
			}
			grid.set(...coord, v + 1);
		}
	}

	return new_flashes;
}

let count = 0;
for (let i = 0; i < 100; i++) {
	let flashed = [];
	for (let [id, value] of grid) {
		let new_value = value + 1;
		grid.grid.set(id, new_value);
		if (value <= 9 && new_value > 9) {
			flashed.push(id);
		}
	}

	count += flashed.length;

	while (flashed.length > 0) {
		flashed = doFlashing(flashed);
		count += flashed.length;
	}

	for (let [id, value] of grid) {
		if (value > 9) {
			grid.grid.set(id, 0);
		}
	}
}

console.log(count);
