const Grid = require('./grid');
const input = require('./sample-input');

let grid = new Grid(input);
grid.printGrid();

const NUM_OF_STEPS_TO_SIMULATE = 4;
for (let i = 0; i < NUM_OF_STEPS_TO_SIMULATE; i++) {
    grid.tick();
    grid.printGrid();
}

console.log(grid.countLightsInState(true))
