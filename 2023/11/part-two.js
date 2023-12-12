const { input } = require('./input');
const G = require('generatorics');
const distance = require('manhattan');

const grid = input;

// `true` means it is empty / should be expanded
const emptyRows = Array(input.length).fill(true);
const emptyCols = Array(input[0].length).fill(true);

const galaxyCoords = [];

// Get all galaxies, and mark which cols / rows are empty
for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		if (grid[y][x] === '#') {
			emptyRows[y] = false;
			emptyCols[x] = false;
			galaxyCoords.push({ x, y });
		}
	}
}

// Loop through galaxies, updating coordinates depending on how many empties come before it
for (let galaxyCoord of galaxyCoords) {
	const emptyColsBefore = emptyCols.slice(0, galaxyCoord.x).filter(Boolean).length;
	const emptyRowsBefore = emptyRows.slice(0, galaxyCoord.y).filter(Boolean).length;

	galaxyCoord.x += 1000000 * emptyColsBefore;
	galaxyCoord.y += 1000000 * emptyRowsBefore;
}

let pathSum = 0;
for (let galaxyPair of G.combination(galaxyCoords, 2)) {
	const [galaxyA, galaxyB] = galaxyPair;
	pathSum += distance([galaxyA.x, galaxyA.y], [galaxyB.x, galaxyB.y]);
}

console.log(pathSum);
