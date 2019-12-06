const { input } = require('./input');
const Computer = require('./computer');

let computer = new Computer(input);
computer.run();