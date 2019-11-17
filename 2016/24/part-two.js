const { input } = require('./input');
const Grid = require('./grid');

let grid = new Grid(input);
console.log(grid.calculateShortestPathBetweenAllLocations(true));
