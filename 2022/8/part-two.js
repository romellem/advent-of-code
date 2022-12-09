const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');
const { max } = require('lodash');

const grid = new InfiniteGrid({
	load: input,
	parseAs: (cell) => {
		return { value: parseInt(cell, 10), visible: undefined };
	},
});

function countTrees(slice, from) {
	// We return `0` if `slice.length === 0`
	let count = 0;

	for (let cell of slice) {
		// Always increment, you are looking at this tree!
		count++;

		if (cell.value >= from.value) {
			// This tree is too tall, you can't see anything past. Break from loop
			break;
		}
	}

	return count;
}

let max_score = -1;

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

	// Iterate from inside out. `right` & `down` already are ordered this way
	left.reverse();
	top.reverse();

	let scenic_score =
		countTrees(left, cell) *
		countTrees(right, cell) *
		countTrees(top, cell) *
		countTrees(down, cell);

	cell.score = scenic_score;
	max_score = Math.max(max_score, scenic_score);
}

console.log(max_score);
