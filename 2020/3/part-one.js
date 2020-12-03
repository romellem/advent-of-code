const { input } = require('./input');

function calculateTrees(grid) {
	let count = 0;
	let x = 0;
	for (let y = 0; y < grid.length; y++) {
		let cell = grid[y][x];
		if (cell === '#') {
			count++;
		}

		x += 3;
		x %= grid[0].length;
	}

	return count;
}

console.log(calculateTrees(input));
