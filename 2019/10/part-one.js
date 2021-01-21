const assert = require('assert');
const { input, sampleInputs } = require('./input');
const Grid = require('./grid');

for (let g of sampleInputs) {
	let grid = new Grid(g.grid);
	assert.deepStrictEqual(
		{ best_count: g.best_count, best_coords: g.best_coords },
		grid.getAsteroidWithHighestCountInLineOfSight()
	);
}

let grid = new Grid(input);
console.log(grid.getAsteroidWithHighestCountInLineOfSight());
