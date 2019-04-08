const assert = require('assert');
const scramble = require('./scramble');
const { sampleInput, input } = require('./input');

// Tests
let test_result = scramble(sampleInput.password, sampleInput.instructions);
assert.strictEqual(test_result, sampleInput.result);
