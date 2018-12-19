// const { program } = require('./sample-input');
const { program } = require('./input');
const DeviceInstructions = require('./device-instructions');
const readline = require('readline');

let instruction_pointer = program.shift();

// const regs = [27941760, 10551264, 0, 10551263, 9, 10551264];
const regs = [1, 0, 0, 0, 0, 0];

let device = new DeviceInstructions(program, regs);
device.setInputPointer(instruction_pointer[1]);

let register_0 = regs[0];
let register_1 = regs[1];

const outputArrayWithPadding = (arr, padding = 16) => {
    let log = '';
    for (let i = 0; i < arr.length; i++) {
        log += String(arr[i]).padEnd(padding);
    }
    console.log(log);
};

while (device.run()) {
    if (device.registers[0] !== register_0) {
        register_0 = device.registers[0];
        // let [a, b, c, d, e, f] = device.registers;
        // console.log(`${a}\t${b}\t${c}\t${d}\t${e}\t${f}`);
        outputArrayWithPadding(device.registers);
    } else if (device.registers[1] !== register_1) {
        register_1 = device.registers[1];
        outputArrayWithPadding(device.registers);
    }
}

console.log('\nI FINISHED!');
console.log('Register 0 is: ' + device.registers[0]);
console.log('All registers listed below: ');
console.log(device.registers);
