const assert = require('assert');
const { input, sampleInput } = require('./input');
const Grid = require('./grid');

let test_grid = new Grid(sampleInput);
assert.strictEqual(test_grid.calculateShortestPathBetweenAllLocations(), 14);

let grid = new Grid(input);
console.log(grid.calculateShortestPathBetweenAllLocations());
