const { sampleInput, input } = require('./input');
const assert = require('assert');
const RTGPath = require('./rtg-path');

// const test_path = new RTGPath(sampleInput);
const path = new RTGPath(input);
console.log(path.getPathFromVistedNode(path.goal));

// assert.strictEqual(test_path.getShortestLengthToFourthFloor(), 11);
// assert.strictEqual(path.getShortestLengthToFourthFloor(), 33);
