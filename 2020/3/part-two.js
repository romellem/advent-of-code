const { input } = require('./input');

function calculateTrees(grid, [dx, dy] = [3, 1]) {
	let count = 0;
	let x = 0;
	for (let y = 0; y < grid.length; y += dy) {
		let cell = grid[y][x];
		if (cell === '#') {
			count++;
		}

		x += dx;
		x %= grid[0].length;
	}

	return count;
}

let trees_multiplied_together = [
	[1, 1],
	[3, 1],
	[5, 1],
	[7, 1],
	[1, 2],
]
	.map((deltas) => calculateTrees(input, deltas))
	.reduce((a, b) => a * b);

console.log(trees_multiplied_together);
