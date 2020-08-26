const { input } = require('./input');
const { iterativelyExpandGrid, countPixelsInGrid } = require('./grid');
let final_grid = iterativelyExpandGrid(input, 18);
let { pixels_on } =  countPixelsInGrid(final_grid);

console.log(pixels_on);
