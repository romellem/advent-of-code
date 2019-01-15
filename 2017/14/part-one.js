const assert = require('assert');
const input = require('./input');
const { getBitGridOfKeyString, countUsedBits } = require('./grid');

// Tests
let bit_count = countUsedBits(getBitGridOfKeyString('flqrgnkx'));
console.log(bit_count)