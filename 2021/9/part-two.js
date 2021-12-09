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
	let ns = new Map();

	let added;
	do {
		added = false;
		let n = grid.neighbors(point.x, point.y);
		for (let { coord, value } of n.values()) {
			let id = InfiniteGrid.toId(...coord);
			if (value < 9 && !ns.has(id)) {
				let [x, y] = coord;
				ns.set(id, { x, y, value });
				added = true;
			}
		}
	} while (added);

	basins.push(ns);
}

basins.sort((m, n) => m.size - n.size);

basins.reverse();
let [a, b, c] = basins;

console.log(a.size * b.size * c.size);
