const { input } = require('./input');
const { createGrid } = require('./hex');

const GRID = createGrid(input);

console.log(Object.values(GRID).reduce((a, b) => a + b, 0));
