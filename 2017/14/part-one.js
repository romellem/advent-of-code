const assert = require('assert');
const input = require('./input');
const { getBitGridOfKeyString, countUsedBits } = require('./grid');

// Tests
assert.strictEqual(countUsedBits(getBitGridOfKeyString('flqrgnkx')), 8108);

let bit_count = countUsedBits(getBitGridOfKeyString(input));

console.log(bit_count);
