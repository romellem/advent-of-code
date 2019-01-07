// const { program } = require('./sample-input');
const { sampleInput, input } = require('./input');
const CPU = require('./cpu');

let cpu = new CPU(input, { a: 1, b: 0 });

let iter = 0;
while (cpu.run() !== false) {
    // Do nothing
}

console.log(cpu.registers.b)