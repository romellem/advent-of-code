const { input } = require('./input');
const { Arcade, TYPES } = require('./intcode-computer');

let arcade = new Arcade(input);
let grid = arcade.runAndGetGrid();
let output = grid.getNumberOfTilesOfType(TYPES.BLOCK);

console.log(output);