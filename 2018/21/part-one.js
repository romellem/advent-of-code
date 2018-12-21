// const { program } = require('./sample-input');
const { program } = require('./input');
const DeviceInstructions = require('./device-instructions');

let instruction_pointer = program.shift();

// const intial_regs = [0, 0, 18, 14290240, 65536, 0];
const intial_regs = [0, 0, 0, 0, 0, 0];

let device = new DeviceInstructions(program, intial_regs);

device.setInputPointer(instruction_pointer[1]);

// while (device.run(true)) {
for (let i = 0; i < 100; i++) {
    device.run(true);
    // Do nothing...
}

console.log(device.registers[0]);
