const { inputTwo } = require('./input');
const Knot = require('./knot');
const assert = require('assert');

// Tests
[
    { str: '', hash: 'a2582a3a0e66e6e86e3812dcb672a272' },
    { str: 'AoC 2017', hash: '33efeb34ea91902bb2f59c9920caa6cd' },
    { str: '1,2,3', hash: '3efbe78a8d82f29979031a4aa0b16a9d' },
    { str: '1,2,4', hash: '63960835bcdc130f0b66d7ff4f6a5a8e' },
].forEach(({ str, hash }) => {
    let sample_twists = Knot.stringToInputArray(str);
    let sample_knot = new Knot(256);
    sample_knot.performTwists(sample_twists, 64);
    assert.strictEqual(sample_knot.denseHash(), hash);
});

let knot = new Knot(inputTwo.size);
knot.performTwists(inputTwo.twists, 64);

console.log(knot.partTwoAnswer());
