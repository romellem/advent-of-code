// const { program } = require('./sample-input');
const { sampleInput, input } = require('./input');
const CPU = require('./cpu');

let cpu = new CPU(input);

let iter = 0;
while (cpu.run() !== false) {
    console.log(cpu.instruction);
    iter++;

    // if (iter % 4457 === 0) {
    //     process.stdout.write(iter + '\r');
    // }
    if (cpu.instruction === 38) {
        process.stdout.write(`${cpu.registers.a}\t${cpu.registers.b}\r`);
    }
}

console.log('                             \n');
console.log(cpu.registers)