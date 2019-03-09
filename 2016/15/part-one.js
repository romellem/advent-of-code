const assert = require('assert');
const { input, sampleInput } = require('./input');
const Disks = require('./disks');

// Tests
let test_disk = new Disks(sampleInput.disks);
let test_time = test_disk.getFirstTimeWhenCapsuleWouldFallThrough();
assert.strictEqual(test_time, sampleInput.time);

// Input
let disk = new Disks(input);
let time = disk.getFirstTimeWhenCapsuleWouldFallThrough();
console.log(time);
