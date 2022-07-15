const { input } = require('./input.js');
const { SeaFloor } = require('./sea-floor.js');

let sea_floor = new SeaFloor(input);

console.log(sea_floor.run());
