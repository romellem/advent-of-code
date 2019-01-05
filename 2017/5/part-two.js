const { input, sampleInput } = require('./input');
const CPU = require('./cpu');

let cpu = new CPU(input);

console.log(cpu.execute(true));
