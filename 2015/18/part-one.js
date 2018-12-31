const Grid = require('./grid');
const input = require('./input');

let grid = new Grid(input);

const NUM_OF_STEPS_TO_SIMULATE = 100;
grid.tick(NUM_OF_STEPS_TO_SIMULATE);

console.log(grid.countLightsInState(true));
