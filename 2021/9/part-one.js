const { input } = require("./input");
const { InfiniteGrid } = require("./infinite-grid");

let grid = new InfiniteGrid();

for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		grid.set(x, y, input[y][x]);
	}
}

console.log(grid.toString());
process.exit(0);

let lows = [];
for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		let cell = grid.get(x, y);
		let neighbors = grid.neighbors(x, y);

		let nvs = [...neighbors.values()].map((v) => v.value);
		if (nvs.every((n) => n < cell)) {
			lows.push({ x, y, cell });
		}
	}
}

let answer = lows.reduce((sum, { cell }) => sum + (cell + 1), 0);

console.log(answer);
