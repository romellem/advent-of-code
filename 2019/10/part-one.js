const { input, sampleInputs } = require('./input');
const Grid = require('./grid');

for (let g of sampleInputs) {
	let grid = new Grid(g.grid);
	console.log(grid.getAsteroidWithHighestCountInLineOfSight());
}
