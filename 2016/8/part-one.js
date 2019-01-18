const assert = require('assert');
const { input, sampleInput } = require('./input');
const Screen = require('./screen');

// Tests
let test_screen = new Screen(sampleInput);
test_screen.run();
assert.strictEqual(test_screen.countLitPixels(), 6);

let screen = new Screen(input);
screen.run();

console.log(screen.countLitPixels());
