const Grid = require('./grid');
const { input, sampleInput } = require('./input');

let grid = new Grid(input);
grid.addRows(400000 - 1);
console.log(grid.countSafeTiles());
