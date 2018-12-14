const Grid = require('./grid');
let input = require('./input');

let range_min = process.argv[2] || 1;
let range_max = process.argv[3] || 300;
range_min = parseInt(range_min);
range_max = parseInt(range_max);

// let sample_grid1 = new Grid([10, 20], 8);
// console.log(sample_grid1.getFuelCellAt(3,5))
// // let sample_grid2 = new Grid([300, 300], 57);
// // let sample_grid2 = new Grid([300, 300], 39);
// // let sample_grid2 = new Grid([300, 300], 71);

let grid = new Grid([300, 300], input);

console.log(grid.getMostPowerfulSquareOfAnySize(range_min, range_max));
