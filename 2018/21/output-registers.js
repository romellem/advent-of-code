// const { program } = require('./sample-input');
const { program } = require('./input');
const DeviceInstructions = require('./device-instructions');
const readline = require('readline');

let instruction_pointer = program.shift();

// readline.clearScreenDown(process.stdout)
console.log('\n\n\n\n\n\n\n')

// let i = 0;

// const regs = [27941760, 10551264, 0, 10551263, 9, 10551264];
const regs = [1, 0, 0, 0, 0, 0];

let device = new DeviceInstructions(program, regs);
device.setInputPointer(instruction_pointer[1]);

const SOME_PRIME = 539269;
let prime_times = 0;

let i = 0;
while (device.run()) {
    if (++i > SOME_PRIME) {
        readline.clearLine(process.stdout, 0);
        readline.moveCursor(process.stdout, null, -7);

        let [a, b, c, d, e, f] = device.registers;
        let text = `Iteration ${(i + (prime_times * SOME_PRIME)).toLocaleString()}\n${a}         \n${b}         \n${c}         \n${d}         \n${e}         \n${f}         \n`;
        process.stdout.write(text);

        i = 0;
        prime_times++;
    }
}

console.log('\nI FINISHED!');
console.log('Register 0 is: ' + device.registers[0]);
console.log('All registers listed below: ');
console.log(device.registers);
