const { input } = require('./input');
const { Ship } = require('./intcode-computer');

let ship = new Ship(input, 1);
ship.run();

ship.printShip();
