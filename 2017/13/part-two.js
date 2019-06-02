const assert = require('assert');
const { input, sampleInput } = require('./input');
const Firewall = require('./firewall');

// Tests
let test_delay = -1;
let test_caught;
do {
    test_delay++;

    let test_firewall = new Firewall(sampleInput.config);
    test_firewall.tickAll(test_delay);
    test_caught = test_firewall.moveThrough(false);
} while (test_caught === true);

assert.strictEqual(test_delay, sampleInput.delay);

let delay = -1;
let caught;
do {
    delay++;

    let firewall = new Firewall(input);
    firewall.tickAll(delay);
    caught = firewall.moveThrough(false);

    process.stdout.write(delay + '\r');
} while (caught === true);

console.log('\n\n=====\n',delay);
