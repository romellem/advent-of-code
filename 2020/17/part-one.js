const { input } = require('./input');
const { InfiniteNDimensionalGrid, ACTIVE } = require('./InfiniteNDimensionalGrid');

let grid = new InfiniteNDimensionalGrid({ intial_grid: [input], dimensions: 3 });
grid.run(6);

let active_cubes = grid.getValues(Object.keys(grid))[ACTIVE];
console.log(active_cubes);
