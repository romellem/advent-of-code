const assert = require('assert');
const { sampleInput, input } = require('./input');
const Device = require('./device');

// Tests
let test_device = new Device(sampleInput.instructions);
assert.strictEqual(test_device.run(), sampleInput.registerAResult);

let device = new Device(input);
console.log(device.run());
