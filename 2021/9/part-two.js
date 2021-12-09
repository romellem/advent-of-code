const { input } = require("./input");
const { InfiniteGrid } = require("./infinite-grid");

let grid = new InfiniteGrid({ defaultFactory: (x, y) => 9999 });

for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		grid.set(x, y, input[y][x]);
	}
}

let lows = [];
for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		let cell = grid.get(x, y);
		let neighbors = grid.neighbors(x, y);

		let nvs = [...neighbors.values()].map((v) => v.value);
		if (nvs.every((n) => n > cell)) {
			lows.push({ x, y, cell });
		}
	}
}

let basins = [];
for (let point of lows) {
	let queue = [point];
	let visited = new Set();
	visited.add(InfiniteGrid.toId(point.x, point.y));

	// let added;
	do {
		// added = false;
		let cell = queue.shift();
		let n = grid.neighbors(cell.x, cell.y);
		for (let { coord, value } of n.values()) {
			let id = InfiniteGrid.toId(...coord);
			if (value < 9 && !visited.has(id)) {
				let [x, y] = coord;
				queue.push(id, { x, y, value });
				visited.add(id);
				// added = true;
			}
		}
	} while (queue.length > 0);

	basins.push(visited);
}

basins.sort((m, n) => m.size - n.size);

basins.reverse();
let [a, b, c] = basins;

console.log(a.size * b.size * c.size);
