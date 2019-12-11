const { input, sampleInputs } = require('./input');
const Grid = require('./grid');

// for (let g of sampleInputs) {
	let grid = new Grid(input);
	console.log(grid.vaporizeAsteroidsFrom([26, 29]));
// }
