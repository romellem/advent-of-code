const assert = require('assert');
const Grid = require('./grid');
const { input, sampleInput } = require('./input');

// Tests
let { small } = sampleInput;
let test_grid_small = new Grid(small.grid[0]);
test_grid_small.addRows(small.grid.length - 1);
assert.strictEqual(test_grid_small.countSafeTiles(), small.safeTiles);

let { larger } = sampleInput;
let test_grid_larger = new Grid(larger.grid[0]);
test_grid_larger.addRows(larger.grid.length - 1);
assert.strictEqual(test_grid_larger.countSafeTiles(), larger.safeTiles);

let grid = new Grid(input);
grid.addRows(40 - 1);
console.log(grid.countSafeTiles());
