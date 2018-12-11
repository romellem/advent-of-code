const Grid = require('./grid');
let input = require('./input');

// let sample_grid1 = new Grid([10, 20], 8);
// console.log(sample_grid1.getFuelCellAt(3,5))
// // let sample_grid2 = new Grid([300, 300], 57);
// // let sample_grid2 = new Grid([300, 300], 39);
// // let sample_grid2 = new Grid([300, 300], 71);

let grid = new Grid([300, 300], input);

// // Should be 233,93, power of 13??
console.log(grid.getMostPowerfulSquare())