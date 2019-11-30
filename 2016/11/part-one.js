const { sampleInput, input } = require('assert');
const assert = require('assert');
const RTGPath = require('./rtg-path');

const test_path = new RTGPath(sampleInput);
const path = new RTGPath(input);

assert.strictEqual(test_path.getShortestLengthToFourthFloor(), 1);
assert.strictEqual(path.getShortestLengthToFourthFloor(), 33);
