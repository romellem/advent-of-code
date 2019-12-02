const { input } = require('./input');
const Device = require('./device');

let a = 0;
let repeated_signal = false;
while (!repeated_signal) {
    let device = new Device(input, { a: ++a });
    process.stdout.write('Testing ' + a + '...\r');
    repeated_signal = device.runUntilExitCondition();
}

console.log('                                      ');
console.log(a);

