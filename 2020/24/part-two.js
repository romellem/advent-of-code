const assert = require('assert');
const { uniq } = require('lodash');
const { input } = require('./input');
const { Hex } = require('./hex-grid-red-blob');

assert.strictEqual(+!undefined, 1);
assert.strictEqual(+!0, 1);
assert.strictEqual(+!1, 0);

const BLACK = {};
for (let steps of input) {
	let route = new Hex(0, 0, 0);
	for (let direction of steps) {
		route = route.add(Hex.diagonals[direction]);
	}

	const route_str = route.toString();

	// undefined -> 1
	// 0 -> 1
	// 1 -> 0
	BLACK[route_str] = +!BLACK[route_str];
}

const DIAGONALS = Object.keys(Hex.diagonals);

function pruneZeroes() {
	let white = Object.entries(BLACK).filter(([c, v]) => v === 0);
	for (let [c] of white) {
		delete BLACK[c];
	}
}

// Memoized
const parseCoordStr = (() => {
	let cache = {};
	return (str) => {
		if (!cache[str]) {
			cache[str] = str.split(',').map((v) => parseInt(v, 10));
		}
		return cache[str];
	};
})();

const getHexFromCoordStr = (() => {
	const cache = {};
	return (coord) => {
		if (!cache[coord]) {
			cache[coord] = new Hex(...parseCoordStr(coord));
		}
		return cache[coord];
	};
})();

function getNeighborsOfCoordStr(coord, color) {
	let cell = getHexFromCoordStr(coord);
	let neighbors = [];
	for (let dir of DIAGONALS) {
		let neighbor = cell.add(Hex.diagonals[dir]);
		let neighbor_str = neighbor.toString();
		if (color !== undefined) {
			let neighbor_color = +Boolean(BLACK[neighbor_str]);
			if (neighbor_color !== color) {
				continue;
			}
		}
		neighbors.push(neighbor_str);
	}
	return neighbors;
}

function getUniqueNeighborsOfCoordsStr(coords, color) {
	let neighbors = {};

	for (let coord of coords) {
		let cell = getHexFromCoordStr(coord);
		for (let dir of DIAGONALS) {
			let neighbor = cell.add(Hex.diagonals[dir]);
			let neighbor_str = neighbor.toString();
			if (color !== undefined) {
				let neighbor_color = +Boolean(BLACK[neighbor_str]);
				if (neighbor_color !== color) {
					continue;
				}
			}
			neighbors[neighbor_str] = color;
		}
	}

	return Object.keys(neighbors);
}

for (let iterations = 0; iterations < 100; iterations++) {
	pruneZeroes();
	let tiles = Object.keys(BLACK);

	let black_tiles_to_flip = [];
	for (let tile of tiles) {
		let black_neighbors = getNeighborsOfCoordStr(tile, 1);

		if (black_neighbors.length === 0 || black_neighbors.length > 2) {
			black_tiles_to_flip.push(tile);
		}
	}

	let white_neighbors = getUniqueNeighborsOfCoordsStr(tiles, 0);

	let white_tiles_to_flip = [];
	for (let white_neighbor of white_neighbors) {
		let black_tiles_count = getNeighborsOfCoordStr(white_neighbor, 0).reduce(
			(sum, coord) => sum + (BLACK[coord] === 1 ? 1 : 0),
			0
		);

		if (black_tiles_count === 2) {
			white_tiles_to_flip.push(white_neighbor);
		}
	}

	for (let tile of black_tiles_to_flip) {
		BLACK[tile] = 0;
	}
	for (let tile of white_tiles_to_flip) {
		BLACK[tile] = 1;
	}
}

console.log(Object.values(BLACK).reduce((a, b) => a + b, 0));
