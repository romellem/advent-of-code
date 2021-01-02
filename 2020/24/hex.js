const { Hex } = require('./hex-grid-red-blob');

function createGrid(input) {
	const GRID = {};
	const origin = new Hex(0, 0, 0);
	for (let steps of input) {
		let route = origin;
		for (let direction of steps) {
			route = route.add(Hex.diagonals[direction]);
		}

		const route_str = route.toString();

		// undefined -> 1
		// 0 -> 1
		// 1 -> 0
		GRID[route_str] = +!GRID[route_str];
	}

	return GRID;
}

module.exports = { createGrid };
