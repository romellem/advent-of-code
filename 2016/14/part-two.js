const assert = require('assert');
const { input, testInput } = require('./input');
const KeyGenerator = require('./key-generator');

// Tests (script takes a while to run, so uncomment below to run tests)
// let test_generator = new KeyGenerator(testInput.salt, true);
// let test_index = test_generator.generateNextKeys();
// assert.strictEqual(test_index, testInput.lastIndexStretch);

// Input
let generator = new KeyGenerator(input, true);
let last_index = generator.generateNextKeys();
console.log(last_index);
