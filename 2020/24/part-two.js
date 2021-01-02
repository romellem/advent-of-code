const { uniq } = require('lodash');
const { input } = require('./input');
const { Hex } = require('./hex-grid-red-blob');
const { createGrid } = require('./hex');

const GRID = createGrid(input);
const DIAGONALS = Object.keys(Hex.diagonals);

const getGridColor = (coord) => (GRID[coord] === 1 ? 1 : 0);

function pruneZeroes() {
	let white = Object.entries(GRID).filter(([c, v]) => v === 0);
	for (let [c] of white) {
		delete GRID[c];
	}
}

// Memoized
const parseCoordStr = (() => {
	const cache = {};
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
			let neighbor_color = getGridColor(neighbor_str);
			if (neighbor_color !== color) {
				continue;
			}
		}
		neighbors.push(neighbor_str);
	}
	return neighbors;
}

function getUniqueNeighborsOfCoordsStr(coords, color) {
	return uniq(coords.map((coord) => getNeighborsOfCoordStr(coord, color)).flat());
}

function getNeighborColorCount(coord, color) {
	let count = 0;
	let cell = getHexFromCoordStr(coord);
	for (let dir of DIAGONALS) {
		let neighbor = cell.add(Hex.diagonals[dir]);
		let neighbor_str = neighbor.toString();
		let neighbor_color = getGridColor(neighbor_str);
		if (neighbor_color === color) {
			count++;
		}
	}
	return count;
}

for (let iterations = 0; iterations < 100; iterations++) {
	// Keeps memory low, and prevents us from iterating over white tiles
	pruneZeroes();

	let tiles = Object.keys(GRID);

	let black_tiles_to_flip = [];
	for (let tile of tiles) {
		let black_neighboar_tiles_count = getNeighborColorCount(tile, 1);

		if (black_neighboar_tiles_count === 0 || black_neighboar_tiles_count > 2) {
			black_tiles_to_flip.push(tile);
		}
	}

	let white_neighbor_tiles = getUniqueNeighborsOfCoordsStr(tiles, 0);

	let white_tiles_to_flip = [];
	for (let white_neighbor_tile of white_neighbor_tiles) {
		let black_neighbor_tiles_count = getNeighborColorCount(white_neighbor_tile, 1);

		if (black_neighbor_tiles_count === 2) {
			white_tiles_to_flip.push(white_neighbor_tile);
		}
	}

	for (let tile of black_tiles_to_flip) {
		GRID[tile] = 0;
	}
	for (let tile of white_tiles_to_flip) {
		GRID[tile] = 1;
	}
}

console.log(Object.values(GRID).reduce((a, b) => a + b, 0));
