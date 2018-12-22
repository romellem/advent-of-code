const colors = require('colors');
const { program } = require('./input');
const DeviceInstructions = require('./device-instructions');

let instruction_pointer = program.shift();
instruction_pointer = instruction_pointer[1];

let device_zeroes = new DeviceInstructions(program);
device_zeroes.setInputPointer(instruction_pointer);

let num_of_executions = 0;
let first_break;
while (device_zeroes.run()) {
    num_of_executions++;

    // Line 28 is first line where we can exit the program
    if (device_zeroes.registers[instruction_pointer] === 28) {
        let register_d = device_zeroes.registers[3];
        first_break = register_d;

        console.log('First point when program can halt is if ' + 'Register A == Register D'.yellow);
        console.log('Register D = ' + register_d.toString().green);
        console.log('====================\n');
        break;
    }
}

// Now that we know the first spot the program will halt,
// create a new program with that value in register A

const registers_to_halt_program = [first_break, 0, 0, 0, 0, 0];
let device = new DeviceInstructions(program, registers_to_halt_program);
device.setInputPointer(instruction_pointer);

num_of_executions = 0;
process.stdout.write('Running...\r');
while (device.run()) {
    num_of_executions++;
}
console.log('Running...' + ' Done!'.green);
console.log('Executed ' + num_of_executions.toLocaleString().cyan + ' instructions');
console.log('=============');
console.log('All registers shown below:');
console.log(device.registers);
console.log('\n');
