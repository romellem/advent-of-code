const { input } = require('./input');
const { Arcade } = require('./intcode-computer');

let arcade = new Arcade(input);
let output = arcade.run();

console.log(output);