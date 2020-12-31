const { uniq } = require('lodash');
const { input } = require('./input');

const { Hex } = require('./hex-grid-red-blob');

const BLACK = {};
for (let steps of input) {
	let route = new Hex(0, 0, 0);
	// console.log(route.toString())
	for (let d of steps) {
		route = route.add(Hex.diagonals[d]);
	}

	if (BLACK[route.toString()] === undefined) {
		BLACK[route.toString()] = 1;
	} else if (BLACK[route.toString()] === 1) {
		BLACK[route.toString()] = 0;
	} else if (BLACK[route.toString()] === 0) {
		BLACK[route.toString()] = 1;
	}
}

const D = Object.entries({
	e: new Hex(2, -1, -1),
	se: new Hex(1, -2, 1),
	sw: new Hex(-1, -1, 2),
	w: new Hex(-2, 1, 1),
	nw: new Hex(-1, 2, -1),
	ne: new Hex(1, 1, -2),
});

function pruneZeroes() {
	let white = Object.entries(BLACK)
		.filter(([c, v]) => v === 0)
		.map(([c]) => c);
	for (let c of white) {
		delete BLACK[c];
	}
}

// pruneZeroes(BLACK);

function getNeighborsOfCoordStr(str) {
	let h = new Hex(...str.split(',').map((v) => parseInt(v, 10)));
	let neighbors = [];
	for (let [dir, cell] of D) {
		neighbors.push(h.add(Hex.diagonals[dir]));
	}
	return neighbors;
}

for (let zz = 0; zz < 100; zz++) {
	pruneZeroes();
	let tiles = Object.keys(BLACK);
	let neighbors = tiles.map((coord) => {
		let h = new Hex(...coord.split(',').map((v) => parseInt(v, 10)));
		let neighbors = [];
		for (let [dir, cell] of D) {
			neighbors.push(h.add(Hex.diagonals[dir]));
		}

		return neighbors;
	});

	let black_tiles_to_flip = [];
	for (let i = 0; i < tiles.length; i++) {
		let tile = tiles[i];
		let tile_n = neighbors[i];
		let black_neighbors = tile_n.filter((n) => BLACK[n.toString()] === 1);

		if (black_neighbors.length === 0 || black_neighbors.length > 2) {
			black_tiles_to_flip.push(tile.toString());
		}
	}
	let unique_neighbors = uniq(neighbors.flat().map((n) => n.toString()));

	let white_tiles_to_flip = [];
	for (let i = 0; i < unique_neighbors.length; i++) {
		let un = unique_neighbors[i];
		if (BLACK[un] === 1) continue;

		let nn = getNeighborsOfCoordStr(un);
		let black_tiles = nn.filter((n) => BLACK[n.toString()] === 1);

		if (black_tiles.length === 2) {
			white_tiles_to_flip.push(un);
		}
	}

	for (let b of black_tiles_to_flip) {
		BLACK[b] = 0;
	}
	for (let b of white_tiles_to_flip) {
		BLACK[b] = 1;
	}
}

console.log(Object.values(BLACK).reduce((a, b) => a + b, 0));
