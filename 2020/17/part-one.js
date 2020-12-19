const { input, sampleInput } = require('./input');
const { InfiniteNDimensionalGrid, ACTIVE } = require('./InfiniteNDimensionalGrid');

// let sample_grid = new InfiniteNDimensionalGrid({ intial_grid: [sampleInput], dimensions: 3 });
// sample_grid.run(6);


let grid = new InfiniteNDimensionalGrid({ intial_grid: [input], dimensions: 3 });
grid.run(6);

let active_cubes = grid.getValues(Object.keys(grid.grid))[ACTIVE];
console.log(active_cubes);
