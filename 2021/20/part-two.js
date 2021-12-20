const { input, enhancement } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');
const { slices } = require('./grid-slices');

function sliceFrom(grid, coord, location) {
	let values = '';
	if (!slices[location]) {
		throw new Error(`Invalid slice: ${location}`);
	}

	for (let [x, y] of slices[location]) {
		// Getting points beyond the edges of the grid just returns the value from the `defaultFactory`.
		// Also helpfully, this extends the min/max bounds of the grid.
		values += grid.get(coord[0] + x, coord[1] + y);
	}

	return values;
}

let grid = new InfiniteGrid({
	defaultFactory: (x, y) => 0,
	load: input,
	parseAs: Number,
	string_map: {
		0: '.',
		1: '#',
	},
});

function enhance(grid, newDefaultFactory) {
	// Apply enhancements to a new grid, so it can happen "all at once"
	let new_grid = grid.clone();

	// Grab our edges before we start slicing, since the slices make the grid grow.
	const top = grid.min_y;
	const bottom = grid.max_y;
	const left = grid.min_x;
	const right = grid.max_x;

	// Similarly, duplicate all points since slicing the grid and loop over that fixed set
	const grid_ids = [...grid.keys()];

	// First, do all visible pixels
	for (let id of grid_ids) {
		const coord = InfiniteGrid.toCoords(id);
		let grid_slice = sliceFrom(grid, coord, 'center');
		let sliced_decimal = parseInt(grid_slice, 2);
		let new_value = enhancement[sliced_decimal];
		new_grid.set(...coord, new_value);
	}

	// Next, do bordering pixels
	for (let [y, slice_name, yd] of [
		[top, 'bottom', -1],
		[bottom, 'top', 1],
	]) {
		for (let x = left; x <= right; x++) {
			const coord = [x, y];
			let grid_slice = sliceFrom(grid, coord, slice_name);
			let sliced_decimal = parseInt(grid_slice, 2);
			let new_value = enhancement[sliced_decimal];
			new_grid.set(x, y + yd, new_value);
		}
	}

	for (let [x, slice_name, xd] of [
		[left, 'right', -1],
		[right, 'left', 1],
	]) {
		for (let y = top; y <= bottom; y++) {
			const coord = [x, y];
			let grid_slice = sliceFrom(grid, coord, slice_name);
			let sliced_decimal = parseInt(grid_slice, 2);
			let new_value = enhancement[sliced_decimal];
			new_grid.set(x + xd, y, new_value);
		}
	}

	// Next the 4 corners
	for (let [x, y, slice_name, xd, yd] of [
		[left, top, 'bottomRight', -1, -1],
		[right, top, 'bottomLeft', 1, -1],
		[left, bottom, 'topRight', -1, 1],
		[right, bottom, 'topLeft', 1, 1],
	]) {
		const coord = [x, y];
		let grid_slice = sliceFrom(grid, coord, slice_name);
		let sliced_decimal = parseInt(grid_slice, 2);
		let new_value = enhancement[sliced_decimal];
		new_grid.set(x + xd, y + yd, new_value);
	}

	/**
	 * Finally, this is specific to my input (my I'm guessing it is like this for everyone),
	 * but enhancement `0` (aka, a 3x3 slice of all 0s) says to turn on (`#`). Since our image is infinite,
	 * that means that after 1 tick, _all_ outside infinite pixels are turned on.
	 *
	 * Similarly, the enhancement for 511 (aka a 3x3 slice of all 1s) says to turn off (`.`).
	 * So I pass in a few function to toggle between for each pair of iterations.
	 */
	new_grid.defaultFactory = newDefaultFactory;

	return new_grid;
}

for (let i = 0; i < 25; i++) {
	console.log('Running Iteration:', i * 2 + 1);
	const grid1 = enhance(grid, (x, y) => 1);
	console.log('Running Iteration:', i * 2 + 2);
	const grid2 = enhance(grid1, (x, y) => 0);
	grid = grid2;
}

console.log('----------');
console.log(grid.sum());

// ↘↓↓↓↙
// →###←
// →###←
// ↗↑↑↑↖
