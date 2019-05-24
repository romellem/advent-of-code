const assert = require('assert');
const { input, sampleInput } = require('./input');
const PipedStream = require('./piped-streams');

// Tests
let test_streams = new PipedStream(sampleInput);
assert.strictEqual(test_streams.countConnectedPrograms(), 6);

let streams = new PipedStream(input);
console.log(streams.countConnectedPrograms());
