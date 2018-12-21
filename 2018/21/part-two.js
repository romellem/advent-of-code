// const { program } = require('./sample-input');
const colors = require('colors');
const { program } = require('./input');
const DeviceInstructions = require('./device-instructions');
const readline = require('readline');

let instruction_pointer = program.shift();
instruction_pointer = instruction_pointer[1];

let reg_a = process.argv[2]|| 0;
reg_a = parseInt(reg_a);

console.log('Register A = ' + reg_a.toString().green);

// Register A (0) values that'll halt the program:
// 
const regs = [reg_a, 0, 0, 0, 0, 0];

let device = new DeviceInstructions(program, regs);
device.setInputPointer(instruction_pointer);

let num_of_executions = 0;
while (device.run()) {
    ++num_of_executions;
}

console.log('Executed     ' + num_of_executions.toLocaleString().cyan + ' instructions');
console.log('=============');
console.log(device.registers);
console.log('\n');
