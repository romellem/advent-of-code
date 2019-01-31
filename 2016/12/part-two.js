const { input } = require('./input');
const Device = require('./device');

let device = new Device(input, { a: 0, b: 0, c: 1, d: 0 });
console.log(device.run());
