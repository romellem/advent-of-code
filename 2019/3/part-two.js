const { input, sampleInputs } = require('./input');
const assert = require('assert');
const { Grid } = require('./grid');

for (let { wire_a, wire_b, steps } of sampleInputs) {
	let test_grid = new Grid(wire_a, wire_b);
	assert.strictEqual(test_grid.getMinStepsToCrossover(), steps);
}

const { wire_a, wire_b } = input;
let grid = new Grid(wire_a, wire_b);

console.log(grid.getMinStepsToCrossover());
