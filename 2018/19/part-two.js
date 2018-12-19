// const { program } = require('./sample-input');
const { program } = require('./input');
const DeviceInstructions = require('./device-instructions');

let instruction_pointer = program.shift();

// const regs = [1, 0, 0, 0, 0, 0];
// const regs = [0, 1, 0, 10551264, 9, 10551264];
const regs = [1, 2, 0, 50136, 9, 10551264];

let device = new DeviceInstructions(program, regs);
device.setInputPointer(instruction_pointer[1]);

let i = 0;
process.on('SIGINT', function() {
    console.log("Caught interrupt signal");

    console.log('\n');
    console.log('Iteration ' + i + ' to ' + (i + 2));
    device.run(true);
    device.run(true);
    process.exit(1);
});

while (device.run(true)) {
    ++i;
    // if (i % 3407 === 0) process.stdout.write(i + '\r');
}

console.log('I FINISHED!\n');
console.log('Register 0 is: ' + device.registers[0]);
console.log('All registers listed below: ');
console.log(device.registers)