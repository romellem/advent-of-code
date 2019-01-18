const assert = require('assert');
const input = require('./input');
const CircularList = require('./circular-list');

// Tests
const TEST_STEPS = 3;
let test_buffer = new CircularList(0);

const INSTRUCTIONS = 2017;
for (let i = 1; i <= INSTRUCTIONS; i++) {
    test_buffer.move(TEST_STEPS).insertNext(i);
}

assert.strictEqual(test_buffer.head.value, 2017);
assert.strictEqual(test_buffer.head.next_item.value, 638);

// Real question
let buffer = new CircularList(0);
for (let i = 1; i <= INSTRUCTIONS; i++) {
    buffer.move(input).insertNext(i);
}

console.log(buffer.head.next_item.value);
