const { input } = require('./input');
const Device = require('./device');

let a = 0;
let repeated_signal = false;
while (!repeated_signal) {
    let device = new Device(input, { a: ++a });
    if (a % 43 === 0) process.stdout.write(a + '\r');
    repeated_signal = device.runUntilExitCondition();
}

console.log('                       ');
console.log(a);

