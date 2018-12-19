// const { program } = require('./sample-input');
const { program } = require('./input');
const DeviceInstructions = require('./device-instructions');

let instruction_pointer = program.shift();

// let i = 0;

// const regs = [1, 0, 0, 0, 0, 0];
// const regs = [0, 1, 0, 10551264, 9, 10551264];
// const regs = [1, 2, 0, 5275623, 9, 10551264];
// const regs = [3, 2, 0, 10551264, 9, 10551264];
// const regs = [3, 3, 0, 3517088, 9, 10551264];
// const regs = [6, 3, 0, 10551264, 9, 10551264];
// const regs = [6, 4, 0, 2637816, 9, 10551264];
// const regs = [10, 4, 0, 10551264, 9, 10551264];
// const regs = [10, 5, 0, 10551264, 9, 10551264];
// const regs = [10, 6, 0, 1758544, 9, 10551264];
// const regs = [16, 6, 0, 10551264, 9, 10551264];
// const regs = [16, 7, 0, 10551264, 9, 10551264];
// const regs = [16, 8, 0, (10551264/8), 9, 10551264];
// const regs = [24, 8, 0, 10551264, 9, 10551264];
// const regs = [24, 11, 0, 10551264, 9, 10551264];
// const regs = [24, 12, 0, (10551264/12), 9, 10551264];
// const regs = [36, 12, 0, 10551264, 9, 10551264];
// ...

// I got it! Summing up the divisors (took me long enough, jeez!)
const factors = n => {
    var num_factors = [],
        i;

    for (i = 1; i <= Math.floor(Math.sqrt(n)); i += 1)
        if (n % i === 0) {
            num_factors.push(i);
            if (n / i !== i) num_factors.push(n / i);
        }
    num_factors.sort(function(x, y) {
        return x - y;
    });
    return num_factors;
};

// Set the first register to the factors of 10551264 summed up
let factors_of_10551264_summed = factors(10551264).reduce((a, b) => a + b, 0);
const regs = [
    factors_of_10551264_summed, 10551264, 0, 10551264 - 1, 9, 10551264
];

let device = new DeviceInstructions(program, regs);
device.setInputPointer(instruction_pointer[1]);

while (device.run(true)) {
    // Do nothing...
}

console.log('\nI FINISHED!');
console.log('Register 0 is: ' + device.registers[0]);
console.log('All registers listed below: ');
console.log(device.registers);
