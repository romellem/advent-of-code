const assert = require('assert');
const { input, sampleInputs } = require('./input');
const Grid = require('./grid');

let sample_input = sampleInputs[4];

let test_grid = new Grid(sample_input.grid);
assert.strictEqual(test_grid.vaporizeAsteroidsFrom(), sample_input.partTwo);

let grid = new Grid(input);

// Manually enter answer from Part One
console.log(grid.vaporizeAsteroidsFrom([26, 29]));
