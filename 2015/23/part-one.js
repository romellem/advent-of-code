// const { program } = require('./sample-input');
const { program } = require('./input');
const DeviceInstructions = require('./device-instructions');

let instruction_pointer = program.shift();

let device = new DeviceInstructions(program);
device.setInputPointer(instruction_pointer[1]);

while (device.run()) {
    // Do nothing...
}

console.log(device.registers[0])