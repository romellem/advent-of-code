const assert = require('assert');
const Disk = require('./disk');
const { sampleInputs, partOneInput } = require('./input');

// Tests
sampleInputs.forEach(sample => {
    let test_disk = new Disk(sample);
    assert.strictEqual(test_disk.checksum(), sample.checksum);
});

let disk = new Disk(partOneInput);
console.log(disk.checksum());
