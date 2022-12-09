const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

const grid = new InfiniteGrid({
	load: input,
	parseAs: (cell) => {
		return { value: parseInt(cell, 10) };
	},
});

let count = 0;
// Naive O(n^2) way
for (let [cell_id, cell] of grid) {
	let [x, y] = InfiniteGrid.toCoords(cell_id);
	let row = grid.getRow(x, y, true);
	let col = grid.getCol(x, y, true);

	const rowIndex = row.indexOf(cell);
	const colIndex = col.indexOf(cell);

	let left = row.slice(0, rowIndex);
	let right = row.slice(rowIndex + 1);
	let top = col.slice(0, colIndex);
	let down = col.slice(colIndex + 1);

	if (
		left.every((v) => v.value < cell.value) ||
		right.every((v) => v.value < cell.value) ||
		top.every((v) => v.value < cell.value) ||
		down.every((v) => v.value < cell.value)
	) {
		// Cell is visible
		count++;
	}
}

console.log(count);
