// const { program } = require('./sample-input');
const { program } = require('./input');
const DeviceInstructions = require('./device-instructions');
const readline = require('readline');

let instruction_pointer = program.shift();
instruction_pointer = instruction_pointer[1];

const regs = [5165, 0, 18, 14290240, 65536, 0];

let device = new DeviceInstructions(program, regs);
device.setInputPointer(instruction_pointer);

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

let smallest_d = Number.MAX_SAFE_INTEGER;

while (device.run()) {
    let [a, b, c, d, e, f] = device.registers;
    if (d < smallest_d) {
        // process.stdout.write(d + '                   \r');
        console.log(d);
        smallest_d = d;
    }
}

console.log('\nI FINISHED!');
console.log('Register 0 is: ' + device.registers[0]);
console.log('All registers listed below: ');
console.log(device.registers);
