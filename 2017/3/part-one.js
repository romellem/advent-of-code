const manhatten = require('manhattan');
const input = require('./input');
const Grid = require('./grid');

let grid = new Grid();
grid.fillSpiral(input);

let input_coord = grid.reverseGrid[input];
let [input_x, input_y] = input_coord.split(',').map(n => +n);


console.log(manhatten([0, 0], [input_x, input_y]))
