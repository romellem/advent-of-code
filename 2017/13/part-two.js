const assert = require('assert');
const { input, sampleInput } = require('./input');
const Firewall = require('./firewall');

// Tests
let test_delay = -1;
let test_severity;
do {
    test_delay++;

    let test_firewall = new Firewall(sampleInput.config);
    test_firewall.tickAll(test_delay);
    test_severity = test_firewall.moveThrough();
} while (test_severity !== 0);

assert.strictEqual(test_delay, sampleInput.delay);

// let firewall = new Firewall(input);
// console.log(firewall.moveThrough());
