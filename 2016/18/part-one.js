const assert = require('assert');
const Grid = require('./grid');
const { input, sampleInput } = require('./input');

let grid = new Grid(input);
grid.addRows(39);
console.log(grid.countSafeTiles());
