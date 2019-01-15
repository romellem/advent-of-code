const assert = require('assert');
const input = require('./input');
const { getBitGridOfKeyString, countRegions } = require('./grid');

// Tests
assert.strictEqual(countRegions(getBitGridOfKeyString('flqrgnkx')), 1242);

let bit_count = countRegions(getBitGridOfKeyString(input));

console.log(bit_count);
