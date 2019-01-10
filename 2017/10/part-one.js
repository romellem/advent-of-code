const { input, sampleInput } = require('./input');
const Knot = require('./knot');
const assert = require('assert');

// Tests
let sample_knot = new Knot(sampleInput.size);
sample_knot.performTwists(sampleInput.twists);
assert.deepStrictEqual(sample_knot.string, [3, 4, 2, 1, 0]);
assert.strictEqual(sample_knot.partOneAnswer(), 12);
assert.strictEqual(sample_knot.current_position, 4);

let knot = new Knot(input.size);
knot.performTwists(input.twists);

console.log(knot.partOneAnswer());
