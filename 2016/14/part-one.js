const assert = require('assert');
const { input, testInput } = require('./input');
const KeyGenerator = require('./key-generator');

// Tests
let test_generator = new KeyGenerator(testInput.salt);
let test_index = test_generator.generateNextKeys();
assert.strictEqual(test_index, testInput.lastIndex);

// Input
let generator = new KeyGenerator(input);
let last_index = generator.generateNextKeys();
console.log(last_index);
