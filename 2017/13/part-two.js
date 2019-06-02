const assert = require('assert');
const { input, sampleInput } = require('./input');
const Firewall = require('./firewall');

// Tests
let test_delay = Firewall.calculateMinDelayToMoveUncaught(sampleInput.config);
assert.strictEqual(test_delay, sampleInput.delay);

let delay = Firewall.calculateMinDelayToMoveUncaught(input);
console.log(delay);
