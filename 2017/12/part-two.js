const assert = require('assert');
const { input, sampleInput } = require('./input');
const PipedStream = require('./piped-streams');

// Tests
let test_streams = new PipedStream(sampleInput);
assert.strictEqual(test_streams.countConnectedGroups(), 2);

let streams = new PipedStream(input);
let count = streams.countConnectedGroups();
console.log(count);
