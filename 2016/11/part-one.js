const { sampleInput, input } = require('./input');
const assert = require('assert');
const { RTGPath } = require('./rtg-path');

const test_path = new RTGPath(sampleInput);
const path = new RTGPath(input);

assert.strictEqual(test_path.getShortestLengthToFourthFloor(), 11);

console.log(path.getPathFromVistedNode(path.goal), '\n============\n');
console.log(path.getShortestLengthToFourthFloor());
