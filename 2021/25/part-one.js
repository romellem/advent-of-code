const { input } = require('./input.js');
const { SeaFloor } = require('./sea-floor.js');

let sea_floor = new SeaFloor(input);

const count = sea_floor.run();
console.log(count);
