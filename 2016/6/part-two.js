const assert = require('assert');
const { input, sampleInput } = require('./input');
const { getLeastCommonLetterInEachColumn } = require('./message');

// Tests
assert.strictEqual(getLeastCommonLetterInEachColumn(sampleInput), 'advent');

console.log(getLeastCommonLetterInEachColumn(input));
