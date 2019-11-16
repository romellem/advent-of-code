const { input, sampleInput } = require('./input');
const assert = require('assert');
const Duet = require('./duet');

// Tests
let test_duet = new Duet(sampleInput);
assert.strictEqual(test_duet.run(), 4);

let duet = new Duet(input);
let sound = duet.run();
console.log(sound);
