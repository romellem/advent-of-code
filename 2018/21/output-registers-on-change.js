// const { program } = require('./sample-input');
const { program } = require('./input');
const DeviceInstructions = require('./device-instructions');
const readline = require('readline');

let instruction_pointer = program.shift();

const regs = [1, 0, 0, 0, 0, 0];

let device = new DeviceInstructions(program, regs);
device.setInputPointer(instruction_pointer[1]);



const outputArrayWithPadding = (arr, padding = 16) => {
    let log = '';
    for (let i = 0; i < arr.length; i++) {
        log += String(arr[i]).padEnd(padding);
    }
    console.log(log);
};

const watchRegisters = (function() {
    let registers_copy = device.registers.slice(0);
    return (...indices) => {
        for (let i = 0; i < indices.length; i++) {
            let index = indices[i];

            if (device.registers[index] !== registers_copy[index]) {
                outputArrayWithPadding(device.registers);
                registers_copy[index] = device.registers[index];
            }
        }
    };
})();

while (device.run()) {
    // 0 1 2 3 4 5
    // a b c d e f
    watchRegisters(3);
}

console.log('\nI FINISHED!');
console.log('Register 0 is: ' + device.registers[0]);
console.log('All registers listed below: ');
console.log(device.registers);
