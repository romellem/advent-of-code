const { input } = require('./input');
const { Computer } = require('./intcode-computer');

let computer = new Computer(input, [2]);
let output = computer.run();

console.log(output);
