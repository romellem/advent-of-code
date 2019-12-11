const { input } = require('./input');
const { Ship } = require('./intcode-computer');

let ship = new Ship(input);
let output = ship.run();

console.log(output);