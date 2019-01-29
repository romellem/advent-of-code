const assert = require('assert');
const { input, sampleInput } = require('./input');
const Track = require('./track');

// Tests
let sample_track = new Track(sampleInput.track);
assert.strictEqual(sample_track.walk(), sampleInput.value);

let track = new Track(input);
console.log(track.walk());
