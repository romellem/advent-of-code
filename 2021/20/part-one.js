const { input, enhancement } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');
const { slices } = require('./grid-slices');

function sliceFrom(grid, coord, location) {
	let values = '';
	if (!slices[location]) {
		throw new Error(`Invalid slice: ${location}`);
	}

	for (let [x, y] of slices[location]) {
		values += grid.get(coord[0] + x, coord[1] + y);
	}

	return values;
}

const grid = new InfiniteGrid({
	defaultFactory: (x, y) => 0,
	load: input,
	parseAs: Number,
	string_map: {
		0: '.',
		1: '#',
	},
});

function enhance(grid, newDefaultFactory) {
	let new_grid = grid.clone();

	const top = grid.min_y;
	const bottom = grid.max_y;
	const left = grid.min_x;
	const right = grid.max_x;

	// Duplicate all points since slicing the grid grows it, so we'd never end
	const prefix_values = [...grid];

	// First, do all visible pixels
	for (let [id, value] of prefix_values) {
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
	 * Finally, this is specific to my input, but enhancement `0` is to turn on.
	 * Since our image is infinite, that means that after 1 tick, _all_ outside infinite
	 * pixels are turned on. So flip the default factory to 1.
	 */
	new_grid.defaultFactory = newDefaultFactory;

	return new_grid;
}

const grid1 = enhance(grid, (x, y) => 1);
const grid2 = enhance(grid1, (x, y) => 0);

console.log(grid2.sum());

// ↖ ↗ ↘ ↙   ← → ↑ ↓

// ↘↓↓↓↙
// →###←
// →###←
// ↗↑↑↑↖
