const manhatten = require('manhattan');
const input = require('./input');
const Grid = require('./grid');

let grid = new Grid();
grid.fillSummedSpiral(input);

let values = Object.keys(grid.reverseGrid).map(n => +n);
values = values.filter(v => v > input - 1);
values.sort((a, b) => a - b);

console.log(values.shift());
