// const { program } = require('./sample-input');
const { sampleInput, input } = require('./input');
const CPU = require('./cpu');

let cpu = new CPU(input);

let iter = 0;
while (cpu.run() !== false) {
    // Do nothing
}

console.log(cpu.registers.b)